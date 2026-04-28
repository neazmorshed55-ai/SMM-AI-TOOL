/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Mail, 
  Share2, 
  Settings as SettingsIcon,
  Zap,
  Menu,
  X,
  ChevronRight,
  LogOut,
  Github
} from 'lucide-react';

import Dashboard from './components/Dashboard';
import WhatsAppModule from './components/WhatsAppModule';
import EmailModule from './components/EmailModule';
import SocialModule from './components/SocialModule';
import { ModuleId } from './types';

import { useAuth } from './FirebaseProvider';

export default function App() {
  const [activeModule, setActiveModule] = useState<ModuleId>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, login, loginGithub, logout, loading } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'ড্যাশবোর্ড', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'whatsapp', label: 'WhatsApp Safe', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'email', label: 'Email Campaign', icon: <Mail className="w-5 h-5" /> },
    { id: 'social', label: 'Social Connect', icon: <Share2 className="w-5 h-5" /> },
    { id: 'settings', label: 'সেটিংস', icon: <SettingsIcon className="w-5 h-5" /> },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-navy flex items-center justify-center">
        <Zap className="w-12 h-12 text-brand-gold animate-pulse" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-brand-navy flex items-center justify-center p-6 bg-gradient-to-br from-brand-navy to-slate-900">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[3rem] shadow-2xl max-w-md w-full text-center space-y-8 border border-slate-100"
        >
          <div className="bg-slate-50 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto shadow-sm">
            <Zap className="w-10 h-10 text-brand-gold fill-current" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-brand-navy">OmniConnect</h1>
            <p className="text-slate-500 mt-2 font-medium">আপনার অল-ইন-ওয়ান মার্কেটিং হাব</p>
          </div>
          <div className="space-y-3 px-2">
            <button 
              onClick={login}
              className="w-full bg-white border border-slate-200 text-brand-navy py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-sm"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Google দিয়ে লগ-ইন করুন
            </button>
            <button 
              onClick={loginGithub}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-sm"
            >
              <Github className="w-5 h-5" />
              GitHub দিয়ে লগ-ইন করুন
            </button>
          </div>
          <p className="text-xs text-slate-400">লগ-ইন করার মাধ্যমে আপনি আমাদের শর্তাবলীতে রাজি হচ্ছেন।</p>
        </motion.div>
      </div>
    );
  }

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard': return <Dashboard />;
      case 'whatsapp': return <WhatsAppModule />;
      case 'email': return <EmailModule />;
      case 'social': return <SocialModule />;
      case 'settings': return <SettingsPage />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-brand-navy border-r border-slate-800 text-white flex flex-col fixed h-full z-50 shrink-0 transition-all duration-300"
      >
        <div className="p-6 flex items-center justify-between">
          <div className={`flex items-center gap-3 overflow-hidden ${!isSidebarOpen && 'hidden'}`}>
            <div className="bg-brand-gold p-2 rounded-xl text-brand-navy">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <span className="font-black text-xl tracking-tight">OmniConnect</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-800 rounded-xl transition-colors"
          >
            {isSidebarOpen ? <X className="w-5 h-5 text-slate-400" /> : <Menu className="w-5 h-5 text-slate-400" />}
          </button>
        </div>

        <nav className="flex-1 px-4 mt-8 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id as ModuleId)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all relative group ${
                activeModule === item.id 
                  ? 'bg-brand-gold text-brand-navy shadow-lg shadow-brand-gold/10' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className={activeModule === item.id ? 'text-brand-navy' : 'text-slate-500 group-hover:text-brand-gold'}>
                {item.icon}
              </div>
              {isSidebarOpen && (
                <span className="font-bold text-sm truncate">{item.label}</span>
              )}
              {activeModule === item.id && isSidebarOpen && (
                <ChevronRight className="w-4 h-4 ml-auto" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800">
          <button 
            onClick={logout}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all ${!isSidebarOpen && 'justify-center'}`}
          >
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span className="font-bold text-sm">লগ আউট</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-[280px]' : 'ml-[80px]'}`}>
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40 px-8 py-4 flex items-center justify-end gap-4">
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-brand-navy">{user.displayName || 'ব্যবহারকারী'}</p>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Admin Account</p>
            </div>
            {user.photoURL ? (
              <img src={user.photoURL} alt="User" className="w-10 h-10 rounded-2xl shadow-md ring-4 ring-slate-50" />
            ) : (
              <div className="w-10 h-10 rounded-2xl bg-brand-gold flex items-center justify-center font-black text-brand-navy shadow-md ring-4 ring-slate-50">
                {user.displayName?.[0] || 'U'}
              </div>
            )}
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderModule()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function SettingsPage() {
  const [resendKey, setResendKey] = useState(localStorage.getItem('RESEND_API_KEY') || '');
  const [saveStatus, setSaveStatus] = useState(false);

  const saveSettings = () => {
    localStorage.setItem('RESEND_API_KEY', resendKey);
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-brand-navy">সেটিংস</h1>
        <p className="text-slate-500">আপনার API কী এবং একাউন্ট কনফিগারেশন ম্যানেজ করুন।</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Zap className="w-5 h-5 text-brand-gold" /> API ইন্টিগ্রেশন
          </h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Gemini API Key</label>
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 text-sm italic">
                 AI Studio-র মাধ্যমে স্বয়ংক্রিয়ভাবে যুক্ত আছে।
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Resend API Key</label>
              <input 
                type="password" 
                placeholder="re_example_123..." 
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-gold outline-none" 
                value={resendKey}
                onChange={(e) => setResendKey(e.target.value)}
              />
            </div>
          </div>
          <button 
            onClick={saveSettings}
            className={`w-full py-4 rounded-2xl font-bold transition-all ${saveStatus ? 'bg-green-600' : 'bg-brand-navy'} text-white hover:bg-slate-800`}
          >
            {saveStatus ? 'সফলভাবে সেভ হয়েছে!' : 'সেভ করুন'}
          </button>
        </div>

        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-brand-gold mb-4">অটোমেশন গাইডলাইন</h2>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex gap-3">
                <span className="text-brand-gold font-bold">০১.</span> আপনার সব কন্টাক্ট নম্বর আন্তর্জাতিক ফরম্যাটে (যেমন: 88017...) সেভ করুন।
              </li>
              <li className="flex gap-3">
                <span className="text-brand-gold font-bold">০২.</span> ইমেইল ক্যাম্পেইনের সময় ইমেইল সাবজেক্ট আকর্ষণীয় করার চেষ্টা করুন।
              </li>
              <li className="flex gap-3">
                <span className="text-brand-gold font-bold">০৩.</span> সোশ্যাল মিডিয়া পোস্টিংয়ের সময় AI ব্যবহার করে নিয়মিত নতুন কন্টেন্ট তৈরি করুন।
              </li>
            </ul>
          </div>
          <div className="mt-8 p-4 bg-slate-800 rounded-2xl border border-slate-700">
            <p className="text-xs text-slate-500">সিস্টেম ভার্সন: v1.0.4-beta</p>
            <p className="text-xs text-slate-500">সার্ভার স্ট্যাটাস: <span className="text-green-400">Online</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
