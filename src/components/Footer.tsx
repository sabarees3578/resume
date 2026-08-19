import React, { useState, useEffect } from 'react';
import {
  Github, Linkedin, Mail, Twitter,
  MapPin, Clock, Cpu,
  Heart, Zap, Code2
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const LiveClock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="font-mono text-xs text-zinc-400">
      {time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
    </span>
  );
};

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
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
      href: 'mailto:sabareesgodkiller@gmail.com',
      label: 'Email',
      color: 'hover:bg-purple-600/30 hover:border-purple-500 hover:text-purple-400',
    },
    {
      icon: <Twitter size={18} />,
      href: 'https://twitter.com',
      label: 'Twitter',
      color: 'hover:bg-sky-600/30 hover:border-sky-500 hover:text-sky-400',
    },
  ];

  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* Top gradient separator */}
      <div className="relative h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent blur-sm" />
      </div>

      {/* Background */}
      <div className="relative bg-zinc-950">
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Corner glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-blue-600/8 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
          {/* ── Main top section ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">

            {/* Brand column */}
            <div className="space-y-5">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Cpu size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-white leading-none">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Sabarees</span>{' '}
                    <span className="text-white">Rajendran</span>
                  </div>
                  <div className="text-[11px] text-zinc-500 font-mono mt-0.5 uppercase tracking-widest">
                    Multi-Discipline Engineer
                  </div>
                </div>
              </div>

              <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
                Building intelligent hardware-software ecosystems — from embedded firmware to
                full-stack web apps and robotic control systems.
              </p>

              {/* Location & time */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-zinc-500 text-xs">
                  <MapPin size={13} className="text-blue-500 flex-shrink-0" />
                  <span>Tamil Nadu, India</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-500 text-xs">
                  <Clock size={13} className="text-blue-500 flex-shrink-0" />
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


            {/* Contact column */}
            <div className="space-y-5">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-[0.18em]">
                Get In Touch
              </h3>

              {/* CTA card */}
              <div className="relative rounded-2xl border border-zinc-700/60 bg-zinc-900/60 p-5 overflow-hidden group hover:border-blue-500/40 transition-colors duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap size={14} className="text-yellow-400" />
                    <span className="text-sm font-bold text-white">Let's collaborate</span>
                  </div>
                  <p className="text-zinc-500 text-xs leading-relaxed mb-4">
                    Open to freelance projects, internships, and full-time engineering roles.
                  </p>
                  <a
                    href="mailto:sabareesgodkiller@gmail.com"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all duration-200 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                  >
                    <Mail size={13} />
                    Send a message
                  </a>
                </div>
              </div>

              {/* Social links */}
              <div className="flex gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.label}
                    className={`p-2.5 rounded-xl bg-zinc-800/70 border border-zinc-700/60 text-zinc-500 transition-all duration-200 hover:scale-110 ${s.color}`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="relative pt-6">
            {/* Thin separator */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700/60 to-transparent" />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-zinc-600 text-xs font-mono">
                © {new Date().getFullYear()} Sabarees Rajendran — All rights reserved.
              </p>

              <div className="flex items-center gap-1.5 text-zinc-600 text-xs">
                <span>Crafted with</span>
                <Heart size={11} className="text-red-500 animate-pulse" fill="currentColor" />
                <span>&</span>
                <Code2 size={11} className="text-blue-400" />
                <span>in Tamil Nadu, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
