"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const slides = [
  {
    badge: "KATY TAX & BOOKKEEPING",
    title: "Tax Accountant in Katy, TX for Businesses and Families",
    description: "IntegraFin provides tax preparation, bookkeeping, payroll workflow support, and IRS notice help for Katy and Fort Bend County clients.",
    buttonLabel: "Book Katy Tax Consultation",
    buttonLink: "/contact",
    image: "/A_professional,_wide-angle_202604082301.png",
    imageAlt: "IntegraFin tax accountant support for Katy TX businesses"
  },
  {
    badge: "BUSINESS TAX SUPPORT",
    title: "Business Tax Preparation and Bookkeeping in Fort Bend County",
    description: "Get organized monthly bookkeeping, business tax preparation, payroll records support, and year-round planning from a nearby Katy tax team.",
    buttonLabel: "Get Business Tax Help",
    buttonLink: "/contact",
    image: "/hero-professional.png",
    imageAlt: "Business tax preparation and bookkeeping services near Katy Texas"
  },
  {
    badge: "IRS NOTICE HELP",
    title: "IRS Notice and Tax Planning Help Near Katy",
    description: "If you received an IRS letter, have behind books, or need better tax planning, IntegraFin helps you organize the next step clearly.",
    buttonLabel: "Get IRS Notice Help",
    buttonLink: "/contact",
    image: "/A_professional,_wide-angle_202604082301.png",
    imageAlt: "IRS notice and tax planning help near Katy TX"
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(true);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => {
      setIsTransitioning(false);
      setDragOffset(0);
    }, 700);
  }, [isTransitioning]);

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => {
      setIsTransitioning(false);
      setDragOffset(0);
    }, 700);
  };

  useEffect(() => {
    if (!isAutoPlayEnabled) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide, isAutoPlayEnabled, handleNext]);

  const goToSlide = (index: number) => {
    if (index === currentSlide || isTransitioning) return;
    setIsAutoPlayEnabled(false);
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => {
      setIsTransitioning(false);
      setDragOffset(0);
    }, 700);
  };

  // Mouse/Touch Handlers for Drag
  const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isTransitioning) return;
    setIsAutoPlayEnabled(false);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
  };

  const onDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (dragStartX === null || isTransitioning) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const diff = clientX - dragStartX;
    setDragOffset(diff);

    if (Math.abs(diff) > 100) {
      if (diff > 0) handlePrev();
      else handleNext();
      setDragStartX(null);
      setDragOffset(0);
    }
  };

  const onDragEnd = () => {
    setDragStartX(null);
    setDragOffset(0);
  };

  return (
    <section 
      ref={containerRef}
      onMouseDown={onDragStart}
      onMouseMove={onDragMove}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      onTouchStart={onDragStart}
      onTouchMove={onDragMove}
      onTouchEnd={onDragEnd}
      onWheel={(e) => {
        if (Math.abs(e.deltaX) > 30 && !isTransitioning) {
          setIsAutoPlayEnabled(false);
          if (e.deltaX > 0) handleNext();
          else handlePrev();
        }
      }}
      className="relative w-full min-h-[650px] md:min-h-[750px] text-left text-white bg-slate-900 overflow-hidden pt-20 cursor-grab active:cursor-grabbing select-none"
    >
      {/* Slides Container */}
      <div 
        className="flex h-full w-full flex-nowrap transition-transform duration-700 ease-out"
        style={{ 
          transform: `translateX(calc(-${currentSlide * 100}% + ${dragOffset}px))`,
        }}
      >
        {slides.map((slide, index) => {
          const HeadingTag = index === 0 ? "h1" : "h2";

          return (
          <div key={index} className="w-full shrink-0 relative min-h-[650px] md:min-h-[750px] flex items-center">
            {/* Background Image */}
            <div className="absolute inset-0">
               <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/40 z-10" />
               <Image
                 src={slide.image}
                 alt={slide.imageAlt}
                 fill
                 sizes="100vw"
                 className="object-cover object-right absolute inset-0 opacity-60"
                 priority={index === 0}
                 loading={index === 0 ? "eager" : "lazy"}
                 quality={index === 0 ? 80 : 70}
               />
            </div>

            {/* Content */}
            <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 w-full flex flex-col items-center text-center lg:items-start lg:text-left">
               <div 
                  className="transition-all duration-700 transform opacity-100 translate-y-0"
               >
                 <div className="inline-block px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-8 text-sm md:text-base font-bold tracking-widest text-[#00AEEF] shadow-lg">
                   {slide.badge}
                 </div>
                 <HeadingTag className="text-4xl md:text-5xl lg:text-7xl font-black mb-8 leading-[1.15] tracking-tight max-w-4xl text-white min-h-[5.5rem] md:min-h-[7.5rem] lg:min-h-[11rem]">
                   {slide.title}
                 </HeadingTag>
                 <p className="text-base md:text-lg lg:text-xl mb-12 font-medium max-w-2xl text-slate-200 leading-relaxed min-h-[4.5rem] md:min-h-[5.5rem] lg:min-h-[7rem]">
                   {slide.description}
                 </p>
                 <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pb-12 sm:pb-0">
                   <Link
                     href={slide.buttonLink}
                     className="bg-[#0092df] hover:bg-[#007bbf] text-white px-10 py-4 rounded-xl text-lg font-bold transition-all duration-300 shadow-xl shadow-[#0092df]/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#0092df]/40 flex items-center justify-center gap-2"
                   >
                     {slide.buttonLabel} <ChevronRight className="w-5 h-5 text-white/80" />
                   </Link>
                   <Link
                     href="/about"
                     className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-xl text-lg font-bold transition-all duration-300 flex items-center justify-center gap-2"
                   >
                     Learn More
                   </Link>
                 </div>
               </div>
            </div>
          </div>
          );
        })}
      </div>

      {/* Carousel Indicators (Slider Bar) */}
      <div className="absolute bottom-8 sm:bottom-16 lg:bottom-24 left-0 right-0 z-30 flex gap-3 justify-center max-w-7xl mx-auto px-6 lg:px-8 lg:justify-start">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              goToSlide(index);
            }}
            className={`h-2 rounded-full transition-all duration-500 ease-out group relative overflow-hidden ${
              index === currentSlide
                ? "bg-[#0092df] w-12 shadow-lg shadow-[#0092df]/40"
                : "bg-white/20 hover:bg-white/40 w-4"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? "true" : "false"}
          >
            {/* Visual Progress Highlight for Active Slide */}
            {index === currentSlide && isAutoPlayEnabled && (
              <div 
                key={currentSlide} 
                className="absolute inset-0 bg-white/40 origin-left animate-progress-flow" 
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
