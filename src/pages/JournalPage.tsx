import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Clock, Calendar, User } from 'lucide-react';
import { INITIAL_BLOG_POSTS } from '../data/mockData';

export const JournalPage: React.FC = () => {
  return (
    <div className="w-full bg-[#F9F7F4] min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="border-b border-[#E8D6C9]/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <span className="font-semibold text-black">The Beauty Journal</span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-[#FAF7F5] border-b border-[#E8D6C9] py-12 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#7A4E5A] flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> DERMATOLOGICAL WISDOM & EDITORIALS
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-black uppercase">
            The Beauty Journal
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto font-sans leading-relaxed">
            Curated expert guides on building personalized routines, decoding Korean skincare ingredients, preventing hair loss, and seasonal beauty trends.
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INITIAL_BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-3xl overflow-hidden border border-[#E8D6C9] hover:shadow-luxury-hover hover:border-[#C8A5A1] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] w-full overflow-hidden bg-gray-100">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-gray-400">
                    <span className="font-bold text-[#7A4E5A] uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                  </div>

                  <Link to={`/journal/${post.slug}`}>
                    <h2 className="font-serif text-xl font-bold text-black group-hover:text-[#7A4E5A] transition-colors leading-snug">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-400 text-[11px]">{post.date}</span>
                <Link
                  to={`/journal/${post.slug}`}
                  className="font-bold text-black group-hover:text-[#7A4E5A] flex items-center gap-1 group-hover:translate-x-1 transition-all"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
