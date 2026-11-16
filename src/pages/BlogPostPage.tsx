import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Calendar, ArrowLeft, Share2, Sparkles } from 'lucide-react';
import { INITIAL_BLOG_POSTS } from '../data/mockData';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = INITIAL_BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="font-serif text-3xl font-bold text-black mb-3">Article Not Found</h2>
        <Link to="/journal" className="px-6 py-2.5 rounded-full bg-black text-white text-xs font-bold uppercase">
          Back to Journal
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F9F7F4] min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="border-b border-[#E8D6C9]/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <Link to="/journal" className="hover:text-black">The Beauty Journal</Link>
          <span>/</span>
          <span className="font-semibold text-black truncate max-w-xs">{post.title}</span>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <Link
          to="/journal"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-black mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to all articles
        </Link>

        {/* Title & Metadata */}
        <div className="space-y-4 mb-8 text-center sm:text-left">
          <span className="text-[11px] font-bold text-[#7A4E5A] uppercase tracking-widest bg-[#F4ECEE] px-3 py-1 rounded-full inline-block">
            {post.category}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-black leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-gray-500 pt-2 border-b border-[#E8D6C9] pb-4">
            <span>By <strong>{post.author}</strong></span>
            <span>•</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
          </div>
        </div>

        {/* Feature Image */}
        <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-luxury border border-[#E8D6C9] mb-10">
          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Body Content */}
        <div className="bg-white rounded-3xl border border-[#E8D6C9] p-8 sm:p-12 shadow-sm space-y-6 text-sm sm:text-base text-gray-700 leading-relaxed font-sans">
          <p className="font-serif text-xl sm:text-2xl text-black italic font-normal leading-relaxed border-l-4 border-[#7A4E5A] pl-4">
            "{post.excerpt}"
          </p>

          <div className="space-y-4 pt-4 text-sm text-gray-700 leading-relaxed">
            {post.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph.trim()}</p>
            ))}
          </div>

          {/* Curated Routine Callout Box */}
          <div className="mt-8 p-6 rounded-2xl bg-[#F5ECE5] border border-[#DEC5C2] space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#7A4E5A] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> EDITOR'S PRODUCT RECOMMENDATION
            </span>
            <h4 className="font-serif text-lg font-bold text-black">
              Start with the Cult Essentials
            </h4>
            <p className="text-xs text-gray-600">
              Incorporate gentle, multi-molecular formulas into your daily vanity. Authenticity guaranteed with nationwide door-to-door delivery.
            </p>
            <Link
              to="/collection/k-beauty"
              className="inline-block mt-2 px-5 py-2.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-[#7A4E5A]"
            >
              Shop Curated Routine
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};
