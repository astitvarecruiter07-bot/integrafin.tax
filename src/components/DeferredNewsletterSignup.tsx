"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";

const NewsletterSignup = lazy(() => import("@/components/NewsletterSignup"));

type DeferredNewsletterSignupProps = {
  source: string;
  placeholder?: string;
  buttonLabel?: string;
  variant?: "light" | "dark";
};

export default function DeferredNewsletterSignup(props: DeferredNewsletterSignupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || shouldLoad) return;

    if (typeof IntersectionObserver === "undefined") {
      const timeoutId = setTimeout(() => setShouldLoad(true), 0);
      return () => clearTimeout(timeoutId);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "600px 0px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className="min-h-[44px]">
      {shouldLoad ? (
        <Suspense
          fallback={
            <div
              className="h-11 animate-pulse rounded-full bg-white/10"
              aria-hidden="true"
            />
          }
        >
          <NewsletterSignup {...props} />
        </Suspense>
      ) : (
        <div
          className="h-11 rounded-full border border-white/10 bg-white/5"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
