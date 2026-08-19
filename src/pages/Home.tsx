import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../components/Button';
import { ThreeDHeroVisual } from '../components/ThreeDHeroVisual';
import {
  Code, Cpu, Smartphone, Bot, Sparkles,
  Github, Linkedin, Mail, ArrowRight, Zap,
  CircuitBoard, Wifi, Server
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

// Floating particle background
const ParticleField: React.FC = () => {
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    left: Math.random() * 100,
    duration: Math.random() * 18 + 10,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.4 + 0.1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-blue-400"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: '-10px',
            opacity: p.opacity,
            animation: `particleMove ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
      {/* Ambient glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
};

// Animated stat counter
const StatCounter: React.FC<{ value: number; suffix: string; label: string }> = ({ value, suffix, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = value / 40;
        const timer = setInterval(() => {
          start += step;
          if (start >= value) { setCount(value); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 40);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
        {count}{suffix}
      </div>
      <div className="text-xs text-zinc-500 mt-1 font-medium uppercase tracking-widest">{label}</div>
    </div>
  );
};

// Domain card
const DomainCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  desc: string;
  glowColor: string;
  borderColor: string;
  iconBg: string;
  delay: string;
}> = ({ icon, title, desc, glowColor, borderColor, iconBg, delay }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative group rounded-2xl border p-6 transition-all duration-500 cursor-pointer bg-zinc-900/60 backdrop-blur-sm animate-fade-up ${borderColor}`}
      style={{
        animationDelay: delay,
        transform: hovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: hovered ? glowColor : '0 0 0 rgba(0,0,0,0)',
      }}
    >
      {/* Hover overlay */}
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${iconBg} pointer-events-none`} style={{ opacity: hovered ? 0.06 : 0 }} />
      
      <div className={`inline-flex p-3 rounded-xl mb-4 ${iconBg} ring-1 ring-white/10`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>

      <div className={`absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
        <ArrowRight size={18} className="text-zinc-400" />
      </div>
    </div>
  );
};

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const roles = [
    'IoT & Embedded Engineer',
    'Full-Stack Developer',
    'Robotics & Automation Specialist',
    'Hardware & PCB Designer',
    'Android App Developer',
    '3D Modeling & Prototyping Specialist',
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const roleTimer = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    const cursorTimer = setInterval(() => setShowCursor((v) => !v), 600);
    return () => { clearInterval(roleTimer); clearInterval(cursorTimer); };
  }, []);

  const quickLinks = [
    { icon: <Github size={18} />, href: 'https://github.com/sabarees3578', label: 'GitHub' },
    { icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/sabarees-rajendran', label: 'LinkedIn' },
    { icon: <Mail size={18} />, href: 'mailto:sabareesgodkiller@gmail.com', label: 'Email' },
  ];

  const domains = [
    {
      icon: <Wifi size={28} className="text-blue-400" />,
      title: 'IoT & Embedded Systems',
      desc: 'ESP32, Arduino & Raspberry Pi firmware. MQTT, Bluetooth, LoRa & sensor integration.',
      glowColor: '0 8px 40px rgba(59,130,246,0.25)',
      borderColor: 'border-blue-500/20 hover:border-blue-500/50',
      iconBg: 'from-blue-600/30 to-blue-900/20 bg-blue-900/30',
      delay: '0.1s',
    },
    {
      icon: <Code size={28} className="text-purple-400" />,
      title: 'Full-Stack Web Dev',
      desc: 'React, Node.js, WebSockets & REST APIs. Real-time dashboards & modern web applications.',
      glowColor: '0 8px 40px rgba(168,85,247,0.25)',
      borderColor: 'border-purple-500/20 hover:border-purple-500/50',
      iconBg: 'from-purple-600/30 to-purple-900/20 bg-purple-900/30',
      delay: '0.2s',
    },
    {
      icon: <Bot size={28} className="text-emerald-400" />,
      title: 'Robotics & CAD',
      desc: 'Webots, RobotDK & Roboguide simulation. PCB design, 3D modeling & prototyping.',
      glowColor: '0 8px 40px rgba(52,211,153,0.25)',
      borderColor: 'border-emerald-500/20 hover:border-emerald-500/50',
      iconBg: 'from-emerald-600/30 to-emerald-900/20 bg-emerald-900/30',
      delay: '0.3s',
    },
    {
      icon: <Smartphone size={28} className="text-orange-400" />,
      title: 'Mobile & Android',
      desc: 'Native Android & React Native apps. Hardware interface apps with Bluetooth & Wi-Fi control.',
      glowColor: '0 8px 40px rgba(251,146,60,0.25)',
      borderColor: 'border-orange-500/20 hover:border-orange-500/50',
      iconBg: 'from-orange-600/30 to-orange-900/20 bg-orange-900/30',
      delay: '0.4s',
    },
  ];

  return (
    <div className="relative min-h-screen bg-zinc-950 overflow-x-hidden">
      <ParticleField />

      {/* Grid line background */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.035]"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── HERO SECTION ── */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-20 md:pt-44">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text content */}
          <div className="space-y-7">
            {/* Badge */}
            <div className="animate-fade-up group relative inline-flex items-center gap-2.5 px-4 py-2 bg-zinc-900/60 border border-blue-500/30 hover:border-blue-400/50 rounded-full text-sm font-medium text-zinc-300 transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] backdrop-blur-md cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              <span className="group-hover:text-white transition-colors">Available for hire <span className="text-blue-500/50 mx-1">•</span> Open to opportunities</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/0 via-blue-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>

            {/* Name */}
            <h1 className="animate-fade-up-delay-1 text-5xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-tight">
              Sabarees<br />
              <span
                className="text-transparent bg-clip-text animate-gradient-text"
                style={{
                  backgroundImage: 'linear-gradient(270deg, #a78bfa, #60a5fa, #818cf8, #a78bfa)',
                  backgroundSize: '200% 200%',
                }}
              >
                Rajendran
              </span>
            </h1>

            {/* Animated role typewriter */}
            <div className="animate-fade-up-delay-2 flex items-center gap-1 text-xl md:text-2xl font-bold text-zinc-300 min-h-[36px]">
              <span className="text-blue-400">{roles[currentRoleIndex]}</span>
              <span
                className="w-0.5 h-7 bg-blue-400 ml-1 inline-block"
                style={{ opacity: showCursor ? 1 : 0, transition: 'opacity 0.1s' }}
              />
            </div>

            {/* Bio */}
            <p className="animate-fade-up-delay-3 text-zinc-400 text-lg leading-relaxed max-w-xl">
              Engineering <span className="text-blue-400 font-semibold">intelligent hardware-software ecosystems</span>.
              I build everything from IoT firmware and robotic control systems to real-time web dashboards and Android apps.
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-up-delay-4 flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onNavigate('Projects')}
                className="group flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] hover:scale-105 active:scale-95"
              >
                View Projects
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => onNavigate('Resume')}
                className="flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-500 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Download Resume
              </button>
            </div>

            {/* Social quick links */}
            <div className="animate-fade-up-delay-5 flex items-center gap-4 pt-1">
              <span className="text-zinc-600 text-sm">Find me on</span>
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.label}
                  className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-white transition-all duration-200 hover:scale-110"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right: 3D Visual */}
          <div className="flex justify-center items-center animate-fade-up-delay-2">
            <ThreeDHeroVisual />
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800/60 rounded-2xl overflow-hidden border border-zinc-800">
          {[
            { value: 15, suffix: '+', label: 'Projects Built' },
            { value: 6, suffix: '+', label: 'Tech Domains' },
            { value: 3, suffix: '+', label: 'Years Learning' },
            { value: 30, suffix: '+', label: 'Tools & Stacks' },
          ].map((stat) => (
            <div key={stat.label} className="bg-zinc-950/80 backdrop-blur-sm py-8 px-4 hover:bg-zinc-900/80 transition-colors duration-300">
              <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
            </div>
          ))}
        </div>
      </section>

      {/* ── TECH STACK SCROLLING TICKER ── */}
      <section className="relative z-10 mb-20 overflow-hidden">
        <div className="flex gap-6 animate-none" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
          <div
            className="flex gap-6 shrink-0"
            style={{ animation: 'scroll 25s linear infinite' }}
          >
            {['Arduino', 'ESP32', 'React', 'Node.js', 'Python', 'MQTT', 'WebSockets', 'Raspberry Pi', 'Android Studio', 'PCB Design', 'Webots', 'Docker', 'MongoDB', 'TypeScript', 'LoRa', 'Firebase'].map((tech) => (
              <span
                key={tech}
                className="flex-shrink-0 px-5 py-2 bg-zinc-900 border border-zinc-700/60 rounded-full text-zinc-400 text-sm font-medium hover:border-blue-500/50 hover:text-blue-400 transition-colors duration-200 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
          <div
            className="flex gap-6 shrink-0"
            aria-hidden="true"
            style={{ animation: 'scroll 25s linear infinite' }}
          >
            {['Arduino', 'ESP32', 'React', 'Node.js', 'Python', 'MQTT', 'WebSockets', 'Raspberry Pi', 'Android Studio', 'PCB Design', 'Webots', 'Docker', 'MongoDB', 'TypeScript', 'LoRa', 'Firebase'].map((tech) => (
              <span
                key={tech + '_dup'}
                className="flex-shrink-0 px-5 py-2 bg-zinc-900 border border-zinc-700/60 rounded-full text-zinc-400 text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOMAIN CARDS ── */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-800 border border-zinc-700 rounded-full text-zinc-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <CircuitBoard size={12} />
            Areas of Expertise
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">What I Build</h2>
          <p className="text-zinc-500 mt-3 max-w-xl mx-auto">Cross-disciplinary engineering from the silicon layer to the cloud — hardware meets software.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {domains.map((d) => (
            <DomainCard key={d.title} {...d} />
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative rounded-3xl border border-zinc-700/60 bg-zinc-900/60 backdrop-blur-md p-12 text-center overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 pointer-events-none" />
          <Server size={40} className="text-blue-500 mx-auto mb-5" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Extraordinary</span>
          </h2>
          <p className="text-zinc-400 text-lg mb-8 max-w-xl mx-auto">
            Whether it's a smart IoT product, a robotics system, or a full-stack web application — I'm ready to engineer it with you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => onNavigate('Projects')}
              className="group flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-105"
            >
              Explore My Work
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => onNavigate('Skills')}
              className="px-7 py-3.5 bg-transparent border border-zinc-600 hover:border-zinc-400 text-zinc-300 hover:text-white font-bold rounded-xl transition-all duration-300 hover:scale-105"
            >
              View Skills
            </button>
          </div>
        </div>
      </section>

      {/* Ticker scroll keyframe via inline style */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};
