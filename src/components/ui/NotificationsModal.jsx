import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Award, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotificationsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      type: 'review',
      icon: Award,
      color: 'text-emerald-700 bg-emerald-100',
      title: '7-Day Weekly Audit Dossier Available',
      desc: 'Your weekly consumption cycle has recorded 5 days below the CPCB 34g benchmark. Ready for final evaluation.',
      time: 'Just now',
      link: '/sunday-review',
      linkText: 'View Audit'
    },
    {
      id: 2,
      type: 'statutory',
      icon: ShieldCheck,
      color: 'text-blue-700 bg-blue-100',
      title: 'CPCB PWM Rules Statutory Notice',
      desc: 'Remember: 19 Single-Use Plastic categories are under nationwide ban in India. Check your campus compliance score.',
      time: '2 hours ago',
      link: '/docs',
      linkText: 'Read Gazette'
    },
    {
      id: 3,
      type: 'swap',
      icon: CheckCircle2,
      color: 'text-amber-700 bg-amber-100',
      title: 'Eco-Swap Financial Dividend',
      desc: 'Replacing your daily 500ml PET bottle with a stainless steel bottle is estimated to save you ₹600/month.',
      time: 'Yesterday',
      link: '/alternatives',
      linkText: 'Explore Swaps'
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          className="relative w-full max-w-md bg-white border border-stone-200 rounded-3xl shadow-2xl p-6 font-body text-stone-900"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-200">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-900">
                <Bell size={18} />
              </div>
              <div>
                <h3 className="text-base font-black font-heading text-stone-900 leading-tight">
                  System Alerts &amp; Telemetry
                </h3>
                <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest">
                  Environmental Updates
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="p-1.5 rounded-xl text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* List */}
          <div className="space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar pr-1">
            {notifications.map((n) => {
              const Icon = n.icon;
              return (
                <div key={n.id} className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl shrink-0 ${n.color}`}>
                      <Icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <h4 className="text-xs font-bold text-stone-900 truncate">{n.title}</h4>
                        <span className="text-[10px] font-mono text-stone-600 shrink-0">{n.time}</span>
                      </div>
                      <p className="text-xs text-stone-700 leading-relaxed font-body">
                        {n.desc}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end pt-1">
                    <Link
                      to={n.link}
                      onClick={onClose}
                      className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-700 hover:text-emerald-900"
                    >
                      <span>{n.linkText}</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-3 border-t border-stone-100 text-center">
            <button
              onClick={onClose}
              type="button"
              className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-black text-white font-mono text-xs font-bold transition cursor-pointer"
            >
              Dismiss All
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
