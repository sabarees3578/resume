import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Code, Cpu, Smartphone, Layers } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const roles = ['Arduino', 'IoT', 'Full-Stack', 'Android', '3D Modeler', 'PCB Designer', 'PCB Fabricator'];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Sabarees<br />
              <span className="text-blue-500">Rajendran</span>
            </h1>

            <div className="flex items-center gap-3 text-2xl md:text-3xl font-bold">
              <span className="text-blue-500 transition-all duration-500">
                {roles[currentRoleIndex]}
              </span>
              {currentRoleIndex < 4 && (
                <>
                  <span className="text-purple-500">|</span>
                  <span className="text-white">Developer</span>
                </>
              )}
            </div>

            <p className="text-zinc-400 text-lg leading-relaxed">
              Building innovative solutions across hardware and software. Passionate about IoT,
              embedded systems, and full-stack development.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button variant="primary" onClick={() => onNavigate('Projects')}>
                View Projects
              </Button>
              <Button variant="secondary" onClick={() => onNavigate('Skills')}>
                My Skills
              </Button>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <p className="text-zinc-400 text-2xl italic font-medium">
              " Life is not race, it's a journey "
            </p> 
             
          </div>
               
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card variant="blue">
            <div className="flex flex-col items-center text-center space-y-3">
              <Cpu className="text-black" size={40} />
              <h3 className="text-xl font-bold text-black">Arduino</h3>
              <p className="text-black text-sm">Embedded systems & hardware prototyping</p>
            </div>
          </Card>

          <Card variant="purple">
            <div className="flex flex-col items-center text-center space-y-3">
              <Layers className="text-black" size={40} />
              <h3 className="text-xl font-bold text-black">IoT</h3>
              <p className="text-black text-sm">Connected devices & smart solutions</p>
            </div>
          </Card>

          <Card variant="white">
            <div className="flex flex-col items-center text-center space-y-3">
              <Code className="text-black" size={40} />
              <h3 className="text-xl font-bold text-black">Full-Stack</h3>
              <p className="text-black text-sm">Modern web applications</p>
            </div>
          </Card>

          <Card variant="blue">
            <div className="flex flex-col items-center text-center space-y-3">
              <Smartphone className="text-black" size={40} />
              <h3 className="text-xl font-bold text-black">Android</h3>
              <p className="text-black text-sm">Mobile app development</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
