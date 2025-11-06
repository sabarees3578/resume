import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Download, Briefcase, GraduationCap, Award } from 'lucide-react';

export const Resume: React.FC = () => {
  const experiences = [
    {
      title: 'IoT Developer',
      company: 'Tech Solutions',
      period: '2023 - Present',
      description: 'Developing IoT solutions and embedded systems for industrial applications.'
    },
    {
      title: 'Full-Stack Developer',
      company: 'Web Innovations',
      period: '2022 - 2023',
      description: 'Built responsive web applications using React, Node.js, and MongoDB.'
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Engineering',
      institution: 'Technology University',
      period: '2019 - 2023',
      description: 'Computer Science and Engineering'
    }
  ];

  const certifications = [
    'Arduino Certification',
    'Full-Stack Web Development',
    'IoT Fundamentals',
    'Android App Development'
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h1 className="text-5xl font-bold text-white mb-4">Resume</h1>
            <p className="text-zinc-400 text-lg">
              My professional experience and qualifications
            </p>
          </div>

          <Button variant="primary" className="flex items-center gap-2">
            <Download size={20} />
            Download PDF
          </Button>
        </div>

        <div className="space-y-8">
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="text-blue-500" size={32} />
              <h2 className="text-3xl font-bold text-white">Experience</h2>
            </div>

            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <Card key={index} variant="blue">
                  <h3 className="text-2xl font-bold text-black mb-1">{exp.title}</h3>
                  <p className="text-black font-bold mb-2">{exp.company}</p>
                  <p className="text-black text-sm mb-3 font-mono">{exp.period}</p>
                  <p className="text-black">{exp.description}</p>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="text-purple-500" size={32} />
              <h2 className="text-3xl font-bold text-white">Education</h2>
            </div>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <Card key={index} variant="purple">
                  <h3 className="text-2xl font-bold text-black mb-1">{edu.degree}</h3>
                  <p className="text-black font-bold mb-2">{edu.institution}</p>
                  <p className="text-black text-sm mb-3 font-mono">{edu.period}</p>
                  <p className="text-black">{edu.description}</p>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <Award className="text-white" size={32} />
              <h2 className="text-3xl font-bold text-white">Certifications</h2>
            </div>

            <Card variant="white">
              <div className="grid md:grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="bg-black text-white px-4 py-3 font-bold border-2 border-black flex items-center gap-2"
                  >
                    <Award size={18} />
                    {cert}
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};
