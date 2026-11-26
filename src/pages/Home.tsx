import React, { useState, useEffect, useRef, useMemo } from 'react';
import Lanyard from '../components/Lanyard';
import SplitText from '../components/SplitText';
import RotatingText from '../components/RotatingText';
import { useCardBackImage } from '../lib/cardBackImage';
import type { ProjectCategory } from './Projects';
import {
  Code, Smartphone, Bot, Github, Linkedin, Mail,
  ArrowRight, CircuitBoard, Wifi, Server, Briefcase,
  Copy, Check, Layers, ArrowUpRight, FileText
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string, options?: { category?: ProjectCategory }) => void;
}

const ROLES = [
  'IoT & Embedded Engineer',
  'Full-Stack Developer',
  'Robotics & Automation Specialist',
  'Hardware & PCB Designer',
  'Android App Developer',
  '3D Modeling & Prototyping Specialist',
];

const TECH_STACK = [
  'Arduino',
  'ESP32',
  'React',
  'Node.js',
  'Python',
  'MQTT',
  'WebSockets',
  'Raspberry Pi',
  'LoRaWAN',
  'PCB Design',
  'Webots',
  'Android Studio',
  'Docker',
  'MongoDB',
  'TypeScript',
  'Firebase',
];

const CONTACT_EMAIL = 'sabareesgodkiller@gmail.com';

// Deterministic memoized floating particle background
const ParticleField: React.FC = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        size: (i % 3) + 1.5,
        left: ((i * 37 + 13) % 96) + 2,
        duration: 14 + (i % 7) * 2.5,
        delay: (i % 6) * 1.8,
        opacity: 0.15 + (i % 4) * 0.08,
      })),
    []
  );

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
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '1s' }}
      />
    </div>
  );
};

// Animated stat counter
const StatCounter: React.FC<{ value: number; suffix: string; label: string }> = ({ value, suffix, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = Math.max(1, value / 28);
          const timer = setInterval(() => {
            start += step;
            if (start >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 35);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
        {count}
        {suffix}
      </div>
      <div className="text-xs text-zinc-400 mt-1.5 font-medium uppercase tracking-widest">{label}</div>
    </div>
  );
};

// Interactive domain card that navigates straight to filtered projects
const DomainCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  desc: string;
  glowColor: string;
  borderColor: string;
  iconBg: string;
  delay: string;
  onClick: () => void;
}> = ({ icon, title, desc, glowColor, borderColor, iconBg, delay, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative group text-left rounded-2xl border p-6 transition-all duration-500 cursor-pointer bg-zinc-900/60 backdrop-blur-sm animate-fade-up ${borderColor}`}
      style={{
        animationDelay: delay,
        transform: hovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: hovered ? glowColor : '0 0 0 rgba(0,0,0,0)',
      }}
    >
      <div
        className={`absolute inset-0 rounded-2xl transition-opacity duration-500 bg-gradient-to-br ${iconBg} pointer-events-none`}
        style={{ opacity: hovered ? 0.08 : 0 }}
      />

      <div className={`inline-flex p-3 rounded-xl mb-4 ${iconBg} ring-1 ring-white/10`}>{icon}</div>
      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed pr-4">{desc}</p>

      <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 group-hover:text-white transition-colors">
        <span>Explore projects</span>
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
      </div>
    </button>
  );
};

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const cardBackImage = useCardBackImage();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  };

  const quickLinks = [
    { icon: <Github size={18} />, href: 'https://github.com/sabarees3578', label: 'GitHub' },
    { icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/sabarees-rajendran', label: 'LinkedIn' },
    { icon: <Mail size={18} />, href: `mailto:${CONTACT_EMAIL}`, label: 'Email' },
  ];

  const domains: Array<{
    icon: React.ReactNode;
    title: string;
    desc: string;
    glowColor: string;
    borderColor: string;
    iconBg: string;
    delay: string;
    category: ProjectCategory;
  }> = [
    {
      icon: <Wifi size={28} className="text-blue-400" />,
      title: 'IoT & Embedded Systems',
      desc: 'ESP32, Arduino & Raspberry Pi firmware. MQTT, Bluetooth, LoRaWAN & sensor integration.',
      glowColor: '0 8px 40px rgba(59,130,246,0.25)',
      borderColor: 'border-blue-500/20 hover:border-blue-500/50',
      iconBg: 'from-blue-600/30 to-blue-900/20 bg-blue-900/30',
      delay: '0.1s',
      category: 'IoT',
    },
    {
      icon: <Code size={28} className="text-purple-400" />,
      title: 'Full-Stack Web Dev',
      desc: 'React, Node.js, WebSockets & REST APIs. Real-time dashboards & developer tooling.',
      glowColor: '0 8px 40px rgba(168,85,247,0.25)',
      borderColor: 'border-purple-500/20 hover:border-purple-500/50',
      iconBg: 'from-purple-600/30 to-purple-900/20 bg-purple-900/30',
      delay: '0.2s',
      category: 'Web',
    },
    {
      icon: <Bot size={28} className="text-emerald-400" />,
      title: 'Robotics & CAD',
      desc: 'Webots, RobotDK & Roboguide simulation. PCB design, 3D modeling & prototyping.',
      glowColor: '0 8px 40px rgba(52,211,153,0.25)',
      borderColor: 'border-emerald-500/20 hover:border-emerald-500/50',
      iconBg: 'from-emerald-600/30 to-emerald-900/20 bg-emerald-900/30',
      delay: '0.3s',
      category: 'Robotics',
    },
    {
      icon: <Smartphone size={28} className="text-orange-400" />,
      title: 'Mobile & Android',
      desc: 'Native Android & React Native apps. Hardware interface apps with Bluetooth & Wi-Fi control.',
      glowColor: '0 8px 40px rgba(251,146,60,0.25)',
      borderColor: 'border-orange-500/20 hover:border-orange-500/50',
      iconBg: 'from-orange-600/30 to-orange-900/20 bg-orange-900/30',
      delay: '0.4s',
      category: 'Mobile',
    },
  ];

  const featuredHighlights = [
    {
      tag: 'Web & EDA Platform',
      title: 'Universal Electronics Development Studio',
      summary:
        'Unified studio bringing together PCB layout, circuit simulation, embedded IDE, and 3D hardware modeling in one workflow.',
      stack: ['React', 'Node.js', 'Electron', 'WebGL'],
      category: 'Web' as ProjectCategory,
      accent: 'border-purple-500/30 hover:border-purple-400/60',
      badge: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    },
    {
      tag: 'Autonomous Robotics',
      title: 'Smart Shrub Trimming Robot',
      summary:
        'Computer-vision-guided autonomous landscaping platform combining Raspberry Pi OpenCV perception with precision motor control.',
      stack: ['Raspberry Pi', 'Python', 'OpenCV'],
      category: 'Robotics' as ProjectCategory,
      accent: 'border-emerald-500/30 hover:border-emerald-400/60',
      badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    },
    {
      tag: 'Embedded Wireless HID',
      title: 'ESP32 Wi-Fi / Bluetooth Air Mouse',
      summary:
        'Custom 9-axis IMU air mouse powered by ESP32 and MPU9250 with low-latency wireless cursor control over BLE & Wi-Fi.',
      stack: ['ESP32', 'C++', 'MPU9250', 'Bluetooth'],
      category: 'IoT' as ProjectCategory,
      accent: 'border-blue-500/30 hover:border-blue-400/60',
      badge: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    },
  ];

  return (
    <div className="relative min-h-screen bg-transparent overflow-x-hidden">
      <ParticleField />

      {/* Grid line background */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── HERO SECTION ── */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Left: Text content */}
          <div className="space-y-6 pt-32 md:pt-40">
            <h1 className="text-[2.1rem] sm:text-5xl lg:text-[2.75rem] xl:text-[3.45rem] font-extrabold text-white leading-[1.06] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)]">
              <span className="inline-flex flex-wrap sm:flex-nowrap items-baseline gap-x-3 sm:whitespace-nowrap">
                <SplitText
                  text="Sabarees"
                  tag="span"
                  textAlign="left"
                  effect="rise"
                  hoverEffect="lift"
                  trigger="load"
                  delay={40}
                  duration={0.8}
                  className="text-white"
                />
                <span
                  className="text-transparent bg-clip-text animate-gradient-text"
                  style={{
                    backgroundImage: 'linear-gradient(270deg, #ffffff, #bae6fd, #fbcfe8, #ffffff)',
                    backgroundSize: '200% 200%',
                  }}
                >
                  Rajendran
                </span>
              </span>
            </h1>

            {/* Smooth rotating role pill */}
            <div className="animate-fade-up-delay-2 flex items-center min-h-[40px] overflow-hidden">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-indigo-950/60 border border-indigo-400/30 backdrop-blur-md shadow-[0_8px_30px_rgba(15,23,42,0.5)]">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300" />
                </span>
                <RotatingText
                  texts={ROLES}
                  effect="blur"
                  splitBy="words"
                  staggerDuration={0.02}
                  rotationInterval={2600}
                  transition={{ duration: 0.25 }}
                  pauseOnHover
                  mainClassName="text-base sm:text-lg font-semibold text-cyan-100"
                />
              </div>
            </div>

            <p className="animate-fade-up-delay-3 text-zinc-200 text-base sm:text-lg leading-relaxed max-w-xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
              Engineering{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-sky-200 to-pink-200 font-semibold">
                intelligent hardware-software ecosystems
              </span>
              . I build everything from IoT firmware and LoRaWAN deployments to robotic control systems,
              real-time web dashboards, and Android apps.
            </p>

            {/* Quick focus chips */}
            <div className="animate-fade-up-delay-3 flex flex-wrap gap-2">
              {['ESP32 & LoRaWAN', 'React & Node.js', 'Robotics & CAD'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-indigo-950/45 border border-indigo-300/20 text-xs font-mono text-indigo-100/90 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="animate-fade-up-delay-4 flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => onNavigate('Projects')}
                className="group flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 border border-indigo-400/35 text-white font-bold rounded-xl transition-all duration-300 shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:shadow-[0_0_32px_rgba(129,140,248,0.6)] hover:scale-[1.02] active:scale-95"
              >
                View Projects
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('Resume')}
                className="flex items-center gap-2 px-6 py-3.5 bg-indigo-950/55 hover:bg-indigo-900/65 border border-indigo-300/20 hover:border-indigo-300/45 text-white font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 backdrop-blur-md"
              >
                <FileText size={17} className="text-indigo-200" />
                View &amp; Download Resume
              </button>
            </div>

            {/* Social quick links + copy email */}
            <div className="animate-fade-up-delay-5 flex flex-wrap items-center gap-2.5 pt-2 border-t border-white/10 max-w-xl">
              <span className="text-zinc-300 text-xs font-mono uppercase tracking-wider mr-1">
                Connect
              </span>
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={link.label}
                  title={link.label}
                  className="inline-flex p-2.5 rounded-xl bg-indigo-950/55 hover:bg-indigo-900/70 border border-indigo-300/20 hover:border-indigo-300/45 text-zinc-200 hover:text-white transition-all duration-200 hover:scale-105 backdrop-blur-md"
                >
                  {link.icon}
                </a>
              ))}
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-indigo-950/55 hover:bg-indigo-900/70 border border-indigo-300/20 hover:border-indigo-300/45 text-xs font-mono text-zinc-200 hover:text-white transition-all backdrop-blur-md"
              >
                {copiedEmail ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                {copiedEmail ? 'Email copied!' : CONTACT_EMAIL}
              </button>
            </div>
          </div>

          {/* Right: Interactive 3D Lanyard anchored to top */}
          <div className="relative flex justify-center items-start">
            <div className="lg:hidden absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-gradient-to-r from-transparent via-zinc-500/70 to-transparent z-10" />
            <div className="w-full h-[580px] lg:h-[720px]">
              <Lanyard
                frontImage="/card-front.jpg"
                backImage={cardBackImage}
                strapImage="/band.png"
                imageFit="cover"
                cardColor="#ffffff"
                orientation="portrait"
                finish="glossy"
                cornerRadius={0.3}
                size={0.56}
                anchor="center"
                strapLength={0.55}
                strapColor="#111111"
                strapWidth={0.65}
                metal="silver"
                gravity={1}
                damping={0.5}
                elasticity={0.5}
                breeze={0.5}
                interactive
                intro
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800/60 rounded-2xl overflow-hidden border border-zinc-800">
          {[
            { value: 15, suffix: '+', label: 'Projects Built' },
            { value: 6, suffix: '+', label: 'Tech Domains' },
            { value: 3, suffix: '+', label: 'Years Experience' },
            { value: 30, suffix: '+', label: 'Tools & Stacks' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-zinc-950/85 backdrop-blur-sm py-8 px-4 hover:bg-zinc-900/80 transition-colors duration-300"
            >
              <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
            </div>
          ))}
        </div>
      </section>

      {/* ── TECH STACK SEAMLESS TICKER ── */}
      <section className="relative z-10 mb-20 overflow-hidden">
        <div
          className="overflow-hidden"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
        >
          <div className="animate-ticker">
            {[...TECH_STACK, ...TECH_STACK].map((tech, idx) => (
              <div key={`${tech}-${idx}`} className="pr-5 flex-shrink-0">
                <span className="inline-block px-5 py-2 bg-zinc-900/90 border border-zinc-800 rounded-full text-zinc-400 text-sm font-medium hover:border-blue-500/50 hover:text-blue-400 transition-colors duration-200 cursor-default">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOMAIN CARDS ── */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <CircuitBoard size={12} className="text-blue-400" />
            Areas of Expertise
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">What I Build</h2>
          <p className="text-zinc-400 mt-3 max-w-xl mx-auto">
            Cross-disciplinary engineering from the silicon layer to the cloud — click any domain to explore related projects.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {domains.map((d) => (
            <DomainCard
              key={d.title}
              icon={d.icon}
              title={d.title}
              desc={d.desc}
              glowColor={d.glowColor}
              borderColor={d.borderColor}
              iconBg={d.iconBg}
              delay={d.delay}
              onClick={() => onNavigate('Projects', { category: d.category })}
            />
          ))}
        </div>
      </section>

      {/* ── FEATURED WORK & EXPERIENCE SPOTLIGHT ── */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-semibold uppercase tracking-widest mb-3">
              <Layers size={12} />
              Spotlight
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Featured Work &amp; Current Focus</h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('Projects')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors self-start md:self-auto"
          >
            View all projects
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Featured 3 Projects */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {featuredHighlights.map((item) => (
            <div
              key={item.title}
              onClick={() => onNavigate('Projects', { category: item.category })}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onNavigate('Projects', { category: item.category });
                }
              }}
              className={`group rounded-2xl border bg-zinc-900/50 hover:bg-zinc-900/80 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between ${item.accent}`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${item.badge}`}>
                    {item.tag}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-5">{item.summary}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {item.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Current Experience Snapshot */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 flex items-start gap-4 hover:border-blue-500/40 transition-colors">
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0">
              <Briefcase size={20} />
            </div>
            <div>
              <div className="text-xs font-mono text-blue-400 mb-1">Jan 2024 – Present</div>
              <h3 className="text-base font-bold text-white">Founder &amp; Lead Developer — godem.in</h3>
              <p className="text-sm text-zinc-400 mt-1.5 leading-relaxed">
                Building an open-source, AI-integrated IDE and IoT platform designed for hobbyists and makers, spanning system architecture to silicon-to-cloud tooling.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 flex items-start gap-4 hover:border-purple-500/40 transition-colors">
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
              <Wifi size={20} />
            </div>
            <div>
              <div className="text-xs font-mono text-purple-400 mb-1">Mar 2025 – Jul 2026</div>
              <h3 className="text-base font-bold text-white">Technical Engineer — Enthu Technology Solutions</h3>
              <p className="text-sm text-zinc-400 mt-1.5 leading-relaxed">
                Deploying industrial LoRaWAN gateways and end-nodes with ChirpStack network servers, optimizing packet reliability and real-time sensor dashboards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative rounded-3xl border border-zinc-700/60 bg-zinc-900/60 backdrop-blur-md p-10 md:p-12 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 pointer-events-none" />
          <Server size={40} className="text-blue-500 mx-auto mb-5" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Let&apos;s Build Something{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Extraordinary
            </span>
          </h2>
          <p className="text-zinc-400 text-lg mb-8 max-w-xl mx-auto">
            Whether it&apos;s a smart IoT product, a robotics system, or a full-stack web application — I&apos;m ready
            to engineer it with you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              type="button"
              onClick={() => onNavigate('Projects')}
              className="group flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-[1.02]"
            >
              Explore My Work
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('Skills')}
              className="px-7 py-3.5 bg-zinc-950/60 border border-zinc-700 hover:border-zinc-500 text-zinc-200 hover:text-white font-bold rounded-xl transition-all duration-300 hover:scale-[1.02]"
            >
              View Skills
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
