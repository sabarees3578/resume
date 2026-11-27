import React, { useState, useEffect, useMemo, useRef } from 'react';
import { AiModal } from '../components/AiModal';
import {
  Github, Globe, Sparkles, Cpu, Code, Bot, Smartphone,
  ExternalLink, Search, X, Layers, FolderOpen
} from 'lucide-react';
import { suggestProjectDescription } from '../lib/gemini';

export type ProjectCategory = 'All' | 'IoT' | 'Web' | 'Robotics' | 'Mobile';

interface Project {
  title: string;
  description: string;
  highlights: string[];
  technologies: string[];
  github: string | null;
  demo: string | null;
  category: Exclude<ProjectCategory, 'All'>;
  icon: React.ReactNode;
  iconColorClass: string;
  dotColorClass: string;
  bgGlow: string;
}

interface ProjectsProps {
  initialCategory?: ProjectCategory;
  onNavigate?: (page: string) => void;
}

const PROJECTS: Project[] = [
  {
    title: 'Raw IDE / Godem IDE',
    description:
      'Independent Rust + Tauri desktop developer environment engineered for embedded and IoT workflows, uniting Monaco Editor, arduino-cli, AI coding workflows, and Docker staging.',
    highlights: [
      'Built on a native Rust + Tauri core for fast local serial/USB flashing via arduino-cli and Docker container staging',
      'Custom Monaco Editor workspace with AI-assisted embedded code generation and multi-target build tooling for godem.in',
    ],
    technologies: ['Rust', 'Tauri', 'React', 'TypeScript', 'Monaco Editor', 'Docker'],
    github: 'https://github.com/sabarees3578',
    demo: 'https://godem.in',
    category: 'Web',
    icon: <Code size={24} />,
    iconColorClass: 'text-purple-400',
    dotColorClass: 'bg-purple-500/80',
    bgGlow: 'group-hover:bg-purple-500/10',
  },
  {
    title: 'Custom THT Pick-and-Place CNC & Robotics',
    description:
      'Custom-designed through-hole (THT) Pick-and-Place CNC automation platform built with SKR Mini E3, TMC2209 stepper drivers, NEMA steppers, and custom KiCad PCBs.',
    highlights: [
      'Multi-axis CNC kinematics tuned on SKR Mini E3 with silent TMC2209 drivers, NEMA steppers, and Mach3/G-code workflows',
      'End-to-end custom KiCad PCB layout alongside THT/SMT hardware fabrication and closed-loop actuator testing',
    ],
    technologies: ['SKR Mini E3', 'TMC2209', 'NEMA Steppers', 'KiCad PCB', 'Mach3'],
    github: 'https://github.com/sabarees3578',
    demo: null,
    category: 'Robotics',
    icon: <Bot size={24} />,
    iconColorClass: 'text-emerald-400',
    dotColorClass: 'bg-emerald-500/80',
    bgGlow: 'group-hover:bg-emerald-500/10',
  },
  {
    title: 'Shrub Trimming Bot on Roadside Using IoT',
    description:
      'IEEE Xplore published research ("Design and Fabrication of Shrub Trimming Bot on Roadside Using IoT") — an autonomous roadside vegetation maintenance robot driven by IoT telemetry and computer vision.',
    highlights: [
      'Published in IEEE Xplore: end-to-end mechanical fabrication, motor drive electronics, and autonomous roadside trimming logic',
      'Onboard Raspberry Pi OpenCV vision pipeline paired with IoT remote supervision and actuation',
    ],
    technologies: ['IoT', 'Raspberry Pi', 'Python', 'OpenCV', 'IEEE Xplore'],
    github: 'https://github.com/sabarees3578',
    demo: null,
    category: 'Robotics',
    icon: <Bot size={24} />,
    iconColorClass: 'text-emerald-400',
    dotColorClass: 'bg-emerald-500/80',
    bgGlow: 'group-hover:bg-emerald-500/10',
  },
  {
    title: 'iotmaker.cloud — Hardware-to-Cloud Platform',
    description:
      'Self-hosted IoT telemetry and device orchestration platform bridging ESP32, STM32, and LoRaWAN nodes into real-time web dashboards and TimescaleDB storage.',
    highlights: [
      'High-ingest MQTT and LoRaWAN (ChirpStack / TTN) pipeline backed by PostgreSQL + TimescaleDB hypertables',
      'Self-hosted containerized stack running on Linux with Docker, Coolify, WebSockets, and automated CI/CD',
    ],
    technologies: ['ESP32', 'LoRaWAN', 'MQTT', 'TimescaleDB', 'Docker', 'Node.js'],
    github: 'https://github.com/sabarees3578',
    demo: null,
    category: 'IoT',
    icon: <Globe size={24} />,
    iconColorClass: 'text-cyan-300',
    dotColorClass: 'bg-cyan-400/80',
    bgGlow: 'group-hover:bg-cyan-500/10',
  },
  {
    title: 'ESP32 Wi-Fi / Bluetooth Air Mouse',
    description:
      'Custom wireless HID air mouse powered by ESP32 and an MPU9250 9-axis IMU sensor with dual Wi-Fi and Bluetooth Low Energy transport.',
    highlights: [
      'Reads 9-axis accelerometer, gyroscope, and magnetometer fusion streams from the MPU9250 IMU',
      'Low-latency wireless cursor streaming over Bluetooth HID and Wi-Fi sockets',
    ],
    technologies: ['ESP32', 'C++', 'MPU9250', 'Bluetooth'],
    github: 'https://github.com/sabarees3578',
    demo: null,
    category: 'IoT',
    icon: <Cpu size={24} />,
    iconColorClass: 'text-blue-400',
    dotColorClass: 'bg-blue-500/80',
    bgGlow: 'group-hover:bg-blue-500/10',
  },
  {
    title: 'MPU9250 Diagnostic Tool',
    description:
      'Embedded diagnostic toolkit for interfacing with the MPU9250 IMU. Provides real-time sensor data visualization and calibration features.',
    highlights: [
      'Embedded C firmware streaming calibrated IMU packets over high-baud serial telemetry',
      'Python host visualizer for inspecting raw sensor axes, bias offsets, and gyro drift behavior',
    ],
    technologies: ['Embedded C', 'Python', 'Serial Comm'],
    github: 'https://github.com/sabarees3578',
    demo: null,
    category: 'IoT',
    icon: <Cpu size={24} />,
    iconColorClass: 'text-blue-400',
    dotColorClass: 'bg-blue-500/80',
    bgGlow: 'group-hover:bg-blue-500/10',
  },
  {
    title: 'Raspberry Pi AI Vision System',
    description:
      'Edge AI computer vision system running on Raspberry Pi 4/5 with OpenCV and MediaPipe for real-time object detection, tracking, and robotic guidance.',
    highlights: [
      'Low-latency edge vision pipeline combining OpenCV frame processing with MediaPipe landmark/object tracking',
      'Designed for autonomous hardware perception and real-time actuator feedback loops',
    ],
    technologies: ['Raspberry Pi 4/5', 'Python', 'OpenCV', 'MediaPipe'],
    github: 'https://github.com/sabarees3578',
    demo: null,
    category: 'Robotics',
    icon: <Bot size={24} />,
    iconColorClass: 'text-emerald-400',
    dotColorClass: 'bg-emerald-500/80',
    bgGlow: 'group-hover:bg-emerald-500/10',
  },
];

const CATEGORIES: ProjectCategory[] = ['All', 'IoT', 'Web', 'Robotics', 'Mobile'];

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
      <div className="text-xs text-white/90 mt-1.5 font-semibold uppercase tracking-widest">{label}</div>
    </div>
  );
};

export const Projects: React.FC<ProjectsProps> = ({ initialCategory = 'All', onNavigate }) => {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    if (!selectedProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedProject]);

  const categoryCounts = useMemo(() => {
    const counts: Record<ProjectCategory, number> = {
      All: PROJECTS.length,
      IoT: 0,
      Web: 0,
      Robotics: 0,
      Mobile: 0,
    };
    PROJECTS.forEach((p) => {
      counts[p.category] += 1;
    });
    return counts;
  }, []);

  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PROJECTS.filter((project) => {
      const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.technologies.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-transparent text-white relative overflow-hidden pb-24">
      {/* Subtle Grid Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/15 border border-white/25 rounded-full text-cyan-200 text-sm font-semibold mb-5">
              <Code size={16} />
              Featured Work
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-[0_4px_20px_rgba(15,23,42,0.5)]">
              My{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-amber-200">
                Projects
              </span>
            </h1>
            <p className="text-white/95 text-base sm:text-lg leading-relaxed drop-shadow-[0_2px_8px_rgba(15,23,42,0.55)]">
              A selection of my engineering work across hardware systems, embedded firmware, robotics, and full-stack web apps.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAiModalOpen(true)}
            className="group flex items-center gap-2 px-5 py-2.5 bg-white/15 hover:bg-white/25 border border-white/25 hover:border-cyan-200/60 text-white rounded-xl transition-all duration-300 shadow-lg"
          >
            <Sparkles size={18} className="text-amber-200 group-hover:animate-pulse" />
            <span className="font-semibold text-sm">AI Project Suggester</span>
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/20 rounded-2xl overflow-hidden border border-white/25 shadow-[0_14px_36px_rgba(15,23,42,0.28)] mb-10">
          {[
            { value: 15, suffix: '+', label: 'Personal Builds' },
            { value: 4, suffix: '', label: 'Core Disciplines' },
            { value: 1, suffix: '', label: 'IEEE Publication' },
            { value: 38, suffix: '+', label: 'Verified Tools' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-indigo-950/35 hover:bg-indigo-950/50 py-6 px-4 transition-colors duration-300"
            >
              <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
            </div>
          ))}
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-white text-indigo-950 shadow-[0_0_20px_rgba(255,255,255,0.35)] border border-white'
                      : 'bg-white/15 text-white hover:bg-white/25 border border-white/25'
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[11px] font-mono ${
                      isActive ? 'bg-indigo-950/15 text-indigo-950' : 'bg-white/15 text-white'
                    }`}
                  >
                    {categoryCounts[category]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/75" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects or tech..."
              aria-label="Search projects or technologies"
              className="w-full pl-10 pr-9 py-2.5 bg-white/15 border border-white/25 focus:border-white/60 rounded-xl text-sm text-white placeholder:text-white/65 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/75 hover:text-white"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid or Empty State */}
        {filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.title}
                className="group relative flex flex-col justify-between bg-indigo-950/35 hover:bg-indigo-950/50 border border-white/25 hover:border-white/45 rounded-3xl p-5 sm:p-8 shadow-[0_16px_40px_rgba(15,23,42,0.3)] transition-all duration-300 hover:-translate-y-1.5 overflow-hidden animate-fade-up"
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${project.bgGlow}`} />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`p-3 rounded-2xl bg-white/15 border border-white/25 ${project.iconColorClass} group-hover:scale-110 transition-transform duration-500 shadow-inner`}
                    >
                      {project.icon}
                    </div>
                    <span className="px-3 py-1 bg-white/15 rounded-full text-xs font-mono font-medium text-white border border-white/25">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white group-hover:text-amber-200 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-white/90 leading-relaxed mb-6">{project.description}</p>
                </div>

                <div className="relative z-10">
                  <div className="flex flex-wrap gap-2 mb-7">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-white/15 border border-white/20 rounded-lg text-xs font-medium text-white flex items-center gap-1.5"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${project.dotColorClass}`} />
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 pt-6 border-t border-white/20">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-white/15 hover:bg-white/25 border border-white/25 text-white font-semibold text-sm rounded-xl transition-all"
                    >
                      <Layers size={16} className="text-cyan-200" />
                      Details
                    </button>

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-amber-100 text-indigo-950 font-bold text-sm rounded-xl transition-all duration-300 shadow-md group/btn"
                      >
                        <Github size={17} />
                        GitHub Profile
                      </a>
                    )}

                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/15 hover:bg-white/25 text-white border border-white/30 font-semibold text-sm rounded-xl transition-all duration-300"
                      >
                        <ExternalLink size={17} />
                        Live Site
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-white/25 bg-indigo-950/35 p-8 sm:p-12 text-center max-w-2xl mx-auto">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-zinc-800/80 border border-zinc-700 flex items-center justify-center text-zinc-400 mb-5">
              {activeCategory === 'Mobile' ? <Smartphone size={26} className="text-orange-400" /> : <FolderOpen size={26} />}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {activeCategory === 'Mobile' && !searchQuery
                ? 'Mobile Projects Coming Soon'
                : 'No matching projects found'}
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              {activeCategory === 'Mobile' && !searchQuery
                ? 'My Android Studio and React Native hardware-interface projects are being prepared for public showcase. Meanwhile, explore my mobile stack on the Skills page or browse other categories.'
                : 'Try clearing your search term or switching back to all project categories.'}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors"
              >
                Show All Projects
              </button>
              {onNavigate && (
                <button
                  type="button"
                  onClick={() => onNavigate('Skills')}
                  className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 text-sm font-semibold transition-colors"
                >
                  View Mobile Skills
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <div
            className="bg-zinc-900 border border-zinc-700/80 rounded-3xl max-w-xl w-full max-h-[88vh] overflow-y-auto p-5 sm:p-7 shadow-2xl space-y-5 animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl bg-zinc-800 border border-zinc-700 ${selectedProject.iconColorClass}`}>
                  {selectedProject.icon}
                </div>
                <div>
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                    {selectedProject.category} Project
                  </span>
                  <h2 id="project-modal-title" className="text-xl font-bold text-white">
                    {selectedProject.title}
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-zinc-300 text-sm leading-relaxed">{selectedProject.description}</p>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2.5">
                Architecture &amp; Highlights
              </h3>
              <ul className="space-y-2">
                {selectedProject.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${selectedProject.dotColorClass}`} />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2.5">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {selectedProject.demo && (
              <div className="pt-2 flex justify-end gap-3">
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-white/15 text-white text-sm font-bold rounded-xl transition-colors"
                >
                  <ExternalLink size={16} />
                  Visit Site
                </a>
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-colors"
                  >
                    <Github size={16} />
                    Visit GitHub
                  </a>
                )}
              </div>
            )}

            {!selectedProject.demo && selectedProject.github && (
              <div className="pt-2 flex justify-end">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-colors"
                >
                  <Github size={16} />
                  Visit GitHub
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      <AiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        title="AI Project Description Suggester"
        placeholder="Enter your project name or idea..."
        submitButtonText="Generate Description"
        onSubmit={suggestProjectDescription}
        suggestions={['Raw IDE / Godem IDE', 'THT Pick-and-Place CNC', 'Roadside Shrub Trimming IoT Bot']}
      />
    </div>
  );
};
