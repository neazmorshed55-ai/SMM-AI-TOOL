/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Clock, Send, AlertCircle, Plus, Trash2, Info } from 'lucide-react';

export default function WhatsAppModule() {
  const [warmupDays, setWarmupDays] = useState(1);
  const [message, setMessage] = useState('');
  const [contacts, setContacts] = useState('');
  
  const dailyLimit = warmupDays * 10 + 5;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-brand-navy">WhatsApp Safe-Sender</h1>
          <p className="text-slate-500">নম্বর ব্যান হওয়া থেকে বাঁচতে সুপরিকল্পিত ভাবে মেসেজ পাঠান।</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-navy">কন্টাক্ট লিস্ট (প্রতিটি নতুন লাইনে একটি নম্বর)</label>
              <textarea 
                placeholder="8801700000000&#10;8801800000000"
                className="w-full h-40 p-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-brand-gold outline-none transition-all"
                value={contacts}
                onChange={(e) => setContacts(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-brand-navy text-amber-700">মেসেজ বডি (Spin-tax ব্যবহার করুন)</label>
                <div className="group relative">
                  <Info className="w-4 h-4 text-slate-400 cursor-help" />
                  <div className="hidden group-hover:block absolute right-0 bottom-full mb-2 w-64 p-3 bg-brand-navy text-white text-xs rounded-xl shadow-xl z-10 transition-all leading-relaxed">
                    উদাহরণ: {'{Hi|Hello|Hey}'} [Name], কেমন আছেন?
                  </div>
                </div>
              </div>
              <textarea 
                placeholder="{Hi|Hello|Greetings} there! This is a test message."
                className="w-full h-32 p-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-brand-gold outline-none transition-all"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-brand-navy text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 shadow-lg active:scale-95 transition-all">
                <Send className="w-5 h-5 text-brand-gold" /> ব্রডকাস্ট শুরু করুন
              </button>
              <button className="px-6 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all">
                <Trash2 className="w-5 h-5 text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-amber-50 p-6 rounded-[2rem] border border-amber-100">
            <h3 className="text-lg font-black text-brand-navy mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-600" /> স্মার্ট ওয়ার্ম-আপ (Warm-up)
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-amber-800 uppercase block mb-2">একাউন্টের বয়স (দিন)</label>
                <input 
                  type="range" min="1" max="30" 
                  className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  value={warmupDays}
                  onChange={(e) => setWarmupDays(parseInt(e.target.value))}
                />
                <div className="flex justify-between text-xs font-bold text-amber-700 mt-2">
                  <span>১ দিন</span>
                  <span>{warmupDays} দিন</span>
                  <span>৩০ দিন</span>
                </div>
              </div>
              
              <div className="bg-white/50 p-4 rounded-xl border border-amber-200">
                <p className="text-xs text-amber-800 mb-1">প্রস্তাবিত ডেইলি লিমিট</p>
                <p className="text-xl font-black text-brand-navy">{dailyLimit} মেসেজ / দিন</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-[2.5rem] text-white shadow-xl">
            <h3 className="text-lg font-black text-brand-gold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" /> স্মার্ট ইন্টারভ্যাল
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800 p-3 rounded-xl">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">মিনিমাম</p>
                  <p className="text-xl font-black text-brand-gold">২০<span className="text-xs ml-1">সেকেন্ড</span></p>
                </div>
                <div className="bg-slate-800 p-3 rounded-xl">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">ম্যাক্সিমাম</p>
                  <p className="text-xl font-black text-brand-gold">৬০<span className="text-xs ml-1">সেকেন্ড</span></p>
                </div>
              </div>
              <p className="text-xs text-slate-400 italic">
                *বট ডিটেকশন এড়াতে ডিলে প্রতিবার র্যান্ডম করা হবে।
              </p>
            </div>
          </div>

          <div className="p-4 flex items-start gap-3 bg-red-50 border border-red-100 rounded-2xl text-red-700">
            <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
            <p className="text-xs font-medium leading-relaxed">
              সতর্কতা: একই সাথে ৫০০ এর বেশি মেসেজ পাঠাবেন না, এতে সাময়িকভাবে সিম ব্লক হতে পারে।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
