import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu, ChevronRight } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'Projects', 'Skills', 'Resume'];

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80 shadow-lg shadow-black/50 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate('Home')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow duration-300">
              <Cpu size={20} className="text-white" />
            </div>
            <div className="font-extrabold text-xl tracking-tight hidden sm:block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Sabarees</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-900/50 p-1 rounded-full border border-zinc-800/60 backdrop-blur-sm">
            {navItems.map((item) => {
              const isActive = currentPage === item;
              return (
                <button
                  key={item}
                  onClick={() => onNavigate(item)}
                  className={`relative px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                    isActive
                      ? 'text-white'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-blue-600/20 border border-blue-500/50 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.3)] pointer-events-none" />
                  )}
                  <span className="relative z-10">{item}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action (Hire Me / Contact placeholder) */}
          <div className="hidden md:block">
            <button
               onClick={() => onNavigate('Resume')}
               className="group flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)]"
            >
              Resume
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 p-4 mt-2 bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800 shadow-2xl">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = currentPage === item;
                return (
                  <button
                    key={item}
                    onClick={() => {
                      onNavigate(item);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-xl font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-600/10 border border-blue-500/30 text-blue-400'
                        : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                    }`}
                  >
                    {item}
                    {isActive && <ChevronRight size={16} />}
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
