import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { AiModal } from '../components/AiModal';
import { Sparkles } from 'lucide-react';
import { explainSkill } from '../lib/gemini';

export const Skills: React.FC = () => {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const skillCategories = [
    {
      category: 'Hardware & IoT',
      variant: 'blue' as const,
      skills: ['Arduino', 'ESP32/ESP8266', 'Raspberry Pi', 'Sensors & Actuators', 'Circuit Design', 'PCB Design']
    },
    {
      category: 'Programming Languages',
      variant: 'purple' as const,
      skills: ['JavaScript', 'TypeScript', 'Python', 'C/C++', 'Java', 'Kotlin']
    },
    {
      category: 'Web Development',
      variant: 'white' as const,
      skills: ['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs']
    },
    {
      category: 'Mobile Development',
      variant: 'blue' as const,
      skills: ['Android Studio', 'React Native', 'Firebase', 'Material Design']
    },
    {
      category: 'IoT & Communication',
      variant: 'purple' as const,
      skills: ['MQTT', 'WebSockets', 'Bluetooth', 'Wi-Fi', 'LoRa', 'HTTP/HTTPS']
    },
    {
      category: 'Tools & Platforms',
      variant: 'white' as const,
      skills: ['Git', 'VS Code', 'Docker', 'Linux', 'Arduino IDE', 'Postman','RoboDB','Webbot]
    },
     {
      category: 'Robotics',
      variant: 'white' as const,
      skills: ['Robotdk', 'Webot', 'Roboguide', 'Linux', 'Arduino IDE']
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h1 className="text-5xl font-bold text-white mb-4">Skills</h1>
            <p className="text-zinc-400 text-lg">
              Technologies and tools I work with across hardware and software
            </p>
          </div>

          <Button
            variant="primary"
            onClick={() => setIsAiModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Sparkles size={20} />
            AI Skill Explainer
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <Card key={index} variant={category.variant}>
              <h3 className="text-2xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                {category.category}
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="bg-black text-white px-3 py-2 font-bold text-sm border-2 border-black text-center"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <Card variant="blue" className="mt-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-black mb-3">Continuous Learning</h3>
            <p className="text-black text-lg">
              Always exploring new technologies and improving my skills in embedded systems,
              IoT, and modern web development frameworks.
            </p>
          </div>
        </Card>
      </div>

      <AiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        title="AI Skill Explainer"
        placeholder="Enter a skill or technology name..."
        submitButtonText="Explain Skill"
        onSubmit={explainSkill}
      />
    </div>
  );
};
