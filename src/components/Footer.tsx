import React, { useState, useEffect } from 'react';
import {
  Github, Linkedin, Mail, MapPin, Clock, Cpu,
  Heart, Zap, Code2, ArrowUpRight, Copy, Check
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const CONTACT_EMAIL = 'sabareesgodkiller@gmail.com';

const LiveClock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="font-mono text-xs text-zinc-400">
      {time.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata',
      })}{' '}
      IST
    </span>
  );
};

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  };

  const navLinks = [
    { label: 'Home', page: 'Home', hint: 'Overview & domains' },
    { label: 'Projects', page: 'Projects', hint: 'IoT, Web & Robotics' },
    { label: 'Skills', page: 'Skills', hint: 'Technical stack' },
    { label: 'Resume', page: 'Resume', hint: 'Experience & PDF' },
  ];

  const socials = [
    {
      icon: <Github size={18} />,
      href: 'https://github.com/sabarees3578',
      label: 'GitHub',
      color: 'hover:bg-zinc-700 hover:border-zinc-500 hover:text-white',
    },
    {
      icon: <Linkedin size={18} />,
      href: 'https://www.linkedin.com/in/sabarees-rajendran',
      label: 'LinkedIn',
      color: 'hover:bg-blue-600/30 hover:border-blue-500 hover:text-blue-400',
    },
    {
      icon: <Mail size={18} />,
      href: `mailto:${CONTACT_EMAIL}`,
      label: 'Email',
      color: 'hover:bg-purple-600/30 hover:border-purple-500 hover:text-purple-400',
    },
  ];

  return (
    <footer className="relative mt-12 overflow-hidden">
      {/* Top gradient separator */}
      <div className="relative h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent blur-sm" />
      </div>

      <div className="relative bg-zinc-950/90 border-t border-white/10">
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Corner glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-indigo-600/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
            {/* Brand column */}
            <div className="md:col-span-5 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Cpu size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-white leading-none">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-cyan-200">
                      Sabarees
                    </span>{' '}
                    <span className="text-white">Rajendran</span>
                  </div>
                  <div className="text-[11px] text-zinc-400 font-mono mt-1 uppercase tracking-widest">
                    Multi-Discipline Engineer
                  </div>
                </div>
              </div>

              <p className="text-zinc-300 text-sm leading-relaxed max-w-sm">
                Building intelligent hardware-software ecosystems — from embedded firmware and LoRaWAN
                networks to full-stack web apps and robotic control systems.
              </p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-zinc-300 text-xs">
                  <MapPin size={13} className="text-cyan-300 flex-shrink-0" />
                  <span>Tamil Nadu, India</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300 text-xs">
                  <Clock size={13} className="text-cyan-300 flex-shrink-0" />
                  <span>Local time:</span>
                  <LiveClock />
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span className="text-emerald-400 font-semibold">Available for hire</span>
                </div>
              </div>
            </div>

            {/* Quick Navigation column */}
            <div className="md:col-span-3 space-y-4">
              <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-[0.18em]">
                Explore
              </h3>
              <ul className="space-y-2.5">
                {navLinks.map((item) => (
                  <li key={item.page}>
                    <button
                      type="button"
                      onClick={() => onNavigate(item.page)}
                      className="group w-full flex items-center justify-between text-left px-3 py-2 rounded-xl bg-zinc-900/75 hover:bg-zinc-900 border border-white/10 hover:border-indigo-400/40 transition-all duration-200"
                    >
                      <div>
                        <div className="text-sm font-semibold text-white group-hover:text-cyan-200 transition-colors">
                          {item.label}
                        </div>
                        <div className="text-[11px] text-zinc-400">{item.hint}</div>
                      </div>
                      <ArrowUpRight
                        size={15}
                        className="text-zinc-400 group-hover:text-cyan-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact column */}
            <div className="md:col-span-4 space-y-5">
              <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-[0.18em]">
                Get In Touch
              </h3>

              <div className="relative rounded-2xl border border-white/15 bg-zinc-900/75 p-5 overflow-hidden group hover:border-indigo-400/40 transition-colors duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap size={14} className="text-amber-300" />
                    <span className="text-sm font-bold text-white">Let&apos;s collaborate</span>
                  </div>
                  <p className="text-zinc-300 text-xs leading-relaxed mb-4">
                    Open to freelance projects, internships, and full-time engineering roles.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all duration-200 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                    >
                      <Mail size={13} />
                      Send a message
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className={`inline-flex items-center gap-1.5 px-3 py-2 border text-xs font-semibold rounded-xl transition-colors ${
                        copied
                          ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-200'
                          : 'bg-zinc-800 hover:bg-zinc-700 border-white/15 text-zinc-200 hover:text-white'
                      }`}
                    >
                      {copied ? <Check size={13} className="text-emerald-300" /> : <Copy size={13} />}
                      {copied ? 'Copied!' : 'Copy email'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={s.label}
                    title={s.label}
                    className={`w-10 h-10 inline-flex items-center justify-center rounded-xl bg-zinc-900/80 border border-white/15 text-zinc-300 transition-all duration-200 hover:scale-105 ${s.color}`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="relative pt-6">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700/60 to-transparent" />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-zinc-400 text-xs font-mono">
                © {new Date().getFullYear()} Sabarees Rajendran — All rights reserved.
              </p>

              <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
                <span>Crafted with</span>
                <Heart size={11} className="text-red-500 animate-pulse" fill="currentColor" />
                <span>&amp;</span>
                <Code2 size={11} className="text-cyan-300" />
                <span>in Tamil Nadu, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
