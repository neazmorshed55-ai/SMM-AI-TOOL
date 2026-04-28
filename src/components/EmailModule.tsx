/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Mail, Send, History, CheckCircle, BarChart3, AlertTriangle } from 'lucide-react';

export default function EmailModule() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const sendEmail = async () => {
    if (!to || !subject || !body) {
      setStatus({ type: 'error', message: 'সবগুলো ঘর পূরণ করুন।' });
      return;
    }

    setLoading(true);
    setStatus(null);
    try {
      const apiKey = localStorage.getItem('RESEND_API_KEY');
      if (!apiKey) throw new Error('Settings থেকে Resend API Key সেট করুন।');

      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, subject, html: body, apiKey }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'ইমেইল পাঠানো সম্ভব হয়নি।');

      setStatus({ type: 'success', message: 'ইমেইল সফলভাবে পাঠানো হয়েছে!' });
    } catch (error: any) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-brand-navy">Email Campaign</h1>
          <p className="text-slate-500">Resend API ব্যবহার করে হাই-ডেলিভারি ইমেইল পাঠান।</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
             <div className="space-y-2">
              <label className="text-sm font-bold text-brand-navy">কার কাছে পাঠাতে চান (Recipient Email)</label>
              <input 
                type="email"
                placeholder="example@gmail.com"
                className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-brand-gold outline-none transition-all"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-navy">ইমেইল সাবজেক্ট</label>
              <input 
                type="text"
                placeholder="আপনার ক্যাম্পেইনের সাবজেক্ট লিখুন..."
                className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-brand-gold outline-none transition-all"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-navy">মেসেজ বডি (HTML সাপোর্ট করে)</label>
              <textarea 
                placeholder="এখানে আপনার ইমেইল লিখুন..."
                className="w-full h-64 p-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-brand-gold outline-none transition-all"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>

            {status && (
              <div className={`p-4 rounded-2xl flex items-center gap-3 ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <p className="text-sm font-medium">{status.message}</p>
              </div>
            )}

            <button 
              onClick={sendEmail}
              disabled={loading}
              className="w-full bg-brand-navy text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 shadow-lg active:scale-95 transition-all disabled:opacity-50"
            >
               {loading ? 'পাঠানো হচ্ছে...' : <><Send className="w-5 h-5 text-brand-gold" /> ক্যাম্পেইন লঞ্চ করুন</>}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-brand-navy mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-brand-gold" /> ডেলিভারি স্ট্যাটাস
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">আজকের কোটা (Quota)</span>
                <span className="font-bold">৪৭/৩০০</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-green-500 w-[15.6%] h-full" />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-green-50 p-3 rounded-xl">
                  <p className="text-[10px] text-green-700 uppercase font-bold">সফল (Sent)</p>
                  <p className="text-xl font-black text-green-800">৪৫</p>
                </div>
                <div className="bg-red-50 p-3 rounded-xl">
                  <p className="text-[10px] text-red-700 uppercase font-bold">ব্যর্থ (Failed)</p>
                  <p className="text-xl font-black text-red-800">২</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-[2.5rem] text-white shadow-xl">
            <h3 className="text-lg font-black text-brand-gold mb-4 flex items-center gap-2">
              <History className="w-5 h-5" /> রিসেন্ট ক্যাম্পেইন
            </h3>
            <div className="space-y-3">
              {[1, 2].map((_, i) => (
                <div key={i} className="bg-slate-800/50 p-3 rounded-xl border border-slate-700 flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <div>
                    <p className="text-xs font-bold text-slate-200">Eid Offer Campaign</p>
                    <p className="text-[10px] text-slate-500">১০ দিন আগে • ২০০ টি পাঠানো হয়েছে</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3 text-amber-800">
            <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
            <p className="text-xs font-medium">
              ইমেইল সেন্ড করার আগে <strong> Resend API Key </strong> সেটিংস পেজ থেকে একবার চেক করে নিন।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
