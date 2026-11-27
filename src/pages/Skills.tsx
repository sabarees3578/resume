import React, { useState, useMemo } from 'react';
import { AiModal } from '../components/AiModal';
import { Sparkles, Cpu, Code2, Server, Bot, Search, X } from 'lucide-react';
import { explainSkill } from '../lib/gemini';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  iconColorClass: string;
  glow: string;
  skills: string[];
}

const CATEGORIES: SkillCategory[] = [
  {
    title: 'Full-Stack & Desktop',
    icon: <Code2 size={22} />,
    iconColorClass: 'text-purple-400',
    glow: 'group-hover:bg-purple-500/10',
    skills: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'PostgreSQL',
      'TimescaleDB',
      'Firebase',
      'Rust',
      'Tauri',
      'Electron',
      'Python',
      'C#',
      '.NET 10',
    ],
  },
  {
    title: 'Embedded, IoT & Hardware',
    icon: <Cpu size={22} />,
    iconColorClass: 'text-blue-400',
    glow: 'group-hover:bg-blue-500/10',
    skills: [
      'ESP32 / ESP32-C3',
      'ESP8266',
      'Arduino',
      'Raspberry Pi 4/5',
      'STM32 / STM8',
      'KiCad PCB Design',
      'THT & SMT Soldering',
      'CNC & Robotics Kinematics (TMC2209, SKR Mini E3, Mach3)',
    ],
  },
  {
    title: 'IoT Protocols & Self-Hosted Infra',
    icon: <Server size={22} />,
    iconColorClass: 'text-cyan-300',
    glow: 'group-hover:bg-cyan-500/10',
    skills: [
      'LoRaWAN (ChirpStack, TTN)',
      'MQTT',
      'WebSockets',
      'HTTP/HTTPS',
      'KNX',
      'Docker',
      'Linux (Arch / Hyprland)',
      'Coolify',
      'Poste.io',
      'GitHub Actions',
    ],
  },
  {
    title: 'AI, Vision & Interactive',
    icon: <Bot size={22} />,
    iconColorClass: 'text-emerald-400',
    glow: 'group-hover:bg-emerald-500/10',
    skills: [
      'OpenCV',
      'MediaPipe',
      'Godot Engine (C#)',
      'Blender',
      'Monaco Editor / Custom IDE & DSL Tooling',
    ],
  },
];

export const Skills: React.FC = () => {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return CATEGORIES;

    return CATEGORIES.map((cat) => {
      const catMatch = cat.title.toLowerCase().includes(q);
      const matchingSkills = catMatch
        ? cat.skills
        : cat.skills.filter((s) => s.toLowerCase().includes(q));
      return { ...cat, skills: matchingSkills };
    }).filter((cat) => cat.skills.length > 0);
  }, [searchQuery]);

  const totalSkillsCount = useMemo(
    () => CATEGORIES.reduce((sum, c) => sum + c.skills.length, 0),
    []
  );

  const openSkillExplainer = (skillName = '') => {
    setSelectedSkill(skillName);
    setIsAiModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-transparent text-white relative overflow-hidden pb-24">
      {/* Subtle Dot Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-950/55 border border-white/25 rounded-full text-cyan-200 text-sm font-semibold mb-5">
              <Cpu size={16} />
              Technical Arsenal • {totalSkillsCount} Skills
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-[0_4px_20px_rgba(15,23,42,0.65)]">
              My{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-amber-200">
                Skills
              </span>
            </h1>
            <p className="text-white/95 text-base sm:text-lg leading-relaxed drop-shadow-[0_2px_8px_rgba(15,23,42,0.75)]">
              Click any skill pill below to inspect how it fits into hardware-software engineering, or filter the stack.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openSkillExplainer('')}
            className="group flex items-center gap-2 px-5 py-2.5 bg-indigo-950/55 hover:bg-indigo-950/75 border border-white/25 hover:border-cyan-200/60 text-white rounded-xl transition-all duration-300 shadow-lg"
          >
            <Sparkles size={18} className="text-amber-200 group-hover:animate-pulse" />
            <span className="font-semibold text-sm">AI Skill Explainer</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="mb-10 max-w-md relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-100/80" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter skills (e.g. ESP32, React, MQTT)..."
            aria-label="Filter skills"
            className="w-full pl-10 pr-9 py-2.5 bg-indigo-950/55 border border-white/25 focus:border-white/60 rounded-xl text-sm text-white placeholder:text-indigo-100/70 focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear filter"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Skills Grid */}
        {filteredCategories.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredCategories.map((category, index) => (
              <div
                key={category.title}
                className="group relative bg-indigo-950/55 hover:bg-indigo-950/75 border border-white/25 hover:border-white/45 rounded-3xl p-5 sm:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_16px_40px_rgba(15,23,42,0.38)] transition-all duration-300 hover:-translate-y-1 overflow-hidden animate-fade-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${category.glow}`} />

                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`p-3 rounded-xl bg-white/15 border border-white/25 ${category.iconColorClass} group-hover:scale-110 transition-transform duration-500 shadow-inner`}
                      >
                        {category.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white">{category.title}</h3>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/15 border border-white/20 text-xs font-mono font-semibold text-white">
                      {category.skills.length}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => openSkillExplainer(skill)}
                        title={`Explain ${skill} with AI`}
                        className="px-3 py-1.5 bg-white/12 hover:bg-white/25 border border-white/20 hover:border-white/50 rounded-lg text-sm font-medium text-white transition-all cursor-pointer"
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-white/25 bg-indigo-950/55 p-10 text-center max-w-lg mx-auto">
            <h3 className="text-lg font-bold text-white mb-2">No skills match &ldquo;{searchQuery}&rdquo;</h3>
            <p className="text-sm text-white/90 mb-5">Try another keyword or clear the search filter.</p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="px-5 py-2 rounded-xl bg-white hover:bg-amber-100 text-indigo-950 text-sm font-bold transition-colors"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* Continuous Learning Banner */}
        <div className="mt-14 relative overflow-hidden rounded-3xl bg-indigo-950/55 border border-white/25 p-8 md:p-12 text-center group hover:border-white/45 transition-colors duration-500 shadow-[0_24px_60px_rgba(15,23,42,0.4)]">
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="w-16 h-16 mx-auto bg-white/15 border border-white/25 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
              <Sparkles size={28} className="text-cyan-200" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Hardware-to-Cloud Craft</h3>
            <p className="text-white/90 text-base sm:text-lg leading-relaxed">
              From soldering custom KiCad boards and tuning TMC2209 steppers to shipping Rust + Tauri desktop IDEs and self-hosted TimescaleDB stacks — I build the complete engineering pipeline end to end.
            </p>
          </div>
        </div>
      </div>

      <AiModal
        isOpen={isAiModalOpen}
        onClose={() => {
          setIsAiModalOpen(false);
          setSelectedSkill('');
        }}
        title="AI Skill Explainer"
        placeholder="Enter a skill or technology name (e.g. Rust, KiCad, MQTT)..."
        submitButtonText="Explain Skill"
        onSubmit={explainSkill}
        initialInput={selectedSkill}
        suggestions={['Rust', 'KiCad PCB Design', 'LoRaWAN (ChirpStack, TTN)', 'TimescaleDB']}
      />
    </div>
  );
};
