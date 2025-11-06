import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { AiModal } from '../components/AiModal';
import { Github, Globe, Sparkles } from 'lucide-react';
import { suggestProjectDescription } from '../lib/gemini';

export const Projects: React.FC = () => {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const projects = [
    {
      title: 'Robot Control Interface',
      description: 'A web-based control interface for robotic systems with real-time communication and intuitive command controls.',
      technologies: ['React', 'WebSockets', 'Arduino', 'IoT'],
      github: 'https://github.com/sabarees3578/robot-project',
      demo: 'https://robotprojectcontrol.netlify.app',
      variant: 'blue' as const
    },
    {
      title: 'IoT Dashboard',
      description: 'Real-time monitoring dashboard for IoT devices with data visualization and remote control capabilities.',
      technologies: ['React', 'MQTT', 'ESP32', 'Chart.js'],
      github: 'https://github.com/sabarees3578',
      demo: null,
      variant: 'purple' as const
    },
    {
      title: 'Smart Home Automation',
      description: 'Arduino-based home automation system with mobile app control and scheduling features.',
      technologies: ['Arduino', 'Android', 'Bluetooth', 'Sensors'],
      github: 'https://github.com/sabarees3578',
      demo: null,
      variant: 'white' as const
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h1 className="text-5xl font-bold text-white mb-4">Projects</h1>
            <p className="text-zinc-400 text-lg">
              Showcasing my work in IoT, robotics, and full-stack development
            </p>
          </div>

          <Button
            variant="primary"
            onClick={() => setIsAiModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Sparkles size={20} />
            AI Project Suggester
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} variant={project.variant}>
              <div className="h-full flex flex-col">
                <h3 className="text-2xl font-bold text-black mb-3">
                  {project.title}
                </h3>

                <p className="text-black mb-4 flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-black text-white text-sm font-bold border-2 border-black"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <button className="w-full px-4 py-2 bg-black text-white font-bold border-2 border-black hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2">
                      <Github size={18} />
                      Code
                    </button>
                  </a>

                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <button className="w-full px-4 py-2 bg-white text-black font-bold border-2 border-black hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
                        <Globe size={18} />
                        Live
                      </button>
                    </a>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <AiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        title="AI Project Description Suggester"
        placeholder="Enter your project name..."
        submitButtonText="Generate Description"
        onSubmit={suggestProjectDescription}
      />
    </div>
  );
};
