import React, { useState, useEffect, lazy, Suspense } from 'react';
import RotatingText from '../components/RotatingText';
import { useCardBackImage } from '../lib/cardBackImage';
import type { ProjectCategory } from './Projects';
import {
  Code, Bot, Github, Linkedin, Mail,
  ArrowRight, CircuitBoard, Wifi, Briefcase,
  Copy, Check, Layers, ArrowUpRight, FileText, Server
} from 'lucide-react';

const Lanyard = lazy(() => import('../components/Lanyard'));

interface HomeProps {
  onNavigate: (page: string, options?: { category?: ProjectCategory }) => void;
}

const ROLES = [
  'Hardware-to-Cloud Systems Engineer',
  'Founder @ Godem (godem.in)',
  'Creator of iotmaker.cloud',
  'Mechatronics & Robotics Builder',
  'Rust, Tauri & Embedded Engineer',
  'IEEE-Published IoT Researcher',
];

const TECH_STACK = [
  'Rust',
  'Tauri',
  'React',
  'TypeScript',
  'ESP32 / C3',
  'STM32 / STM8',
  'KiCad PCB',
  'TMC2209 / CNC',
  'LoRaWAN',
  'ChirpStack',
  'MQTT',
  'TimescaleDB',
  'PostgreSQL',
  'Docker',
  'OpenCV',
  'MediaPipe',
  'Godot C#',
  '.NET 10',
  'Arch / Hyprland',
];

const FOCUS_CHIPS: Array<{ label: string; category: ProjectCategory }> = [
  { label: 'Rust, Tauri & React', category: 'Web' },
  { label: 'ESP32, STM32 & LoRaWAN', category: 'IoT' },
  { label: 'THT CNC & KiCad PCB', category: 'Robotics' },
];

const CONTACT_EMAIL = 'sabareesgodkiller@gmail.com';

// Interactive CSS-driven domain card
const DomainCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  desc: string;
  hoverShadow: string;
  borderColor: string;
  iconBg: string;
  delay: string;
  onClick: () => void;
}> = ({ icon, title, desc, hoverShadow, borderColor, iconBg, delay, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative group text-left rounded-2xl border p-6 transition-all duration-300 cursor-pointer bg-indigo-950/35 hover:bg-indigo-950/50 hover:-translate-y-2 hover:scale-[1.015] shadow-[0_12px_32px_rgba(15,23,42,0.28)] animate-fade-up ${borderColor} ${hoverShadow}`}
    style={{ animationDelay: delay }}
  >
    <div className={`inline-flex p-3 rounded-xl mb-4 ${iconBg} ring-1 ring-white/25`}>{icon}</div>
    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-200 transition-colors">{title}</h3>
    <p className="text-white/90 text-sm leading-relaxed pr-2">{desc}</p>

    <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-200 group-hover:text-white transition-colors">
      <span>Explore projects</span>
      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
    </div>
  </button>
);

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const cardBackImage = useCardBackImage();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)').matches : true
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

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
    {
      icon: <Github size={19} />,
      href: 'https://github.com/sabarees3578',
      label: 'GitHub',
      hover: 'hover:bg-zinc-800 hover:border-white/50 hover:text-white',
    },
    {
      icon: <Linkedin size={19} />,
      href: 'https://www.linkedin.com/in/sabarees-rajendran',
      label: 'LinkedIn',
      hover: 'hover:bg-indigo-500/20 hover:border-indigo-300/60 hover:text-indigo-200',
    },
    {
      icon: <Mail size={19} />,
      href: `mailto:${CONTACT_EMAIL}`,
      label: 'Email',
      hover: 'hover:bg-cyan-500/20 hover:border-cyan-300/60 hover:text-cyan-200',
    },
  ];

  const domains: Array<{
    icon: React.ReactNode;
    title: string;
    desc: string;
    hoverShadow: string;
    borderColor: string;
    iconBg: string;
    delay: string;
    category: ProjectCategory;
  }> = [
    {
      icon: <Code size={28} className="text-purple-400" />,
      title: 'Full-Stack & Desktop',
      desc: 'React, TypeScript, Rust, Tauri, Electron, Node.js, PostgreSQL, TimescaleDB, Python & .NET 10.',
      hoverShadow: 'hover:shadow-[0_12px_36px_rgba(168,85,247,0.28)]',
      borderColor: 'border-purple-400/25 hover:border-purple-400/60',
      iconBg: 'bg-purple-900/40',
      delay: '0.08s',
      category: 'Web',
    },
    {
      icon: <Wifi size={28} className="text-blue-400" />,
      title: 'Embedded, IoT & Hardware',
      desc: 'ESP32/C3, STM32/STM8, Raspberry Pi 4/5, KiCad PCB layout, THT/SMT soldering & CNC kinematics.',
      hoverShadow: 'hover:shadow-[0_12px_36px_rgba(59,130,246,0.28)]',
      borderColor: 'border-blue-400/25 hover:border-blue-400/60',
      iconBg: 'bg-blue-900/40',
      delay: '0.16s',
      category: 'IoT',
    },
    {
      icon: <Server size={28} className="text-cyan-300" />,
      title: 'Protocols & Self-Hosted Infra',
      desc: 'LoRaWAN (ChirpStack, TTN), MQTT, WebSockets, KNX, Docker, Arch/Hyprland, Coolify & CI/CD.',
      hoverShadow: 'hover:shadow-[0_12px_36px_rgba(34,211,238,0.28)]',
      borderColor: 'border-cyan-400/25 hover:border-cyan-400/60',
      iconBg: 'bg-cyan-900/40',
      delay: '0.24s',
      category: 'IoT',
    },
    {
      icon: <Bot size={28} className="text-emerald-400" />,
      title: 'AI, Vision & Interactive',
      desc: 'OpenCV, MediaPipe, Godot Engine (C#), Blender, Monaco Editor & custom IDE/DSL developer tooling.',
      hoverShadow: 'hover:shadow-[0_12px_36px_rgba(52,211,153,0.28)]',
      borderColor: 'border-emerald-400/25 hover:border-emerald-400/60',
      iconBg: 'bg-emerald-900/40',
      delay: '0.32s',
      category: 'Robotics',
    },
  ];

  const featuredHighlights = [
    {
      tag: 'Rust + Tauri IDE',
      title: 'Raw IDE / Godem IDE',
      summary:
        'Desktop developer environment built with Rust and Tauri featuring Monaco Editor, arduino-cli integration, AI workflows, and Docker staging.',
      stack: ['Rust', 'Tauri', 'Monaco Editor', 'Docker'],
      category: 'Web' as ProjectCategory,
      accent: 'border-purple-400/30 hover:border-purple-300/65',
      badge: 'bg-purple-500/20 text-purple-200 border-purple-400/35',
    },
    {
      tag: 'CNC & Hardware',
      title: 'Custom THT Pick-and-Place CNC',
      summary:
        'Custom-built through-hole pick-and-place CNC and motion controller hardware built on SKR Mini E3, TMC2209 drivers, NEMA steppers, and KiCad PCBs.',
      stack: ['SKR Mini E3', 'TMC2209', 'NEMA Steppers', 'KiCad'],
      category: 'Robotics' as ProjectCategory,
      accent: 'border-emerald-400/30 hover:border-emerald-300/65',
      badge: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/35',
    },
    {
      tag: 'IEEE Xplore Research',
      title: 'Shrub Trimming Bot on Roadside Using IoT',
      summary:
        'IEEE-published autonomous roadside vegetation trimming robot combining embedded motor control, computer vision, and IoT telemetry.',
      stack: ['IoT', 'Raspberry Pi', 'OpenCV', 'IEEE Xplore'],
      category: 'Robotics' as ProjectCategory,
      accent: 'border-blue-400/30 hover:border-blue-300/65',
      badge: 'bg-blue-500/20 text-blue-200 border-blue-400/35',
    },
  ];

  return (
    <div className="relative min-h-screen bg-transparent overflow-x-hidden">
      {/* ── HERO SECTION ── */}
      <section className="relative z-10 w-full min-h-[calc(100vh-2rem)] pb-14 md:pb-20">
        {/* Full-site-width 3D Lanyard viewport on desktop (zero side clipping when dragging) */}
        {isDesktop && (
          <div className="absolute inset-0 z-20 pointer-events-none">
            <Suspense fallback={null}>
              <Lanyard
                frontImage="/card-front.jpg"
                backImage={cardBackImage}
                imageFit="cover"
                cardColor="#ffffff"
                orientation="portrait"
                finish="glossy"
                cornerRadius={0.3}
                size={0.56}
                anchor="right"
                strapLength={0.5}
                strapColor="#111111"
                strapWidth={0.65}
                metal="silver"
                gravity={1}
                damping={0.5}
                elasticity={0.5}
                breeze={0.3}
                interactive
                intro
              />
            </Suspense>
          </div>
        )}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            {/* Left: Text content */}
            <div className="space-y-6 pt-28 md:pt-36">
              <h1 className="animate-fade-up text-[2.1rem] sm:text-5xl lg:text-[2.75rem] xl:text-[3.45rem] font-extrabold text-white leading-[1.06] tracking-tight drop-shadow-[0_4px_20px_rgba(15,23,42,0.55)]">
                <span className="inline-flex flex-wrap sm:flex-nowrap items-baseline gap-x-3 sm:whitespace-nowrap">
                  <span className="text-white">Sabarees</span>
                  <span
                    className="text-transparent bg-clip-text animate-gradient-text"
                    style={{
                      backgroundImage: 'linear-gradient(270deg, #fde047, #ffffff, #67e8f9, #fde047)',
                      backgroundSize: '200% 200%',
                    }}
                  >
                    Rajendran
                  </span>
                </span>
              </h1>

              {/* Smooth rotating role pill */}
              <div className="animate-fade-up-delay-1 flex items-center">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 min-h-[38px] max-w-full rounded-full bg-white/15 border border-white/30 backdrop-blur-md shadow-[0_8px_24px_rgba(15,23,42,0.25)]">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-200" />
                  </span>
                  <RotatingText
                    texts={ROLES}
                    effect="blur"
                    splitBy="words"
                    staggerDuration={0}
                    rotationInterval={2800}
                    transition={{ duration: 0.2 }}
                    exit={{ opacity: 0, transition: { duration: 0.12 } }}
                    pauseOnHover
                    mainClassName="text-sm sm:text-base font-semibold text-white tracking-tight"
                    elementLevelClassName="text-white"
                  />
                </div>
              </div>

              <p className="animate-fade-up-delay-2 text-white text-base sm:text-lg leading-relaxed max-w-xl drop-shadow-[0_2px_10px_rgba(15,23,42,0.65)]">
                Independent{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-cyan-200 font-bold">
                  Hardware-to-Cloud Systems Engineer
                </span>{' '}
                &amp; Mechatronics builder (B.E. Mechatronics, IEEE-published IoT researcher). Founder of{' '}
                <span className="font-semibold text-cyan-200">Godem (godem.in)</span> — engineering custom PCBs, THT CNC machinery, embedded firmware, Rust + Tauri IDEs, and self-hosted IoT infrastructure.
              </p>

              {/* Clickable focus chips */}
              <div className="animate-fade-up-delay-3 flex flex-wrap gap-2">
                {FOCUS_CHIPS.map((chip) => (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() => onNavigate('Projects', { category: chip.category })}
                    className="px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 hover:border-amber-200/70 text-xs font-mono text-white hover:text-amber-100 transition-all"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="animate-fade-up-delay-4 flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => onNavigate('Projects')}
                  className="group flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-amber-100 text-indigo-950 font-extrabold rounded-xl transition-all duration-300 shadow-[0_10px_30px_rgba(15,23,42,0.28)] hover:shadow-[0_12px_34px_rgba(255,255,255,0.4)] hover:scale-[1.02] active:scale-95"
                >
                  View Projects
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('Resume')}
                  className="flex items-center gap-2 px-6 py-3.5 bg-white/15 hover:bg-white/25 border border-white/30 hover:border-white/50 text-white font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
                >
                  <FileText size={17} className="text-cyan-200" />
                  View &amp; Download Resume
                </button>
              </div>

              {/* Social quick links + copy email */}
              <div className="animate-fade-up-delay-5 flex flex-wrap items-center gap-3 pt-4 border-t border-white/25 max-w-xl">
                <span className="text-white/95 text-xs font-semibold uppercase tracking-widest mr-0.5 drop-shadow-[0_1px_6px_rgba(15,23,42,0.5)]">
                  Connect:
                </span>
                {quickLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={link.label}
                    title={link.label}
                    className={`w-10 h-10 inline-flex items-center justify-center rounded-xl bg-white/15 border border-white/25 text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(15,23,42,0.3)] ${link.hover}`}
                  >
                    {link.icon}
                  </a>
                ))}
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-live="polite"
                  className={`inline-flex items-center gap-2 min-h-[40px] px-4 py-2 rounded-xl border font-sans text-sm font-medium transition-all duration-200 ${
                    copiedEmail
                      ? 'bg-emerald-500/25 border-emerald-300/70 text-emerald-100 shadow-[0_0_18px_rgba(52,211,153,0.3)]'
                      : 'bg-white/15 hover:bg-white/25 border-white/25 hover:border-white/50 text-white'
                  }`}
                >
                  {copiedEmail ? (
                    <Check size={15} className="text-emerald-200 shrink-0" />
                  ) : (
                    <Copy size={15} className="text-cyan-200 shrink-0" />
                  )}
                  <span>{copiedEmail ? 'Copied!' : CONTACT_EMAIL}</span>
                </button>
              </div>
            </div>

            {/* Right column spacer on desktop / mobile Lanyard */}
            {isDesktop ? (
              <div className="h-[560px] xl:h-[600px]" aria-hidden="true" />
            ) : (
              <div className="relative flex justify-center items-start pt-2">
                <div className="w-full max-w-md h-[430px] sm:h-[490px] relative rounded-3xl border border-white/25 bg-white/10 overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.35)]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-1 rounded-full bg-gradient-to-r from-transparent via-white/60 to-transparent z-10" />
                  <Suspense fallback={null}>
                    <Lanyard
                      frontImage="/card-front.jpg"
                      backImage={cardBackImage}
                      imageFit="cover"
                      cardColor="#ffffff"
                      orientation="portrait"
                      finish="glossy"
                      cornerRadius={0.3}
                      size={0.56}
                      anchor="center"
                      strapLength={0.42}
                      strapColor="#111111"
                      strapWidth={0.65}
                      metal="silver"
                      gravity={1}
                      damping={0.5}
                      elasticity={0.5}
                      breeze={0.3}
                      interactive
                      intro
                    />
                  </Suspense>
                </div>
              </div>
            )}
          </div>
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
                <span className="inline-block px-5 py-2 bg-white/15 border border-white/25 rounded-full text-white text-sm font-medium hover:bg-white/25 hover:border-amber-200/70 transition-colors duration-200 cursor-default">
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/15 border border-white/25 rounded-full text-amber-200 text-xs font-semibold uppercase tracking-widest mb-4">
            <CircuitBoard size={13} className="text-amber-200" />
            Areas of Expertise
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-[0_2px_12px_rgba(15,23,42,0.5)]">
            What I Build
          </h2>
          <p className="text-white/95 mt-3 max-w-xl mx-auto drop-shadow-[0_1px_8px_rgba(15,23,42,0.55)]">
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
              hoverShadow={d.hoverShadow}
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/15 border border-white/25 rounded-full text-cyan-200 text-xs font-semibold uppercase tracking-widest mb-3">
              <Layers size={13} />
              Spotlight
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-[0_2px_12px_rgba(15,23,42,0.5)]">
              Featured Work &amp; Current Focus
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('Projects')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 hover:border-amber-200/60 text-sm font-semibold text-white transition-all self-start md:self-auto"
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
              className={`group rounded-2xl border bg-indigo-950/35 hover:bg-indigo-950/50 p-6 shadow-[0_12px_36px_rgba(15,23,42,0.3)] transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between ${item.accent}`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${item.badge}`}>
                    {item.tag}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-white/75 group-hover:text-amber-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-white/90 leading-relaxed mb-5">{item.summary}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {item.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md bg-white/12 border border-white/20 text-[11px] font-mono text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Independent Engineering & Research Snapshot (clickable to Resume) */}
        <div className="grid md:grid-cols-2 gap-6">
          <button
            type="button"
            onClick={() => onNavigate('Resume')}
            className="group text-left rounded-2xl border border-white/25 bg-indigo-950/35 hover:bg-indigo-950/50 p-6 flex items-start gap-4 hover:border-cyan-300/60 transition-all shadow-[0_12px_36px_rgba(15,23,42,0.3)]"
          >
            <div className="p-3 rounded-xl bg-cyan-500/20 border border-cyan-300/35 text-cyan-200 shrink-0">
              <Briefcase size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-mono text-cyan-200">Jan 2024 – Present</span>
                <ArrowUpRight
                  size={15}
                  className="text-white/75 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-cyan-200 transition-colors">
                Founder &amp; Lead Developer — Godem (godem.in)
              </h3>
              <p className="text-sm text-white/90 mt-1.5 leading-relaxed">
                Architecting Raw IDE / Godem IDE in Rust and Tauri with Monaco Editor, arduino-cli, AI workflows, and Docker staging alongside self-hosted hardware-to-cloud infrastructure.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('Resume')}
            className="group text-left rounded-2xl border border-white/25 bg-indigo-950/35 hover:bg-indigo-950/50 p-6 flex items-start gap-4 hover:border-amber-300/60 transition-all shadow-[0_12px_36px_rgba(15,23,42,0.3)]"
          >
            <div className="p-3 rounded-xl bg-amber-400/20 border border-amber-300/35 text-amber-200 shrink-0">
              <CircuitBoard size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-mono text-amber-200">IEEE Xplore • B.E. Mechatronics</span>
                <ArrowUpRight
                  size={15}
                  className="text-white/75 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-200 transition-colors">
                Independent Mechatronics &amp; IoT Research
              </h3>
              <p className="text-sm text-white/90 mt-1.5 leading-relaxed">
                IEEE-published IoT researcher (&ldquo;Design and Fabrication of Shrub Trimming Bot on Roadside Using IoT&rdquo;) building custom KiCad PCBs, THT Pick-and-Place CNCs, and LoRaWAN/MQTT systems.
              </p>
            </div>
          </button>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative rounded-3xl border border-white/25 bg-indigo-950/35 p-10 md:p-12 text-center overflow-hidden shadow-[0_24px_60px_rgba(15,23,42,0.35)]">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-cyan-400/10 pointer-events-none" />
          <Server size={40} className="text-amber-200 mx-auto mb-5" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Let&apos;s Build Something{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-cyan-200">
              Extraordinary
            </span>
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
            Whether it&apos;s custom CNC hardware, embedded IoT infrastructure, or a Rust/React system — I build end-to-end engineering pipelines.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              type="button"
              onClick={() => onNavigate('Projects')}
              className="group flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-amber-100 text-indigo-950 font-extrabold rounded-xl transition-all duration-300 shadow-[0_10px_25px_rgba(15,23,42,0.28)] hover:scale-[1.02]"
            >
              Explore My Work
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('Skills')}
              className="px-7 py-3.5 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold rounded-xl transition-all duration-300 hover:scale-[1.02]"
            >
              View Skills
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
