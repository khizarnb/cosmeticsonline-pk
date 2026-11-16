import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FaqItem[] = [
  {
    category: 'Authenticity',
    question: 'Are all your products 100% original and authentic?',
    answer:
      'Yes, absolutely. We source exclusively from authorized international brand distributors in South Korea, Canada, the UK, Europe, and the USA. Every item comes with manufacturer batch numbers that can be checked on online check-fresh verification tools, alongside our proprietary tamper-evident security seal.'
  },
  {
    category: 'Shipping',
    question: 'How long does delivery take across Pakistan?',
    answer:
      'Orders in major cities like Lahore, Karachi, and Islamabad / Rawalpindi are delivered within 24 to 48 hours. Orders to other cities (Faisalabad, Multan, Peshawar, Quetta, Gujranwala, Sialkot, etc.) take between 2 to 4 business days via TCS Express and Leopard Courier.'
  },
  {
    category: 'Shipping',
    question: 'What are the delivery charges and how do I get Free Shipping?',
    answer:
      'Standard nationwide shipping is Rs. 250 flat. Any order with a subtotal of Rs. 5,000 or above automatically qualifies for 100% FREE nationwide delivery.'
  },
  {
    category: 'Payment',
    question: 'Do you offer Cash on Delivery (COD)?',
    answer:
      'Yes, Cash on Delivery is available across all serviceable postal codes in Pakistan. You only pay when the rider hands over your parcel. We also accept Direct Bank Transfer (Meezan Bank / HBL / SCB) and local Visa / Mastercard debit cards.'
  },
  {
    category: 'Returns',
    question: 'What is your return and refund policy?',
    answer:
      'We provide a 7-day hassle-free return guarantee. If a product arrives damaged in transit or is unopened with its manufacturer seals intact, you can initiate a return or exchange by contacting our WhatsApp concierge.'
  },
  {
    category: 'Skincare Advice',
    question: 'How can I get advice on picking the right products for my skin?',
    answer:
      'You can reach out directly to our Beauty Concierge via WhatsApp (+92 300 0000000). Our trained consultants will review your skin type, primary concerns (acne, pigmentation, barrier repair), and curate a personalized AM/PM routine.'
  }
];

export const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="w-full bg-[#F9F7F4] min-h-screen pb-20">
      <div className="border-b border-[#E8D6C9]/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <span className="font-semibold text-black">Frequently Asked Questions</span>
        </div>
      </div>

      <div className="bg-[#FAF7F5] border-b border-[#E8D6C9] py-12 text-center">
        <div className="max-w-2xl mx-auto px-4 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#7A4E5A] flex items-center justify-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" /> QUESTIONS & ANSWERS
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-black uppercase">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 font-sans">
            Everything you need to know about our authenticity standards, shipping timelines, payments and return policies.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#E8D6C9] overflow-hidden shadow-xs transition-all"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A4E5A] block mb-1">
                    {faq.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-serif font-bold text-black leading-snug">
                    {faq.question}
                  </h3>
                </div>
                <div
                  className={`w-8 h-8 rounded-full bg-[#FAF7F5] flex items-center justify-center text-black flex-shrink-0 transition-transform ${
                    openIndex === idx ? 'rotate-180 bg-black text-white' : ''
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {openIndex === idx && (
                <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 font-sans">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Support Banner */}
        <div className="mt-12 p-8 rounded-3xl bg-[#F5ECE5] border border-[#DEC5C2] text-center space-y-3">
          <h4 className="font-serif text-xl font-bold text-black">Still have questions?</h4>
          <p className="text-xs text-gray-600 max-w-md mx-auto">
            Our beauty specialists are available 6 days a week to answer your queries and recommend routines.
          </p>
          <Link
            to="/contact"
            className="inline-block mt-2 px-6 py-2.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-[#7A4E5A]"
          >
            Contact Customer Care
          </Link>
        </div>
      </div>
    </div>
  );
};
