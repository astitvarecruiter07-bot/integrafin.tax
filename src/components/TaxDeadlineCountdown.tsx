"use client";

import { useEffect, useState } from "react";

const DEADLINE_TIMESTAMP = Date.parse("2026-09-16T04:59:59Z");

type TimeRemaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
};

function getTimeRemaining(): TimeRemaining {
  const remaining = Math.max(0, DEADLINE_TIMESTAMP - Date.now());

  return {
    days: Math.floor(remaining / 86_400_000),
    hours: Math.floor((remaining / 3_600_000) % 24),
    minutes: Math.floor((remaining / 60_000) % 60),
    seconds: Math.floor((remaining / 1_000) % 60),
    expired: remaining === 0,
  };
}

const initialTime: TimeRemaining = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  expired: false,
};

export default function TaxDeadlineCountdown() {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(initialTime);

  useEffect(() => {
    const updateCountdown = () => setTimeRemaining(getTimeRemaining());
    const initialUpdate = window.setTimeout(updateCountdown, 0);
    const interval = window.setInterval(updateCountdown, 1_000);

    return () => {
      window.clearTimeout(initialUpdate);
      window.clearInterval(interval);
    };
  }, []);

  if (timeRemaining.expired) {
    return (
      <div className="mb-4 text-center" role="timer" aria-live="polite">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff3038]">September 15 deadline reached</p>
      </div>
    );
  }

  const units = [
    { value: timeRemaining.days, label: "Days" },
    { value: timeRemaining.hours, label: "Hours" },
    { value: timeRemaining.minutes, label: "Minutes" },
    { value: timeRemaining.seconds, label: "Seconds" },
  ];

  return (
    <div className="mb-5 text-center" role="timer" aria-label="Time left until the September 15, 2026 tax deadline">
      <p className="mb-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#b51f28] sm:text-xs">
        Time left before the tax deadline
      </p>
      <div className="mx-auto grid w-full max-w-md grid-cols-4 gap-2 sm:gap-3">
        {units.map(({ value, label }) => (
          <div key={label} className="rounded-xl border-2 border-black bg-white px-2 py-3 shadow-[3px_3px_0_#ff3038] sm:px-3">
            <span className="block tabular-nums text-2xl font-black leading-none text-black sm:text-3xl">
              {String(value).padStart(2, "0")}
            </span>
            <span className="mt-1.5 block text-[9px] font-black uppercase tracking-[0.1em] text-[#555] sm:text-[10px]">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
