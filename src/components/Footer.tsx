import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 border-t-2 border-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-white font-bold mb-4 md:mb-0">
            <span className="text-blue-500">Sabarees</span> Rajendran
          </div>

          <div className="flex space-x-4">
            <a
              href="https://github.com/sabarees3578"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 p-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
            >
              <Github className="text-black" size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-500 p-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
            >
              <Linkedin className="text-black" size={20} />
            </a>
            <a
              href="mailto:contact@example.com"
              className="bg-white p-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
            >
              <Mail className="text-black" size={20} />
            </a>
          </div>
        </div>

        <div className="text-center mt-6 text-zinc-400 text-sm">
          © 2024 Sabarees Rajendran. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
