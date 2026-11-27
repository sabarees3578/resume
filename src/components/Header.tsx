import React from 'react';
import { Mail, Home, FolderKanban, Cpu, FileText } from 'lucide-react';
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
        <div className="flex items-center justify-center md:grid md:grid-cols-[1fr_auto_1fr] gap-3 sm:gap-4">
          <div className="hidden md:block" aria-hidden="true" />

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
              colors={['#60a5fa', '#a78bfa', '#f472b6', '#93c5fd']}
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
                  '--gn-frame': 'rgba(255, 255, 255, 0.14)',
                  '--gn-frame-edge': 'rgba(255, 255, 255, 0.28)',
                  '--gn-frame-highlight': 'rgba(255, 255, 255, 0.24)',
                  '--gn-frame-shadow':
                    '0 12px 32px -10px rgba(15, 23, 42, 0.4), 0 0 24px -6px rgba(99, 102, 241, 0.25)',
                  '--gn-x': 'clamp(11px, 2.6vw, 22px)',
                  '--gn-y': 'clamp(8px, 1.4vw, 11px)',
                  '--gn-gap': 'clamp(2px, 0.9vw, 8px)',
                  '--gn-font': 'clamp(13px, 2.2vw, 15px)',
                } as React.CSSProperties
              }
              onChange={(_index, item) => {
                onNavigate(item.label);
              }}
            />
          </div>

          {/* Right primary Contact CTA */}
          <div className="hidden md:flex items-center justify-end pointer-events-auto">
            <a
              href="mailto:sabareesgodkiller@gmail.com"
              aria-label="Contact Sabarees via Email"
              title="Email Sabarees"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-md text-white text-xs sm:text-sm font-semibold transition-all shadow-[0_8px_24px_rgba(15,23,42,0.25)] hover:shadow-[0_10px_28px_rgba(99,102,241,0.35)]"
            >
              <Mail size={15} />
              <span>Contact</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
