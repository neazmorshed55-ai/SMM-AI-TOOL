/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { MessageSquare, Mail, Share2, Activity, Users, Zap, Sparkles, Github } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { label: "আজকের মেসেজ", value: "১২৪", icon: <MessageSquare className="w-5 h-5 text-amber-500" />, trend: "+১২%" },
    { label: "ইমেইল সেন্ট", value: "৪৮", icon: <Mail className="w-5 h-5 text-amber-500" />, trend: "+৫%" },
    { label: "সোশ্যাল পোস্ট", value: "৩", icon: <Share2 className="w-5 h-5 text-amber-500" />, trend: "০%" },
    { label: "সক্রিয় কন্টাক্ট", value: "১,২৭৫", icon: <Users className="w-5 h-5 text-amber-500" />, trend: "+৮%" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-brand-navy">ড্যাশবোর্ড ওভারভিউ</h1>
          <p className="text-slate-500">আপনার মার্কেটিং অটোমেশনের লাইভ স্ট্যাটাস দেখুন।</p>
        </div>
        <button className="bg-brand-navy text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg active:scale-95">
          <Zap className="w-4 h-4 text-brand-gold" /> নতুন ক্যাম্পেইন শুরু করুন
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-slate-50 p-3 rounded-2xl">
                {stat.icon}
              </div>
              <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">
                {stat.trend}
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-black text-brand-navy mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-brand-navy flex items-center gap-2">
              <Activity className="w-5 h-5 text-amber-500" /> প্রজেক্ট স্ট্যাটাস (Connectivity)
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg"><Github className="w-4 h-4 text-green-700" /></div>
              <div>
                <p className="text-xs font-bold text-slate-700">GitHub</p>
                <p className="text-[10px] text-green-600 font-medium">SMM-AI-TOOL (Ready)</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg"><Zap className="w-4 h-4 text-blue-700" /></div>
              <div>
                <p className="text-xs font-bold text-slate-700">Vercel</p>
                <p className="text-[10px] text-blue-600 font-medium">deployment.json (Configured)</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <div className="bg-amber-100 p-2 rounded-lg"><Sparkles className="w-4 h-4 text-amber-700" /></div>
              <div>
                <p className="text-xs font-bold text-slate-700">Gemini AI</p>
                <p className="text-[10px] text-amber-600 font-medium">Free Tier (Active)</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-lg"><Users className="w-4 h-4 text-indigo-700" /></div>
              <div>
                <p className="text-xs font-bold text-slate-700">Multi-User</p>
                <p className="text-[10px] text-indigo-600 font-medium">Firebase Auth (Enabled)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-brand-navy p-8 rounded-[2.5rem] text-white shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2 text-brand-gold">Safe Sender টিপস</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              আপনার নম্বর নিরাপদ রাখতে প্রতি মেসেজের মাঝে কমপক্ষে ২০-৪০ সেকেন্ডের গ্যাপ রাখুন।
            </p>
          </div>
          <div className="mt-8">
            <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">আজকের ওয়ার্ম-আপ স্ট্যাটাস</p>
              <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                <div className="bg-brand-gold w-3/4 h-full" />
              </div>
              <p className="text-xs text-slate-400 mt-2 text-right">৭৫/১০০ মেসেজ আজকের লিমিট</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
