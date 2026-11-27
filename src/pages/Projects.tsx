import React, { useState, useEffect, useMemo } from 'react';
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
    title: 'Universal Electronics Development Studio',
    description:
      'All-in-one software environment featuring PCB design, circuit simulation, an embedded IDE, and 3D modeling tools.',
    highlights: [
      'Unified multi-pane environment combining schematic/PCB workflows with embedded firmware tooling',
      'Interactive 3D hardware inspection powered by WebGL inside a desktop-ready Electron shell',
    ],
    technologies: ['React', 'Node.js', 'Electron', 'WebGL'],
    github: 'https://github.com/sabarees3578',
    demo: null,
    category: 'Web',
    icon: <Code size={24} />,
    iconColorClass: 'text-purple-400',
    dotColorClass: 'bg-purple-500/80',
    bgGlow: 'group-hover:bg-purple-500/10',
  },
  {
    title: 'Smart Shrub Trimming Robot',
    description:
      'Autonomous robotic system designed for automated landscaping. Features computer vision and precise motor control for accurate trimming.',
    highlights: [
      'Onboard Raspberry Pi computer vision pipeline using OpenCV for foliage detection',
      'Closed-loop actuator and motor driver control for targeted trimming',
    ],
    technologies: ['Raspberry Pi', 'Python', 'OpenCV', 'Motors'],
    github: 'https://github.com/sabarees3578',
    demo: null,
    category: 'Robotics',
    icon: <Bot size={24} />,
    iconColorClass: 'text-emerald-400',
    dotColorClass: 'bg-emerald-500/80',
    bgGlow: 'group-hover:bg-emerald-500/10',
  },
  {
    title: 'ESP32 Wi-Fi/Bluetooth Air Mouse',
    description:
      'Custom built air mouse using ESP32 and MPU9250 9-axis sensor. Features Wi-Fi and Bluetooth connectivity for seamless control.',
    highlights: [
      'Reads 9-axis accelerometer, gyroscope, and magnetometer data from the MPU9250 IMU',
      'Dual-mode wireless HID streaming over Bluetooth and Wi-Fi',
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
    title: 'Weather Dashboard',
    description:
      'Interactive web application providing real-time weather data and forecasts using external APIs.',
    highlights: [
      'Type-safe React + TypeScript frontend consuming live weather REST endpoints',
      'Responsive card layout built with Tailwind CSS for desktop and mobile',
    ],
    technologies: ['React', 'TypeScript', 'REST API', 'Tailwind'],
    github: 'https://github.com/sabarees3578',
    demo: null,
    category: 'Web',
    icon: <Globe size={24} />,
    iconColorClass: 'text-purple-400',
    dotColorClass: 'bg-purple-500/80',
    bgGlow: 'group-hover:bg-purple-500/10',
  },
  {
    title: 'MPU9250 Diagnostic Tool',
    description:
      'Embedded diagnostic toolkit for interfacing with the MPU9250 IMU. Provides real-time sensor data visualization and calibration features.',
    highlights: [
      'Embedded C firmware streaming calibrated IMU packets over serial communication',
      'Python host visualizer for inspecting raw sensor axes and drift behavior',
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
    title: 'Secure Password Manager',
    description:
      'Full-stack secure password management application built with the MERN stack featuring AES encryption and secure authentication.',
    highlights: [
      'AES-encrypted credential storage with authenticated REST API endpoints',
      'End-to-end MERN architecture using React, Express, Node.js, and MongoDB',
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    github: 'https://github.com/sabarees3578',
    demo: null,
    category: 'Web',
    icon: <Code size={24} />,
    iconColorClass: 'text-purple-400',
    dotColorClass: 'bg-purple-500/80',
    bgGlow: 'group-hover:bg-purple-500/10',
  },
  {
    title: 'Raspberry Pi AI Vision System',
    description:
      'Edge AI computer vision system utilizing Raspberry Pi. Capable of real-time object detection and classification.',
    highlights: [
      'Optimized edge inference pipeline running TensorFlow Lite on Raspberry Pi',
      'Real-time OpenCV frame capture and classification overlay',
    ],
    technologies: ['Raspberry Pi', 'Python', 'TensorFlow Lite', 'OpenCV'],
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-zinc-950/80 border border-white/20 rounded-full text-cyan-200 text-sm font-semibold mb-5">
              <Code size={16} />
              Featured Work
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-[0_4px_20px_rgba(0,0,0,0.65)]">
              My{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-amber-200">
                Projects
              </span>
            </h1>
            <p className="text-white/90 text-base sm:text-lg leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)]">
              A selection of my engineering work across hardware systems, embedded firmware, robotics, and full-stack web apps.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAiModalOpen(true)}
            className="group flex items-center gap-2 px-5 py-2.5 bg-zinc-950/85 hover:bg-zinc-900 border border-white/20 hover:border-cyan-300/50 text-white hover:text-cyan-200 rounded-xl transition-all duration-300 shadow-lg"
          >
            <Sparkles size={18} className="text-amber-300 group-hover:animate-pulse" />
            <span className="font-semibold text-sm">AI Project Suggester</span>
          </button>
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
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.45)] border border-indigo-400/40'
                      : 'bg-zinc-950/80 text-zinc-200 hover:text-white hover:bg-zinc-900 border border-white/15 hover:border-white/35'
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[11px] font-mono ${
                      isActive ? 'bg-white/20 text-white' : 'bg-zinc-900 text-zinc-300'
                    }`}
                  >
                    {categoryCounts[category]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects or tech..."
              aria-label="Search projects or technologies"
              className="w-full pl-10 pr-9 py-2.5 bg-zinc-950/85 border border-white/20 focus:border-cyan-300/60 rounded-xl text-sm text-white placeholder:text-zinc-400 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
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
                className="group relative flex flex-col justify-between bg-zinc-950/80 hover:bg-zinc-950/95 border border-white/15 hover:border-indigo-300/45 rounded-3xl p-5 sm:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1.5 overflow-hidden animate-fade-up"
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${project.bgGlow}`} />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`p-3 rounded-2xl bg-zinc-900/90 border border-white/15 ${project.iconColorClass} group-hover:scale-110 transition-transform duration-500 shadow-inner`}
                    >
                      {project.icon}
                    </div>
                    <span className="px-3 py-1 bg-zinc-900/90 rounded-full text-xs font-mono font-medium text-indigo-200 border border-white/15">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white group-hover:text-cyan-200 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-zinc-200/90 leading-relaxed mb-6">{project.description}</p>
                </div>

                <div className="relative z-10">
                  <div className="flex flex-wrap gap-2 mb-7">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-zinc-900/90 border border-white/15 rounded-lg text-xs font-medium text-zinc-100 flex items-center gap-1.5"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${project.dotColorClass}`} />
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 pt-6 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-zinc-900/90 hover:bg-zinc-800 border border-white/15 hover:border-white/35 text-white font-semibold text-sm rounded-xl transition-all"
                    >
                      <Layers size={16} className="text-cyan-300" />
                      Details
                    </button>

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 border border-indigo-400/35 text-white font-semibold text-sm rounded-xl transition-all duration-300 hover:shadow-[0_0_24px_rgba(99,102,241,0.45)] group/btn"
                      >
                        <Github size={17} className="text-indigo-100 group-hover/btn:text-white transition-colors" />
                        GitHub Profile
                      </a>
                    )}

                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 hover:border-blue-500 font-semibold text-sm rounded-xl transition-all duration-300"
                      >
                        <ExternalLink size={17} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-white/15 bg-zinc-950/85 p-8 sm:p-12 text-center max-w-2xl mx-auto">
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

            {selectedProject.github && (
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
        suggestions={['LoRaWAN Fleet Monitor', 'Autonomous Rover Telemetry', 'Smart Energy Meter']}
      />
    </div>
  );
};
