/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Share2, Facebook, Instagram, Sparkles, ExternalLink, Globe, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'motion/react';

export default function SocialModule() {
  const [postContent, setPostContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'posting' | 'groups'>('posting');

  const generateCaption = async () => {
    if (!postContent.trim()) return;
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const prompt = `Write an engaging Facebook/Instagram caption based on this topic: "${postContent}". Include relevant emojis and hashtags. Language: Bengali (with some English mixing if natural).`;
      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });
      const text = result.text || '';
      setPostContent(text);
    } catch (error) {
      console.error("Caption generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const groupLinks = [
    { name: "Digital Marketing BD", url: "https://www.facebook.com/groups/digitalmarketingbd" },
    { name: "Freelancers Community", url: "https://www.facebook.com/groups/freelancehub" },
    { name: "Ecommerce Owners", url: "https://www.facebook.com/groups/ecommerceowners" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-brand-navy">Social Connect</h1>
          <p className="text-slate-500">Facebook এবং Instagram-এ স্মার্ট অটোমেশন ও গ্রুপ শেয়ারিং।</p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-100">
          <button 
            onClick={() => setActiveTab('posting')}
            className={`flex-1 py-4 font-bold text-sm transition-all flex items-center justify-center gap-2 ${activeTab === 'posting' ? 'bg-slate-900 text-white' : 'hover:bg-slate-50 text-slate-500'}`}
          >
            <Globe className="w-4 h-4" /> সরাসরি পোস্টিং
          </button>
          <button 
            onClick={() => setActiveTab('groups')}
            className={`flex-1 py-4 font-bold text-sm transition-all flex items-center justify-center gap-2 ${activeTab === 'groups' ? 'bg-slate-900 text-white' : 'hover:bg-slate-50 text-slate-500'}`}
          >
            <Facebook className="w-4 h-4" /> গ্রুপ শেয়ারিং (Semi-Auto)
          </button>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'posting' ? (
              <motion.div 
                key="posting"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-brand-navy uppercase tracking-wider">পোস্ট কন্টেন্ট</label>
                    <button 
                      onClick={generateCaption}
                      disabled={isGenerating || !postContent.trim()}
                      className="text-white bg-gradient-to-r from-purple-600 to-indigo-600 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 hover:shadow-lg transition-all disabled:opacity-50"
                    >
                      {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3 text-brand-gold" />}
                      AI ক্যাপশন জেনারেটর
                    </button>
                  </div>
                  <textarea 
                    placeholder="আপনার পোস্টের আইডয়া বা কন্টেন্ট লিখুন..."
                    className="w-full h-48 p-6 rounded-[2rem] bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-brand-gold outline-none transition-all resize-none shadow-inner"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    onClick={() => {
                        if(!postContent) return;
                        setIsGenerating(true);
                        setTimeout(() => {
                            setIsGenerating(false);
                            alert("Facebook-এ পোস্ট করা হয়েছে (Simulated)");
                        }, 2000);
                    }}
                    className="py-4 bg-brand-navy text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-md active:scale-95"
                  >
                    <Facebook className="w-5 h-5 text-blue-400" /> Facebook পেজে পোস্ট দিন
                  </button>
                  <button 
                    onClick={() => {
                        if(!postContent) return;
                        setIsGenerating(true);
                        setTimeout(() => {
                            setIsGenerating(false);
                            alert("Instagram-এ পোস্ট করা হয়েছে (Simulated)");
                        }, 2000);
                    }}
                    className="py-4 bg-brand-navy text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-md active:scale-95"
                  >
                    <Instagram className="w-5 h-5 text-pink-400" /> Instagram-এ পোস্ট দিন
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="groups"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-start gap-4">
                  <div className="bg-blue-600 p-2 rounded-lg text-white">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-900">কিভাবে কাজ করবে?</h3>
                    <p className="text-sm text-blue-800/80 leading-relaxed mt-1">
                      ফেসবুক পলিসি অনুযায়ী অটোমেটেড গ্রুপ পোস্টিং ঝুঁকিপূর্ণ। তাই আমাদের টুল আপনার পোস্টটি কপি করে দিবে এবং নিচের লিস্টের ৫টি গ্রুপ একের পর এক নতুন ট্যাবে ওপেন করবে। আপনি শুধু পেস্ট করে পোস্ট করবেন। এতে আপনার আইডি ১০০% নিরাপদ থাকবে।
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {groupLinks.map((group, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-gold transition-all group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Facebook className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="font-bold text-slate-700 text-sm">{group.name}</span>
                      </div>
                      <a 
                        href={group.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition-all"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  ))}
                  <button className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-brand-gold hover:border-brand-gold transition-all text-sm font-bold">
                    <Globe className="w-4 h-4" /> নতুন গ্রুপ অ্যাড করুন
                  </button>
                </div>

                <button className="w-full py-4 bg-brand-gold text-brand-navy rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-yellow-500 shadow-xl transition-all active:scale-95">
                  <Sparkles className="w-6 h-6" /> আজকের ৫টি গ্রুপে শেয়ার শুরু করুন
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
