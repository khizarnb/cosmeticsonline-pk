import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle2 } from 'lucide-react';

export const ContactUsPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#F9F7F4] min-h-screen pb-20">
      <div className="border-b border-[#E8D6C9]/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <span className="font-semibold text-black">Contact Concierge</span>
        </div>
      </div>

      <div className="bg-[#FAF7F5] border-b border-[#E8D6C9] py-12 text-center">
        <div className="max-w-2xl mx-auto px-4 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#7A4E5A]">
            WE ARE HERE TO ASSIST YOU
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-black uppercase">
            Contact Concierge
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 font-sans leading-relaxed">
            Need skincare recommendations, order status updates, or bulk gifting consultation? Reach out directly to our dedicated customer service team.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Contact Details Card */}
          <div className="md:col-span-5 bg-white rounded-3xl border border-[#E8D6C9] p-6 sm:p-8 shadow-sm space-y-6">
            <h3 className="font-serif text-xl font-bold text-black border-b border-gray-100 pb-3">
              Direct Channels
            </h3>

            <div className="space-y-4 text-xs text-gray-700">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FAF7F5] flex items-center justify-center text-[#7A4E5A] flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-black">Phone Helpline</h4>
                  <p className="text-gray-500">+92 (042) 3578-9000</p>
                  <p className="text-gray-500">Mon–Sat: 9:00 AM – 9:00 PM PKT</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FAF7F5] flex items-center justify-center text-[#7A4E5A] flex-shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-black">WhatsApp Beauty Concierge</h4>
                  <p className="text-gray-500">+92 300 0000000</p>
                  <p className="text-gray-500">Instant routine consultations</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FAF7F5] flex items-center justify-center text-[#7A4E5A] flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-black">Email Enquiries</h4>
                  <p className="text-gray-500">concierge@cosmeticsonline.pk</p>
                  <p className="text-gray-500">Responses within 4 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FAF7F5] flex items-center justify-center text-[#7A4E5A] flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-black">Fulfillment Hubs</h4>
                  <p className="text-gray-500">Main Boulevard Gulberg III, Lahore</p>
                  <p className="text-gray-500">Phase 5, DHA, Karachi</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="md:col-span-7 bg-white rounded-3xl border border-[#E8D6C9] p-6 sm:p-8 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
                <h3 className="font-serif text-2xl font-bold text-black">Message Received!</h3>
                <p className="text-xs text-gray-600 max-w-sm mx-auto">
                  Thank you for reaching out. One of our senior beauty advisors will respond to your enquiry shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <h3 className="font-serif text-xl font-bold text-black border-b border-gray-100 pb-3">
                  Send Us a Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Zainab Shah"
                      className="w-full p-3 rounded-xl border border-[#E8D6C9] text-xs focus:ring-1 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+92 3XX XXXXXXX"
                      className="w-full p-3 rounded-xl border border-[#E8D6C9] text-xs focus:ring-1 focus:ring-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full p-3 rounded-xl border border-[#E8D6C9] text-xs focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">How can we help? *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter details about your order, skin type inquiry or feedback..."
                    className="w-full p-3 rounded-xl border border-[#E8D6C9] text-xs focus:ring-1 focus:ring-black"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-[#7A4E5A] transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
