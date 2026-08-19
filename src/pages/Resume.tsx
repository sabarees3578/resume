import React, { useState, useEffect } from 'react';
import { Download, Briefcase, GraduationCap, Award, Calendar, MapPin, ChevronRight, FileText } from 'lucide-react';

export const Resume: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const experiences = [
    {
      title: 'Founder and lead Developer',
      company: 'godem.in',
      location: 'Dharapuram, Tamil Nadu, India',
      period: 'January 2024 - Present',
      description: 'Building and scaling Godem, an open-source, AI-integrated IDE and IoT platform designed for hobbyists and makers. Designing system architecture, UI/UX, and establishing developer tooling from silicon to cloud.',
      color: 'blue'
    },
    {
      title: 'Technical Engineer',
      company: 'Enthu Technology Solutions India Pvt Ltd',
      location: 'Coimbatore, Tamil Nadu',
      period: 'March 2025 - July 2026',
      description: 'IoT Integration & Deployment. Configured and deployed LoRaWAN gateways and end-nodes, ensuring robust long-range connectivity for industrial IoT applications. Managed the communication bridge between hardware and the ChirpStack network server, optimizing data packets for reliability. Developed software interfaces to visualize real-time sensor data, moving information seamlessly from the physical layer to the end-user application.',
      color: 'purple'
    }
  ];

  const education = [
    {
      degree: "Bachelor's Degree, Mechatronics, Robotics, and Automation Engineering",
      institution: 'Kongu Engineering College',
      location: 'Tamil Nadu, India',
      period: 'January 2023 - April 2026',
      description: 'Focusing on advanced embedded systems, robotics, and automation technologies.',
      color: 'emerald'
    },
    {
      degree: 'Diploma of Education, Mechatronics, Robotics, and Automation Engineering',
      institution: 'The Kongu Polytechnic College',
      location: 'Tamil Nadu, India',
      period: 'August 2020 - March 2023',
      description: 'Foundational studies in mechatronics, electronics, and mechanical systems.',
      color: 'orange'
    }
  ];

  const certifications = [
    'Advanced Embedded Systems & IoT',
    'Full-Stack Web Development Bootcamp',
    'AWS Certified Cloud Practitioner',
    'Industrial Robotics & Automation'
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden pb-24">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      </div>

      <div className={`relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-zinc-800 pb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-semibold mb-6">
              <FileText size={16} />
              Professional History
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Resume</span>
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              A detailed timeline of my professional experience, academic background, and technical certifications.
            </p>
          </div>

          <button className="group relative flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <Download size={20} className="relative z-10 group-hover:-translate-y-1 group-hover:scale-110 transition-transform duration-300" />
            <span className="relative z-10">Download PDF</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Timeline Column */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Experience Section */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
                  <Briefcase size={24} />
                </div>
                <h2 className="text-3xl font-bold">Experience</h2>
              </div>

              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-500/50 before:via-zinc-800 before:to-transparent">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    {/* Timeline Dot */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-zinc-950 bg-zinc-800 text-zinc-500 group-hover:bg-blue-500 group-hover:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors duration-300">
                      <div className="w-2 h-2 bg-current rounded-full" />
                    </div>
                    
                    {/* Content Card */}
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 group-hover:border-blue-500/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                      <div className="flex flex-col gap-1 mb-4">
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{exp.title}</h3>
                        <div className="text-blue-400 font-semibold">{exp.company}</div>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500 mb-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} /> {exp.period}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={14} /> {exp.location}
                        </div>
                      </div>
                      <p className="text-zinc-400 text-sm leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Education Section */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <GraduationCap size={24} />
                </div>
                <h2 className="text-3xl font-bold">Education</h2>
              </div>

              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-emerald-500/50 before:via-zinc-800 before:to-transparent">
                {education.map((edu, index) => (
                  <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    {/* Timeline Dot */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-zinc-950 bg-zinc-800 text-zinc-500 group-hover:bg-emerald-500 group-hover:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors duration-300">
                      <div className="w-2 h-2 bg-current rounded-full" />
                    </div>
                    
                    {/* Content Card */}
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 group-hover:border-emerald-500/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                      <div className="flex flex-col gap-1 mb-4">
                        <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">{edu.degree}</h3>
                        <div className="text-emerald-400 font-semibold">{edu.institution}</div>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500 mb-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} /> {edu.period}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={14} /> {edu.location}
                        </div>
                      </div>
                      <p className="text-zinc-400 text-sm leading-relaxed">{edu.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-8">
              {/* Certifications Panel */}
              <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                    <Award size={20} />
                  </div>
                  <h3 className="text-xl font-bold">Certifications</h3>
                </div>
                <div className="flex flex-col gap-3">
                  {certifications.map((cert, index) => (
                    <div key={index} className="group flex items-start gap-3 p-3 rounded-xl bg-zinc-950/50 border border-zinc-800/50 hover:border-purple-500/30 transition-colors cursor-default">
                      <ChevronRight size={16} className="text-zinc-600 group-hover:text-purple-400 mt-0.5 shrink-0 transition-colors" />
                      <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Contact Panel */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 backdrop-blur-sm text-center">
                <h3 className="text-lg font-bold mb-2">Looking for a full resume?</h3>
                <p className="text-zinc-400 text-sm mb-6">
                  For a more comprehensive look at my background, feel free to reach out directly.
                </p>
                <a href="mailto:sabarees3578@gmail.com" className="inline-block px-6 py-2.5 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl text-sm font-semibold transition-colors">
                  Contact Me
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
