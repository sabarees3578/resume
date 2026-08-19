import React, { useState, useEffect } from 'react';
import { AiModal } from '../components/AiModal';
import { Github, Globe, Sparkles, Cpu, Code, Bot, Smartphone, ArrowRight, ExternalLink } from 'lucide-react';
import { suggestProjectDescription } from '../lib/gemini';

type Category = 'All' | 'IoT' | 'Web' | 'Robotics' | 'Mobile';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github: string | null;
  demo: string | null;
  category: Category;
  icon: React.ReactNode;
  iconColorClass: string;
  dotColorClass: string;
  bgGlow: string;
}

export const Projects: React.FC = () => {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const projects: Project[] = [
    {
      title: 'Universal Electronics Development Studio',
      description: 'All-in-one software environment featuring PCB design, circuit simulation, an embedded IDE, and 3D modeling tools.',
      technologies: ['React', 'Node.js', 'Electron', 'WebGL'],
      github: 'https://github.com/sabarees3578',
      demo: null,
      category: 'Web',
      icon: <Code size={24} />,
      iconColorClass: 'text-purple-400',
      dotColorClass: 'bg-purple-500/80',
      bgGlow: 'group-hover:bg-purple-500/10'
    },
    {
      title: 'Smart Shrub Trimming Robot',
      description: 'Autonomous robotic system designed for automated landscaping. Features computer vision and precise motor control for accurate trimming.',
      technologies: ['Raspberry Pi', 'Python', 'OpenCV', 'Motors'],
      github: 'https://github.com/sabarees3578',
      demo: null,
      category: 'Robotics',
      icon: <Bot size={24} />,
      iconColorClass: 'text-emerald-400',
      dotColorClass: 'bg-emerald-500/80',
      bgGlow: 'group-hover:bg-emerald-500/10'
    },
    {
      title: 'ESP32 Wi-Fi/Bluetooth Air Mouse',
      description: 'Custom built air mouse using ESP32 and MPU9250 9-axis sensor. Features Wi-Fi and Bluetooth connectivity for seamless control.',
      technologies: ['ESP32', 'C++', 'MPU9250', 'Bluetooth'],
      github: 'https://github.com/sabarees3578',
      demo: null,
      category: 'IoT',
      icon: <Cpu size={24} />,
      iconColorClass: 'text-blue-400',
      dotColorClass: 'bg-blue-500/80',
      bgGlow: 'group-hover:bg-blue-500/10'
    },
    {
      title: 'Weather Dashboard',
      description: 'Interactive web application providing real-time weather data and forecasts using external APIs.',
      technologies: ['React', 'TypeScript', 'REST API', 'Tailwind'],
      github: 'https://github.com/sabarees3578',
      demo: null,
      category: 'Web',
      icon: <Globe size={24} />,
      iconColorClass: 'text-purple-400',
      dotColorClass: 'bg-purple-500/80',
      bgGlow: 'group-hover:bg-purple-500/10'
    },
    {
      title: 'MPU9250 Diagnostic Tool',
      description: 'Embedded diagnostic toolkit for interfacing with the MPU9250 IMU. Provides real-time sensor data visualization and calibration features.',
      technologies: ['Embedded C', 'Python', 'Serial Comm'],
      github: 'https://github.com/sabarees3578',
      demo: null,
      category: 'IoT',
      icon: <Cpu size={24} />,
      iconColorClass: 'text-blue-400',
      dotColorClass: 'bg-blue-500/80',
      bgGlow: 'group-hover:bg-blue-500/10'
    },
    {
      title: 'Secure Password Manager',
      description: 'Full-stack secure password management application built with the MERN stack featuring AES encryption and secure authentication.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      github: 'https://github.com/sabarees3578',
      demo: null,
      category: 'Web',
      icon: <Code size={24} />,
      iconColorClass: 'text-purple-400',
      dotColorClass: 'bg-purple-500/80',
      bgGlow: 'group-hover:bg-purple-500/10'
    },
    {
      title: 'Raspberry Pi AI Vision System',
      description: 'Edge AI computer vision system utilizing Raspberry Pi. Capable of real-time object detection and classification.',
      technologies: ['Raspberry Pi', 'Python', 'TensorFlow Lite', 'OpenCV'],
      github: 'https://github.com/sabarees3578',
      demo: null,
      category: 'Robotics',
      icon: <Bot size={24} />,
      iconColorClass: 'text-emerald-400',
      dotColorClass: 'bg-emerald-500/80',
      bgGlow: 'group-hover:bg-emerald-500/10'
    }
  ];

  const categories: Category[] = ['All', 'IoT', 'Web', 'Robotics', 'Mobile'];

  const filteredProjects = projects.filter(
    (project) => activeCategory === 'All' || project.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden pb-24">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
      </div>

      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-semibold mb-6">
              <Code size={16} />
              Featured Work
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Projects</span>
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              A selection of my recent work across hardware engineering, embedded systems, and full-stack web development.
            </p>
          </div>

          <button
            onClick={() => setIsAiModalOpen(true)}
            className="group flex items-center gap-2 px-5 py-2.5 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/60 hover:border-blue-500/50 text-zinc-300 hover:text-blue-400 rounded-xl transition-all duration-300 backdrop-blur-sm shadow-lg"
          >
            <Sparkles size={18} className="text-yellow-400 group-hover:animate-pulse" />
            <span className="font-semibold text-sm">AI Project Suggester</span>
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] border border-blue-500'
                  : 'bg-zinc-900/50 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={index}
              className={`group relative flex flex-col justify-between bg-zinc-900/40 hover:bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-600/80 rounded-3xl p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 overflow-hidden animate-fade-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Dynamic Glow Background */}
              <div className={`absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none ${project.bgGlow}`} />

              <div>
                {/* Icon & Category */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 rounded-2xl bg-zinc-800/80 border border-zinc-700/50 ${project.iconColorClass} group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                    {project.icon}
                  </div>
                  <span className="px-3 py-1 bg-zinc-800/50 rounded-full text-xs font-mono font-medium text-zinc-400 border border-zinc-700/30">
                    {project.category}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed mb-8">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1.5 bg-zinc-950/80 border border-zinc-800/80 rounded-lg text-xs font-medium text-zinc-300 flex items-center gap-1.5 hover:border-zinc-600 transition-colors cursor-default"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${project.dotColorClass}`} />
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 pt-6 border-t border-zinc-800/50">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg group/btn"
                    >
                      <Github size={18} className="text-zinc-400 group-hover/btn:text-white transition-colors" />
                      View Code
                    </a>
                  )}

                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 hover:border-blue-500 font-semibold rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] group/demo"
                    >
                      <ExternalLink size={18} className="transition-transform group-hover/demo:scale-110" />
                      Live Demo
                    </a>
                  )}
                  
                  {!project.demo && !project.github && (
                     <span className="flex-1 text-center text-zinc-600 text-sm italic py-3">Internal Project</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        title="AI Project Description Suggester"
        placeholder="Enter your project name or idea..."
        submitButtonText="Generate Description"
        onSubmit={suggestProjectDescription}
      />
    </div>
  );
};
