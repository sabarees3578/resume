import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = ['Home', 'Projects', 'Skills', 'Resume'];

  return (
    <header className="bg-zinc-950 border-b-2 border-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div
            className="text-2xl font-bold text-blue-500 cursor-pointer"
            onClick={() => onNavigate('Home')}
          >
            SR
          </div>

          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => onNavigate(item)}
                className={`px-4 py-2 font-bold border-2 border-black transition-all duration-200 ${
                  currentPage === item
                    ? 'bg-blue-500 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-zinc-900 text-white hover:bg-zinc-800'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  onNavigate(item);
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2 font-bold border-2 border-black ${
                  currentPage === item
                    ? 'bg-blue-500 text-black'
                    : 'bg-zinc-900 text-white'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};
