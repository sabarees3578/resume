import React, { useState, useEffect } from 'react';
import { AiModal } from '../components/AiModal';
import { Sparkles, Cpu, Code2, Globe, Smartphone, Radio, Wrench, Bot } from 'lucide-react';
import { explainSkill } from '../lib/gemini';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  iconColorClass: string;
  glow: string;
  skills: string[];
}

export const Skills: React.FC = () => {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories: SkillCategory[] = [
    {
      title: 'Hardware & IoT',
      icon: <Cpu size={22} />,
      iconColorClass: 'text-blue-400',
      glow: 'group-hover:bg-blue-500/10',
      skills: ['Arduino', 'ESP32/ESP8266', 'Raspberry Pi', 'Sensors & Actuators', 'Circuit Design', 'PCB Design']
    },
    {
      title: 'Robotics',
      icon: <Bot size={22} />,
      iconColorClass: 'text-emerald-400',
      glow: 'group-hover:bg-emerald-500/10',
      skills: ['RobotDK', 'Webots', 'RoboGuide', 'Linux', 'Arduino IDE']
    },
    {
      title: 'Programming Languages',
      icon: <Code2 size={22} />,
      iconColorClass: 'text-purple-400',
      glow: 'group-hover:bg-purple-500/10',
      skills: ['JavaScript', 'TypeScript', 'Python', 'C/C++', 'Java', 'Kotlin']
    },
    {
      title: 'Web Development',
      icon: <Globe size={22} />,
      iconColorClass: 'text-sky-400',
      glow: 'group-hover:bg-sky-500/10',
      skills: ['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs', 'Tailwind CSS']
    },
    {
      title: 'Mobile Development',
      icon: <Smartphone size={22} />,
      iconColorClass: 'text-orange-400',
      glow: 'group-hover:bg-orange-500/10',
      skills: ['Android Studio', 'React Native', 'Firebase', 'Material Design']
    },
    {
      title: 'IoT & Comm',
      icon: <Radio size={22} />,
      iconColorClass: 'text-rose-400',
      glow: 'group-hover:bg-rose-500/10',
      skills: ['MQTT', 'WebSockets', 'Bluetooth', 'Wi-Fi', 'LoRa', 'HTTP/HTTPS']
    },
    {
      title: 'Tools & Platforms',
      icon: <Wrench size={22} />,
      iconColorClass: 'text-zinc-400',
      glow: 'group-hover:bg-zinc-500/10',
      skills: ['Git', 'VS Code', 'Docker', 'Linux', 'Postman']
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden pb-24">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
      </div>

      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="max-w-2xl">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-semibold mb-6">
              <Cpu size={16} />
              Technical Arsenal
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Skills</span>
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              A comprehensive breakdown of the technologies, languages, and tools I use to bridge the gap between hardware and software.
            </p>
          </div>

          <button
            onClick={() => setIsAiModalOpen(true)}
            className="group flex items-center gap-2 px-5 py-2.5 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/60 hover:border-emerald-500/50 text-zinc-300 hover:text-emerald-400 rounded-xl transition-all duration-300 backdrop-blur-sm shadow-lg"
          >
            <Sparkles size={18} className="text-yellow-400 group-hover:animate-pulse" />
            <span className="font-semibold text-sm">AI Skill Explainer</span>
          </button>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`group relative bg-zinc-900/40 hover:bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-600/80 rounded-3xl p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 overflow-hidden animate-fade-up`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={`absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none ${category.glow}`} />
              
              <div className="relative z-10">
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-xl bg-zinc-800/80 border border-zinc-700/50 ${category.iconColorClass} group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-zinc-200 transition-colors">
                    {category.title}
                  </h3>
                </div>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="px-3 py-1.5 bg-zinc-950/80 border border-zinc-800/80 rounded-lg text-sm font-medium text-zinc-300 hover:border-zinc-600 hover:text-white transition-colors cursor-default"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continuous Learning Banner */}
        <div className="mt-12 relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20 p-8 md:p-12 text-center group hover:border-blue-500/40 transition-colors duration-500">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
           <div className="relative z-10 max-w-2xl mx-auto">
             <div className="w-16 h-16 mx-auto bg-blue-500/10 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
               <Sparkles size={28} className="text-blue-400" />
             </div>
             <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Continuous Learning</h3>
             <p className="text-zinc-400 text-lg leading-relaxed">
               The tech landscape is always evolving. I am constantly exploring new paradigms, improving my embedded C++ routines, and adopting the latest web frameworks to build better, faster, and more robust systems.
             </p>
           </div>
        </div>
      </div>

      <AiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        title="AI Skill Explainer"
        placeholder="Enter a skill or technology name (e.g. MQTT, React)..."
        submitButtonText="Explain Skill"
        onSubmit={explainSkill}
      />
    </div>
  );
};
