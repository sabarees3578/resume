import React, { useState } from 'react';
import {
  Download, Briefcase, GraduationCap, Award, Calendar,
  MapPin, ChevronRight, FileText, Mail, Copy, Check, Cpu
} from 'lucide-react';

const CONTACT_EMAIL = 'sabareesgodkiller@gmail.com';

export const Resume: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleDownloadPdf = () => {
    window.print();
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  };

  const initiatives = [
    {
      title: 'Founder & Lead Developer',
      org: 'Godem (godem.in)',
      location: 'Tamil Nadu, India',
      period: 'January 2024 – Present',
      description:
        'Architecting Raw IDE / Godem IDE in Rust and Tauri with Monaco Editor, arduino-cli integration, AI coding workflows, and Docker staging — alongside iotmaker.cloud self-hosted hardware-to-cloud telemetry tooling.',
    },
    {
      title: 'Independent Hardware-to-Cloud Systems Engineer',
      org: 'Mechatronics, Custom CNC & IoT Research',
      location: 'Tamil Nadu, India',
      period: '2022 – Present',
      description:
        'Designing and building custom THT Pick-and-Place CNC hardware (SKR Mini E3, TMC2209, NEMA steppers), multi-layer KiCad PCBs, ESP32/STM32 embedded firmware, OpenCV/MediaPipe robotics, and LoRaWAN/MQTT/TimescaleDB infrastructure.',
    },
  ];

  const coreSkills = [
    {
      group: 'Full-Stack & Desktop',
      items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL', 'TimescaleDB', 'Firebase', 'Rust', 'Tauri', 'Electron', 'Python', 'C#', '.NET 10'],
    },
    {
      group: 'Embedded, IoT & Hardware',
      items: ['ESP32 / ESP32-C3', 'ESP8266', 'Arduino', 'Raspberry Pi 4/5', 'STM32 / STM8', 'KiCad PCB Design', 'THT & SMT Soldering', 'CNC & Robotics Kinematics (TMC2209, SKR Mini E3, Mach3)'],
    },
    {
      group: 'IoT Protocols & Self-Hosted Infra',
      items: ['LoRaWAN (ChirpStack, TTN)', 'MQTT', 'WebSockets', 'HTTP/HTTPS', 'KNX', 'Docker', 'Linux (Arch / Hyprland)', 'Coolify', 'Poste.io', 'GitHub Actions'],
    },
    {
      group: 'AI, Vision & Interactive',
      items: ['OpenCV', 'MediaPipe', 'Godot Engine (C#)', 'Blender', 'Monaco Editor / Custom IDE & DSL Tooling'],
    },
  ];

  const education = [
    {
      degree: "Bachelor's Degree (B.E.), Mechatronics, Robotics, and Automation Engineering",
      institution: 'Kongu Engineering College',
      location: 'Tamil Nadu, India',
      period: 'January 2023 – April 2026',
      description: 'Focused on embedded systems, robotics kinematics, IoT instrumentation, and automation.',
    },
    {
      degree: 'Diploma of Education, Mechatronics, Robotics, and Automation Engineering',
      institution: 'The Kongu Polytechnic College',
      location: 'Tamil Nadu, India',
      period: 'August 2020 – March 2023',
      description: 'Foundational engineering studies in mechatronics, electronics, and mechanical systems.',
    },
  ];

  const credentials = [
    'IEEE Xplore Published Researcher — "Design and Fabrication of Shrub Trimming Bot on Roadside Using IoT"',
    'Creator of Raw IDE / Godem IDE (Rust + Tauri + Monaco + arduino-cli) & iotmaker.cloud',
    'Custom THT Pick-and-Place CNC & KiCad PCB Fabrication',
    'Self-Hosted Infrastructure (Linux Arch / Hyprland, Docker, Coolify, ChirpStack, TimescaleDB)',
  ];

  return (
    <div className="min-h-screen bg-transparent text-white print:bg-white print:text-black relative overflow-hidden pb-24 print:pb-0">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 print:pt-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14 border-b border-white/15 print:border-zinc-300 pb-10 print:pb-6">
          <div className="max-w-2xl">
            <div className="no-print inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/15 border border-white/25 rounded-full text-cyan-200 text-sm font-semibold mb-5">
              <FileText size={16} />
              Professional History
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-3 print:text-3xl print:text-black drop-shadow-[0_4px_20px_rgba(15,23,42,0.5)]">
              <span className="hidden print:inline">Sabarees Rajendran — </span>
              <span className="print:hidden">My </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-amber-200 print:text-black">
                Resume
              </span>
            </h1>
            <p className="text-white/95 print:text-zinc-700 text-base sm:text-lg print:text-sm leading-relaxed drop-shadow-[0_2px_8px_rgba(15,23,42,0.55)]">
              Independent Hardware-to-Cloud Systems Engineer, Founder @ Godem, Mechatronics builder, and IEEE-published IoT researcher.
            </p>
            <p className="hidden print:block text-xs text-zinc-600 mt-2">
              Email: {CONTACT_EMAIL} • GitHub: github.com/sabarees3578 • LinkedIn: linkedin.com/in/sabarees-rajendran
            </p>
          </div>

          <button
            type="button"
            onClick={handleDownloadPdf}
            className="no-print group relative flex items-center gap-3 px-6 py-3 bg-white hover:bg-amber-100 text-indigo-950 font-extrabold rounded-xl transition-all duration-300 shadow-[0_10px_28px_rgba(15,23,42,0.28)] overflow-hidden"
          >
            <Download size={20} className="relative z-10 group-hover:-translate-y-0.5 group-hover:scale-110 transition-transform duration-300" />
            <span className="relative z-10">Download PDF</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 print:block print:space-y-8">
          {/* Main Timeline Column */}
          <div className="lg:col-span-8 space-y-16 print:space-y-8">
            {/* Independent Initiatives Section */}
            <section>
              <div className="flex items-center gap-4 mb-8 print:mb-4">
                <div className="p-3 rounded-2xl bg-white/15 border border-white/25 text-cyan-200 print:hidden">
                  <Briefcase size={24} />
                </div>
                <h2 className="text-2xl sm:text-3xl print:text-xl font-bold">Independent Engineering &amp; Builds</h2>
              </div>

              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-cyan-200/70 before:via-white/35 before:to-transparent print:before:hidden print:space-y-4">
                {initiatives.map((exp) => (
                  <div
                    key={`${exp.org}-${exp.title}`}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group print:block"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-indigo-900/60 bg-indigo-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors duration-300 print:hidden">
                      <div className="w-2 h-2 bg-current rounded-full" />
                    </div>

                    <div className="w-[calc(100%-3.5rem)] sm:w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] print:w-full p-5 sm:p-6 print:p-4 rounded-2xl bg-indigo-950/35 hover:bg-indigo-950/50 print:bg-white border border-white/25 print:border-zinc-300 group-hover:border-white/50 shadow-[0_12px_36px_rgba(15,23,42,0.28)] transition-all duration-300 hover:-translate-y-1">
                      <div className="flex flex-col gap-1 mb-3">
                        <h3 className="text-lg sm:text-xl print:text-base font-bold text-white print:text-black group-hover:text-amber-200 transition-colors">
                          {exp.title}
                        </h3>
                        <div className="text-cyan-200 print:text-zinc-800 font-semibold">{exp.org}</div>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono text-white/80 print:text-zinc-600 mb-3">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} /> {exp.period}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={14} /> {exp.location}
                        </div>
                      </div>
                      <p className="text-white/90 print:text-zinc-700 text-sm leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Core Technical Stack Summary */}
            <section>
              <div className="flex items-center gap-4 mb-6 print:mb-4">
                <div className="p-3 rounded-2xl bg-white/15 border border-white/25 text-purple-200 print:hidden">
                  <Cpu size={24} />
                </div>
                <h2 className="text-2xl sm:text-3xl print:text-xl font-bold">Core Technical Stack</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 print:grid-cols-2 print:gap-3">
                {coreSkills.map((category) => (
                  <div
                    key={category.group}
                    className="p-5 print:p-3 rounded-2xl bg-indigo-950/35 print:bg-white border border-white/25 print:border-zinc-300 shadow-[0_10px_30px_rgba(15,23,42,0.25)]"
                  >
                    <h3 className="text-sm font-bold text-amber-200 print:text-black uppercase tracking-wider mb-3">
                      {category.group}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {category.items.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-md bg-white/12 print:bg-zinc-100 border border-white/20 print:border-zinc-300 text-xs text-white print:text-zinc-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Education Section */}
            <section>
              <div className="flex items-center gap-4 mb-8 print:mb-4">
                <div className="p-3 rounded-2xl bg-white/15 border border-white/25 text-emerald-200 print:hidden">
                  <GraduationCap size={24} />
                </div>
                <h2 className="text-2xl sm:text-3xl print:text-xl font-bold">Education</h2>
              </div>

              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-emerald-300/70 before:via-white/35 before:to-transparent print:before:hidden print:space-y-4">
                {education.map((edu) => (
                  <div
                    key={edu.degree}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group print:block"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-indigo-900/60 bg-emerald-600 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors duration-300 print:hidden">
                      <div className="w-2 h-2 bg-current rounded-full" />
                    </div>

                    <div className="w-[calc(100%-3.5rem)] sm:w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] print:w-full p-5 sm:p-6 print:p-4 rounded-2xl bg-indigo-950/35 hover:bg-indigo-950/50 print:bg-white border border-white/25 print:border-zinc-300 group-hover:border-white/50 shadow-[0_12px_36px_rgba(15,23,42,0.28)] transition-all duration-300 hover:-translate-y-1">
                      <div className="flex flex-col gap-1 mb-3">
                        <h3 className="text-lg sm:text-xl print:text-base font-bold text-white print:text-black group-hover:text-emerald-200 transition-colors">
                          {edu.degree}
                        </h3>
                        <div className="text-emerald-200 print:text-zinc-800 font-semibold">{edu.institution}</div>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono text-white/80 print:text-zinc-600 mb-3">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} /> {edu.period}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={14} /> {edu.location}
                        </div>
                      </div>
                      <p className="text-white/90 print:text-zinc-700 text-sm leading-relaxed">{edu.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-8 print:static print:space-y-4">
              {/* Research & Key Builds Panel */}
              <div className="p-6 print:p-4 rounded-3xl bg-indigo-950/35 print:bg-white border border-white/25 print:border-zinc-300 shadow-[0_12px_36px_rgba(15,23,42,0.28)]">
                <div className="flex items-center gap-3 mb-6 print:mb-3">
                  <div className="p-2 rounded-xl bg-white/15 border border-white/25 text-amber-200 print:hidden">
                    <Award size={20} />
                  </div>
                  <h3 className="text-xl font-bold print:text-black">Research &amp; Highlights</h3>
                </div>
                <div className="flex flex-col gap-3 print:gap-1.5">
                  {credentials.map((cert) => (
                    <div
                      key={cert}
                      className="group flex items-start gap-3 p-3 print:p-1.5 rounded-xl bg-white/12 print:bg-transparent border border-white/20 print:border-0 hover:border-white/45 transition-colors"
                    >
                      <ChevronRight
                        size={16}
                        className="text-cyan-200 group-hover:text-white mt-0.5 shrink-0 transition-colors print:text-zinc-700"
                      />
                      <span className="text-sm text-white/95 print:text-zinc-800 transition-colors">
                        {cert}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Contact Panel */}
              <div className="no-print p-6 rounded-3xl bg-indigo-950/35 border border-white/25 shadow-[0_16px_40px_rgba(15,23,42,0.28)] text-center">
                <h3 className="text-lg font-bold mb-2">Looking to collaborate?</h3>
                <p className="text-white/90 text-sm mb-5">
                  Reach out directly for R&amp;D collaborations, hardware-to-cloud builds, or technical partnerships.
                </p>
                <div className="flex flex-col gap-2.5">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white hover:bg-amber-100 text-indigo-950 rounded-xl text-sm font-bold transition-all shadow-md"
                  >
                    <Mail size={15} />
                    Contact Me
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 border rounded-xl font-sans text-sm font-medium transition-colors ${
                      copiedEmail
                        ? 'bg-emerald-500/25 border-emerald-300/60 text-emerald-100'
                        : 'bg-white/15 hover:bg-white/25 border-white/25 text-white'
                    }`}
                  >
                    {copiedEmail ? <Check size={14} className="text-emerald-200" /> : <Copy size={14} />}
                    {copiedEmail ? 'Copied!' : CONTACT_EMAIL}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
