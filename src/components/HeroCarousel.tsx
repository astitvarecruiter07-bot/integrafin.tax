"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const slides = [
  {
    badge: "ACCURATE & EFFICIENT",
    title: "Seamless Tax Filing & Maximized Returns",
    description: "Ensure compliance and get the highest refund possible with our expert tax filing and preparation services. Quick, easy, and stress-free tax solutions.",
    buttonLabel: "File Your Taxes",
    buttonLink: "/contact",
    image: "/A_professional,_wide-angle_202604082301.png"
  },
  {
    badge: "SUCCESSFUL & PROFESSIONAL",
    title: "Expert Tax & Accounting Services in Katy, TX",
    description: "IntegraFin provides trusted tax and business advisory services. We simplify your finances with expert accounting and tax filing solutions tailored to your needs.",
    buttonLabel: "Get Professional Help",
    buttonLink: "/contact",
    image: "/hero-professional.png"
  },
  {
    badge: "STRATEGIC & OPTIMIZED",
    title: "Smart Tax Planning for Maximum Savings",
    description: "Optimize your taxes with expert planning and advisory services. Minimize liabilities and maximize deductions for a financially secure future.",
    buttonLabel: "Get Tax Advice",
    buttonLink: "/contact",
    image: "/A_professional,_wide-angle_202604082301.png"
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsTransitioning(false);
    }, 500);
  };

  const goToSlide = (index: number) => {
    if (index === currentSlide) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <section className="relative w-full min-h-[650px] md:min-h-[750px] flex items-center text-left text-white bg-slate-900 overflow-hidden pt-20">
      {/* Background Image Container */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-0" : "opacity-0 -z-10"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/40 z-10" />
          <Image
            src={slide.image}
            alt="Hero Background"
            fill
            className="object-cover object-right absolute inset-0 opacity-60"
            priority={index === 0}
          />
        </div>
      ))}

      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 w-full flex flex-col items-center text-center lg:items-start lg:text-left">
        {/* Animated Content Wrapper */}
        <div 
          className={`transition-all duration-700 ease-out transform ${
            isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        >
          <div className="inline-block px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-8 text-sm md:text-base font-bold tracking-widest text-[#00AEEF] shadow-lg">
            {slides[currentSlide].badge}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-8 leading-[1.15] tracking-tight max-w-4xl text-white min-h-[5.5rem] md:min-h-[7.5rem] lg:min-h-[11rem]">
            {slides[currentSlide].title}
          </h1>
          <p className="text-base md:text-lg lg:text-xl mb-12 font-medium max-w-2xl text-slate-200 leading-relaxed min-h-[4.5rem] md:min-h-[5.5rem] lg:min-h-[7rem]">
            {slides[currentSlide].description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={slides[currentSlide].buttonLink}>
              <button className="bg-[#0092df] hover:bg-[#007bbf] text-white px-10 py-4 rounded-xl text-lg font-bold transition-all duration-300 shadow-xl shadow-[#0092df]/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#0092df]/40 flex items-center justify-center gap-2">
                {slides[currentSlide].buttonLabel} <ChevronRight className="w-5 h-5 text-white/80" />
              </button>
            </Link>
            <Link href="/about">
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-xl text-lg font-bold transition-all duration-300 flex items-center justify-center gap-2">
                Learn More
              </button>
            </Link>
          </div>
        </div>

        {/* Carousel Indicators (Slidbar) */}
        <div className="flex gap-3 justify-center lg:justify-start mt-16 lg:mt-24">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                index === currentSlide
                  ? "bg-[#0092df] w-12 shadow-lg shadow-[#0092df]/40"
                  : "bg-white/20 hover:bg-white/40 w-4"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide ? "true" : "false"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
