import React from 'react';
import { Github, Linkedin, Mail, Home, FolderKanban, Cpu, FileText } from 'lucide-react';
import GooeyNav, { type GooeyNavItem } from './GooeyNav';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const NAV_ITEMS: GooeyNavItem[] = [
  { label: 'Home', href: '#', icon: <Home size={15} className="hidden sm:inline-block" /> },
  { label: 'Projects', href: '#', icon: <FolderKanban size={15} className="hidden sm:inline-block" /> },
  { label: 'Skills', href: '#', icon: <Cpu size={15} className="hidden sm:inline-block" /> },
  { label: 'Resume', href: '#', icon: <FileText size={15} className="hidden sm:inline-block" /> },
];

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const activeIndex = Math.max(
    0,
    NAV_ITEMS.findIndex((item) => item.label === currentPage)
  );

  return (
    <header className="fixed top-0 inset-x-0 z-50 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center lg:grid lg:grid-cols-[1fr_auto_1fr] gap-4">
          <div className="hidden lg:block" aria-hidden="true" />

          {/* Center GooeyNav */}
          <div className="flex justify-center max-w-full pointer-events-auto">
            <GooeyNav
              items={NAV_ITEMS}
              initialActiveIndex={0}
              activeIndex={activeIndex}
              theme="dark"
              size="lg"
              color="#6366f1"
              activeTextColor="#ffffff"
              colors={['#3b82f6', '#8b5cf6', '#f472b6', '#60a5fa']}
              frame
              particleCount={18}
              spread={60}
              animationTime={600}
              timeVariance={300}
              gooeyness={0.55}
              wobble={0.5}
              hoverEffect
              style={
                {
                  '--gn-frame': 'rgba(15, 18, 42, 0.74)',
                  '--gn-frame-edge': 'rgba(129, 140, 248, 0.28)',
                  '--gn-frame-highlight': 'rgba(196, 181, 253, 0.16)',
                  '--gn-frame-shadow':
                    '0 22px 48px -16px rgba(15, 23, 42, 0.9), 0 0 32px -6px rgba(99, 102, 241, 0.35)',
                  '--gn-x': '24px',
                  '--gn-y': '12px',
                  '--gn-gap': '8px',
                } as React.CSSProperties
              }
              onChange={(_index, item) => {
                onNavigate(item.label);
              }}
            />
          </div>

          {/* Right quick links (desktop) */}
          <div className="hidden lg:flex items-center justify-end gap-2 pointer-events-auto">
            <a
              href="https://github.com/sabarees3578"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub"
              className="p-2 rounded-full bg-zinc-900/75 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white transition-all backdrop-blur-md"
            >
              <Github size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/sabarees-rajendran"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className="p-2 rounded-full bg-zinc-900/75 hover:bg-zinc-800 border border-zinc-800 hover:border-blue-500/50 text-zinc-400 hover:text-blue-400 transition-all backdrop-blur-md"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="mailto:sabareesgodkiller@gmail.com"
              aria-label="Email"
              title="Email Sabarees"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow-[0_0_18px_rgba(37,99,235,0.3)] hover:shadow-[0_0_24px_rgba(37,99,235,0.5)]"
            >
              <Mail size={14} />
              <span>Contact</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
