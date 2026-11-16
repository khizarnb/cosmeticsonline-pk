import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  label: string;
  titleLine1: string;
  titleLine2: string;
  titleLine3: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  modelImage: string;
  productsImage: string;
  bgGradient: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    label: 'COSMETICSONLINE.PK',
    titleLine1: 'BEAUTY,',
    titleLine2: 'CURATED',
    titleLine3: 'FOR YOU',
    description: "Discover authentic skincare, makeup, haircare and fragrances from the world's most trusted brands.",
    ctaText: 'Shop Collection',
    ctaLink: '/collection/all',
    modelImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
    productsImage: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1000&auto=format&fit=crop',
    bgGradient: 'bg-gradient-to-r from-[#F7EBE5] via-[#F4DFD8] to-[#EBD5CB]',
  },
  {
    id: 2,
    label: 'THE K-BEAUTY REVOLUTION',
    titleLine1: 'DEWY GLASS',
    titleLine2: 'SKIN RITUALS',
    titleLine3: 'FROM SEOUL',
    description: '100% genuine snail mucin, soothing heartleaf, centella, and sunscreens directly imported from South Korea.',
    ctaText: 'Shop K-Beauty',
    ctaLink: '/collection/k-beauty',
    modelImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop',
    productsImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1000&auto=format&fit=crop',
    bgGradient: 'bg-gradient-to-r from-[#F5ECE8] via-[#F0DFD8] to-[#EAD4CB]',
  },
  {
    id: 3,
    label: 'HAUTE PERFUMERY & GLAM',
    titleLine1: 'TIMELESS',
    titleLine2: 'FRAGRANCES &',
    titleLine3: 'MAKEUP',
    description: 'Iconic designer fragrances and viral Korean lip tints for every celebration across Pakistan.',
    ctaText: 'Discover Glamour',
    ctaLink: '/collection/fragrance',
    modelImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop',
    productsImage: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop',
    bgGradient: 'bg-gradient-to-r from-[#EDE4DE] via-[#E8D9D2] to-[#DFCCC3]',
  },
];

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  return (
    <section className="relative w-full overflow-hidden select-none">
      {/* Background with luxury soft tone */}
      <div className={`w-full ${slide.bgGradient} transition-colors duration-1000`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[460px] sm:min-h-[520px]">
            {/* Left Column: Editorial Model Beauty Portrait */}
            <div className="lg:col-span-4 order-2 lg:order-1 flex justify-center">
              <div className="relative w-64 sm:w-72 lg:w-80 h-72 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/60">
                <img
                  src={slide.modelImage}
                  alt="CosmeticsOnline Beauty Model"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 text-[10px] uppercase font-bold tracking-widest text-white/90">
                  Authentic Beauty
                </span>
              </div>
            </div>

            {/* Center Column: Editorial Typography & CTA */}
            <div className="lg:col-span-4 order-1 lg:order-2 text-center lg:text-left space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-gray-700">
                <span>{slide.label}</span>
                <span className="w-8 h-[1px] bg-black opacity-30"></span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-black uppercase leading-[1.05] tracking-tight">
                <span>{slide.titleLine1}</span>
                <br />
                <span className="italic font-normal">{slide.titleLine2}</span>
                <br />
                <span>{slide.titleLine3}</span>
              </h1>

              <p className="text-xs sm:text-sm text-gray-700 max-w-md mx-auto lg:mx-0 leading-relaxed font-sans font-normal">
                {slide.description}
              </p>

              <div className="pt-2">
                <Link
                  to={slide.ctaLink}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-[#7A4E5A] hover:shadow-lg transition-all active:scale-95 group"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Column: Luxury Skincare Plinths & Products */}
            <div className="lg:col-span-4 order-3 flex justify-center">
              <div className="relative w-64 sm:w-72 lg:w-80 h-72 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/60 bg-white">
                <img
                  src={slide.productsImage}
                  alt="Luxury Beauty Products"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-bold text-[#7A4E5A] tracking-wider uppercase shadow-xs">
                  Direct Imports
                </div>
              </div>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'w-8 bg-black' : 'w-2 bg-black/25 hover:bg-black/50'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Manual Chevron Arrows */}
      <button
        onClick={handlePrev}
        className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 hover:bg-white text-black items-center justify-center shadow-md transition-all z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={handleNext}
        className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 hover:bg-white text-black items-center justify-center shadow-md transition-all z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </section>
  );
};
