import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import RotatingText from '../components/RotatingText';
import { useCardBackImage } from '../lib/cardBackImage';
import type { ProjectCategory } from './Projects';
import {
  Code, Smartphone, Bot, Github, Linkedin, Mail,
  ArrowRight, CircuitBoard, Wifi, Server, Briefcase,
  Copy, Check, Layers, ArrowUpRight, FileText
} from 'lucide-react';

const Lanyard = lazy(() => import('../components/Lanyard'));

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

const FOCUS_CHIPS: Array<{ label: string; category: ProjectCategory }> = [
  { label: 'ESP32 & LoRaWAN', category: 'IoT' },
  { label: 'React & Node.js', category: 'Web' },
  { label: 'Robotics & CAD', category: 'Robotics' },
];

const CONTACT_EMAIL = 'sabareesgodkiller@gmail.com';

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
      <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-cyan-200">
        {count}
        {suffix}
      </div>
      <div className="text-xs text-zinc-200 mt-1.5 font-semibold uppercase tracking-widest">{label}</div>
    </div>
  );
};

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
    className={`relative group text-left rounded-2xl border p-6 transition-all duration-300 cursor-pointer bg-zinc-950/80 hover:bg-zinc-950/95 hover:-translate-y-2 hover:scale-[1.015] shadow-[0_12px_32px_rgba(0,0,0,0.45)] animate-fade-up ${borderColor} ${hoverShadow}`}
    style={{ animationDelay: delay }}
  >
    <div className={`inline-flex p-3 rounded-xl mb-4 ${iconBg} ring-1 ring-white/15`}>{icon}</div>
    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-200 transition-colors">{title}</h3>
    <p className="text-zinc-100/90 text-sm leading-relaxed pr-2">{desc}</p>

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
    { icon: <Github size={18} />, href: 'https://github.com/sabarees3578', label: 'GitHub' },
    { icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/sabarees-rajendran', label: 'LinkedIn' },
    { icon: <Mail size={18} />, href: `mailto:${CONTACT_EMAIL}`, label: 'Email' },
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
      icon: <Wifi size={28} className="text-blue-400" />,
      title: 'IoT & Embedded Systems',
      desc: 'ESP32, Arduino & Raspberry Pi firmware. MQTT, Bluetooth, LoRaWAN & sensor integration.',
      hoverShadow: 'hover:shadow-[0_12px_36px_rgba(59,130,246,0.28)]',
      borderColor: 'border-blue-400/25 hover:border-blue-400/60',
      iconBg: 'bg-blue-900/40',
      delay: '0.08s',
      category: 'IoT',
    },
    {
      icon: <Code size={28} className="text-purple-400" />,
      title: 'Full-Stack Web Dev',
      desc: 'React, Node.js, WebSockets & REST APIs. Real-time dashboards & developer tooling.',
      hoverShadow: 'hover:shadow-[0_12px_36px_rgba(168,85,247,0.28)]',
      borderColor: 'border-purple-400/25 hover:border-purple-400/60',
      iconBg: 'bg-purple-900/40',
      delay: '0.16s',
      category: 'Web',
    },
    {
      icon: <Bot size={28} className="text-emerald-400" />,
      title: 'Robotics & CAD',
      desc: 'Webots, RobotDK & Roboguide simulation. PCB design, 3D modeling & prototyping.',
      hoverShadow: 'hover:shadow-[0_12px_36px_rgba(52,211,153,0.28)]',
      borderColor: 'border-emerald-400/25 hover:border-emerald-400/60',
      iconBg: 'bg-emerald-900/40',
      delay: '0.24s',
      category: 'Robotics',
    },
    {
      icon: <Smartphone size={28} className="text-orange-400" />,
      title: 'Mobile & Android',
      desc: 'Native Android & React Native apps. Hardware interface apps with Bluetooth & Wi-Fi control.',
      hoverShadow: 'hover:shadow-[0_12px_36px_rgba(251,146,60,0.28)]',
      borderColor: 'border-orange-400/25 hover:border-orange-400/60',
      iconBg: 'bg-orange-900/40',
      delay: '0.32s',
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
      accent: 'border-purple-400/30 hover:border-purple-300/65',
      badge: 'bg-purple-500/20 text-purple-200 border-purple-400/35',
    },
    {
      tag: 'Autonomous Robotics',
      title: 'Smart Shrub Trimming Robot',
      summary:
        'Computer-vision-guided autonomous landscaping platform combining Raspberry Pi OpenCV perception with precision motor control.',
      stack: ['Raspberry Pi', 'Python', 'OpenCV'],
      category: 'Robotics' as ProjectCategory,
      accent: 'border-emerald-400/30 hover:border-emerald-300/65',
      badge: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/35',
    },
    {
      tag: 'Embedded Wireless HID',
      title: 'ESP32 Wi-Fi / Bluetooth Air Mouse',
      summary:
        'Custom 9-axis IMU air mouse powered by ESP32 and MPU9250 with low-latency wireless cursor control over BLE & Wi-Fi.',
      stack: ['ESP32', 'C++', 'MPU9250', 'Bluetooth'],
      category: 'IoT' as ProjectCategory,
      accent: 'border-blue-400/30 hover:border-blue-300/65',
      badge: 'bg-blue-500/20 text-blue-200 border-blue-400/35',
    },
  ];

  return (
    <div className="relative min-h-screen bg-transparent overflow-x-hidden">
      {/* ── HERO SECTION ── */}
      <section className="relative z-10 w-full pb-12 md:pb-16">
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
                strapLength={0.52}
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
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Text content */}
            <div className="space-y-6 pt-28 md:pt-36">
              <h1 className="animate-fade-up text-[2.1rem] sm:text-5xl lg:text-[2.75rem] xl:text-[3.45rem] font-extrabold text-white leading-[1.06] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.75)]">
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
              <div className="animate-fade-up-delay-1 flex items-center min-h-[42px] overflow-hidden">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-zinc-950/85 border border-white/20 shadow-[0_8px_28px_rgba(0,0,0,0.5)]">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-300" />
                  </span>
                  <RotatingText
                    texts={ROLES}
                    effect="blur"
                    splitBy="words"
                    staggerDuration={0}
                    rotationInterval={2600}
                    transition={{ duration: 0.18 }}
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    pauseOnHover
                    mainClassName="text-sm sm:text-base font-bold text-amber-200 whitespace-nowrap"
                  />
                </div>
              </div>

              <p className="animate-fade-up-delay-2 text-white/95 text-base sm:text-lg leading-relaxed max-w-xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                Engineering{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-cyan-200 font-bold">
                  intelligent hardware-software ecosystems
                </span>
                . I build everything from IoT firmware and LoRaWAN deployments to robotic control systems,
                real-time web dashboards, and Android apps.
              </p>

              {/* Clickable focus chips */}
              <div className="animate-fade-up-delay-3 flex flex-wrap gap-2">
                {FOCUS_CHIPS.map((chip) => (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() => onNavigate('Projects', { category: chip.category })}
                    className="px-3.5 py-1.5 rounded-full bg-zinc-950/80 hover:bg-zinc-900 border border-white/20 hover:border-amber-300/60 text-xs font-mono text-white hover:text-amber-200 transition-all"
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
                  className="group flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-amber-100 text-zinc-950 font-extrabold rounded-xl transition-all duration-300 shadow-[0_0_28px_rgba(255,255,255,0.3)] hover:shadow-[0_0_34px_rgba(253,224,71,0.5)] hover:scale-[1.02] active:scale-95"
                >
                  View Projects
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('Resume')}
                  className="flex items-center gap-2 px-6 py-3.5 bg-zinc-950/85 hover:bg-zinc-900 border border-white/25 hover:border-cyan-300/60 text-white font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
                >
                  <FileText size={17} className="text-cyan-200" />
                  View &amp; Download Resume
                </button>
              </div>

              {/* Social quick links + copy email */}
              <div className="animate-fade-up-delay-5 flex flex-wrap items-center gap-2.5 pt-3 border-t border-white/20 max-w-xl">
                <span className="text-white/90 text-xs font-mono uppercase tracking-wider mr-1 drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)]">
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
                    className="inline-flex p-2.5 rounded-xl bg-zinc-950/85 hover:bg-zinc-900 border border-white/20 hover:border-amber-300/60 text-white hover:text-amber-200 transition-all duration-200 hover:scale-105"
                  >
                    {link.icon}
                  </a>
                ))}
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-zinc-950/85 hover:bg-zinc-900 border border-white/20 hover:border-cyan-300/60 text-xs font-mono text-white hover:text-cyan-200 transition-all"
                >
                  {copiedEmail ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  {copiedEmail ? 'Email copied!' : CONTACT_EMAIL}
                </button>
              </div>
            </div>

            {/* Right column spacer on desktop / mobile Lanyard */}
            {isDesktop ? (
              <div className="h-[580px]" aria-hidden="true" />
            ) : (
              <div className="relative flex justify-center items-start">
                <div className="w-full h-[520px] relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-gradient-to-r from-transparent via-indigo-300/60 to-transparent z-10" />
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
                      strapLength={0.55}
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

      {/* ── STATS BAR ── */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/15 rounded-2xl overflow-hidden border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
          {[
            { value: 15, suffix: '+', label: 'Projects Built' },
            { value: 6, suffix: '+', label: 'Tech Domains' },
            { value: 3, suffix: '+', label: 'Years Experience' },
            { value: 30, suffix: '+', label: 'Tools & Stacks' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-zinc-950/85 py-7 px-4 hover:bg-zinc-900/90 transition-colors duration-300"
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
                <span className="inline-block px-5 py-2 bg-zinc-950/85 border border-white/15 rounded-full text-white text-sm font-medium hover:border-amber-300/60 hover:text-amber-200 transition-colors duration-200 cursor-default">
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-zinc-950/85 border border-white/20 rounded-full text-amber-200 text-xs font-semibold uppercase tracking-widest mb-4">
            <CircuitBoard size={13} className="text-amber-300" />
            Areas of Expertise
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
            What I Build
          </h2>
          <p className="text-white/90 mt-3 max-w-xl mx-auto drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)]">
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-zinc-950/85 border border-white/20 rounded-full text-cyan-200 text-xs font-semibold uppercase tracking-widest mb-3">
              <Layers size={13} />
              Spotlight
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
              Featured Work &amp; Current Focus
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('Projects')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-950/85 hover:bg-zinc-900 border border-white/20 hover:border-amber-300/60 text-sm font-semibold text-amber-200 hover:text-white transition-all self-start md:self-auto"
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
              className={`group rounded-2xl border bg-zinc-950/80 hover:bg-zinc-950/95 p-6 shadow-[0_12px_36px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between ${item.accent}`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${item.badge}`}>
                    {item.tag}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-zinc-300 group-hover:text-amber-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-100/90 leading-relaxed mb-5">{item.summary}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {item.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md bg-zinc-900/90 border border-white/15 text-[11px] font-mono text-zinc-100"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Current Experience Snapshot (clickable to Resume) */}
        <div className="grid md:grid-cols-2 gap-6">
          <button
            type="button"
            onClick={() => onNavigate('Resume')}
            className="group text-left rounded-2xl border border-white/15 bg-zinc-950/80 hover:bg-zinc-950/95 p-6 flex items-start gap-4 hover:border-cyan-300/60 transition-all shadow-[0_12px_36px_rgba(0,0,0,0.45)]"
          >
            <div className="p-3 rounded-xl bg-cyan-500/15 border border-cyan-300/30 text-cyan-200 shrink-0">
              <Briefcase size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-mono text-cyan-200">Jan 2024 – Present</span>
                <ArrowUpRight
                  size={15}
                  className="text-zinc-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-cyan-200 transition-colors">
                Founder &amp; Lead Developer — godem.in
              </h3>
              <p className="text-sm text-zinc-100/90 mt-1.5 leading-relaxed">
                Building an open-source, AI-integrated IDE and IoT platform designed for hobbyists and makers, spanning system architecture to silicon-to-cloud tooling.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('Resume')}
            className="group text-left rounded-2xl border border-white/15 bg-zinc-950/80 hover:bg-zinc-950/95 p-6 flex items-start gap-4 hover:border-amber-300/60 transition-all shadow-[0_12px_36px_rgba(0,0,0,0.45)]"
          >
            <div className="p-3 rounded-xl bg-amber-400/15 border border-amber-300/30 text-amber-200 shrink-0">
              <Wifi size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-mono text-amber-200">Mar 2025 – Jul 2026</span>
                <ArrowUpRight
                  size={15}
                  className="text-zinc-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-200 transition-colors">
                Technical Engineer — Enthu Technology Solutions
              </h3>
              <p className="text-sm text-zinc-100/90 mt-1.5 leading-relaxed">
                Deploying industrial LoRaWAN gateways and end-nodes with ChirpStack network servers, optimizing packet reliability and real-time sensor dashboards.
              </p>
            </div>
          </button>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative rounded-3xl border border-white/20 bg-zinc-950/85 p-10 md:p-12 text-center overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-cyan-500/10 pointer-events-none" />
          <Server size={40} className="text-amber-200 mx-auto mb-5" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Let&apos;s Build Something{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-cyan-200">
              Extraordinary
            </span>
          </h2>
          <p className="text-zinc-100/90 text-lg mb-8 max-w-xl mx-auto">
            Whether it&apos;s a smart IoT product, a robotics system, or a full-stack web application — I&apos;m ready
            to engineer it with you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              type="button"
              onClick={() => onNavigate('Projects')}
              className="group flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-amber-100 text-zinc-950 font-extrabold rounded-xl transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:shadow-[0_0_32px_rgba(253,224,71,0.5)] hover:scale-[1.02]"
            >
              Explore My Work
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('Skills')}
              className="px-7 py-3.5 bg-zinc-900/90 hover:bg-zinc-800 border border-white/25 hover:border-cyan-300/60 text-white font-bold rounded-xl transition-all duration-300 hover:scale-[1.02]"
            >
              View Skills
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
