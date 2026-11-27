import React, { useState } from 'react';
import {
  Download, Briefcase, GraduationCap, Award, Calendar,
  MapPin, ChevronRight, FileText, Mail, Copy, Check
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

  const experiences = [
    {
      title: 'Founder & Lead Developer',
      company: 'godem.in',
      location: 'Dharapuram, Tamil Nadu, India',
      period: 'January 2024 – Present',
      description:
        'Building and scaling Godem, an open-source, AI-integrated IDE and IoT platform designed for hobbyists and makers. Designing system architecture, UI/UX, and establishing developer tooling from silicon to cloud.',
    },
    {
      title: 'Technical Engineer',
      company: 'Enthu Technology Solutions India Pvt Ltd',
      location: 'Coimbatore, Tamil Nadu',
      period: 'March 2025 – July 2026',
      description:
        'IoT Integration & Deployment. Configured and deployed LoRaWAN gateways and end-nodes, ensuring robust long-range connectivity for industrial IoT applications. Managed the communication bridge between hardware and the ChirpStack network server, optimizing data packets for reliability, and developed software interfaces to visualize real-time sensor data.',
    },
  ];

  const education = [
    {
      degree: "Bachelor's Degree, Mechatronics, Robotics, and Automation Engineering",
      institution: 'Kongu Engineering College',
      location: 'Tamil Nadu, India',
      period: 'January 2023 – April 2026',
      description: 'Focusing on advanced embedded systems, robotics, and automation technologies.',
    },
    {
      degree: 'Diploma of Education, Mechatronics, Robotics, and Automation Engineering',
      institution: 'The Kongu Polytechnic College',
      location: 'Tamil Nadu, India',
      period: 'August 2020 – March 2023',
      description: 'Foundational studies in mechatronics, electronics, and mechanical systems.',
    },
  ];

  const certifications = [
    'Advanced Embedded Systems & IoT',
    'Full-Stack Web Development Bootcamp',
    'AWS Certified Cloud Practitioner',
    'Industrial Robotics & Automation',
  ];

  return (
    <div className="min-h-screen bg-transparent text-white print:bg-white print:text-black relative overflow-hidden pb-24 print:pb-0">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 print:pt-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14 border-b border-white/15 print:border-zinc-300 pb-10 print:pb-6">
          <div className="max-w-2xl">
            <div className="no-print inline-flex items-center gap-2 px-3.5 py-1.5 bg-zinc-950/80 border border-white/20 rounded-full text-cyan-200 text-sm font-semibold mb-5">
              <FileText size={16} />
              Professional History
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-3 print:text-3xl print:text-black drop-shadow-[0_4px_20px_rgba(0,0,0,0.65)]">
              <span className="hidden print:inline">Sabarees Rajendran — </span>
              <span className="print:hidden">My </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-amber-200 print:text-black">
                Resume
              </span>
            </h1>
            <p className="text-white/90 print:text-zinc-700 text-base sm:text-lg print:text-sm leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)]">
              A detailed timeline of my professional experience, academic background, and technical certifications.
            </p>
            <p className="hidden print:block text-xs text-zinc-600 mt-2">
              Email: {CONTACT_EMAIL} • GitHub: github.com/sabarees3578 • LinkedIn: linkedin.com/in/sabarees-rajendran
            </p>
          </div>

          <button
            type="button"
            onClick={handleDownloadPdf}
            className="no-print group relative flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 border border-indigo-400/35 text-white font-bold rounded-xl transition-all duration-300 shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:shadow-[0_0_32px_rgba(129,140,248,0.6)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <Download size={20} className="relative z-10 group-hover:-translate-y-0.5 group-hover:scale-110 transition-transform duration-300" />
            <span className="relative z-10">Download PDF</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 print:block print:space-y-8">
          {/* Main Timeline Column */}
          <div className="lg:col-span-8 space-y-16 print:space-y-8">
            {/* Experience Section */}
            <section>
              <div className="flex items-center gap-4 mb-8 print:mb-4">
                <div className="p-3 rounded-2xl bg-zinc-950/85 border border-white/20 text-cyan-300 print:hidden">
                  <Briefcase size={24} />
                </div>
                <h2 className="text-2xl sm:text-3xl print:text-xl font-bold">Experience</h2>
              </div>

              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-cyan-300/60 before:via-indigo-300/30 before:to-transparent print:before:hidden print:space-y-4">
                {experiences.map((exp) => (
                  <div
                    key={`${exp.company}-${exp.title}`}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group print:block"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-zinc-950 bg-indigo-900 text-cyan-200 group-hover:bg-indigo-500 group-hover:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors duration-300 print:hidden">
                      <div className="w-2 h-2 bg-current rounded-full" />
                    </div>

                    <div className="w-[calc(100%-3.5rem)] sm:w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] print:w-full p-5 sm:p-6 print:p-4 rounded-2xl bg-zinc-950/80 hover:bg-zinc-950/95 print:bg-white border border-white/15 print:border-zinc-300 group-hover:border-cyan-300/50 shadow-[0_12px_36px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1">
                      <div className="flex flex-col gap-1 mb-3">
                        <h3 className="text-lg sm:text-xl print:text-base font-bold text-white print:text-black group-hover:text-cyan-200 transition-colors">
                          {exp.title}
                        </h3>
                        <div className="text-cyan-200 print:text-zinc-800 font-semibold">{exp.company}</div>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono text-zinc-300 print:text-zinc-600 mb-3">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} /> {exp.period}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={14} /> {exp.location}
                        </div>
                      </div>
                      <p className="text-zinc-200/90 print:text-zinc-700 text-sm leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Education Section */}
            <section>
              <div className="flex items-center gap-4 mb-8 print:mb-4">
                <div className="p-3 rounded-2xl bg-zinc-950/85 border border-white/20 text-emerald-300 print:hidden">
                  <GraduationCap size={24} />
                </div>
                <h2 className="text-2xl sm:text-3xl print:text-xl font-bold">Education</h2>
              </div>

              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-emerald-400/60 before:via-indigo-300/30 before:to-transparent print:before:hidden print:space-y-4">
                {education.map((edu) => (
                  <div
                    key={edu.degree}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group print:block"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-zinc-950 bg-indigo-900 text-emerald-300 group-hover:bg-emerald-500 group-hover:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors duration-300 print:hidden">
                      <div className="w-2 h-2 bg-current rounded-full" />
                    </div>

                    <div className="w-[calc(100%-3.5rem)] sm:w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] print:w-full p-5 sm:p-6 print:p-4 rounded-2xl bg-zinc-950/80 hover:bg-zinc-950/95 print:bg-white border border-white/15 print:border-zinc-300 group-hover:border-emerald-400/50 shadow-[0_12px_36px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1">
                      <div className="flex flex-col gap-1 mb-3">
                        <h3 className="text-lg sm:text-xl print:text-base font-bold text-white print:text-black group-hover:text-emerald-300 transition-colors">
                          {edu.degree}
                        </h3>
                        <div className="text-emerald-300 print:text-zinc-800 font-semibold">{edu.institution}</div>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono text-zinc-300 print:text-zinc-600 mb-3">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} /> {edu.period}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={14} /> {edu.location}
                        </div>
                      </div>
                      <p className="text-zinc-200/90 print:text-zinc-700 text-sm leading-relaxed">{edu.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-8 print:static print:space-y-4">
              {/* Certifications Panel */}
              <div className="p-6 print:p-4 rounded-3xl bg-zinc-950/80 print:bg-white border border-white/15 print:border-zinc-300 shadow-[0_12px_36px_rgba(0,0,0,0.45)]">
                <div className="flex items-center gap-3 mb-6 print:mb-3">
                  <div className="p-2 rounded-xl bg-purple-500/15 border border-purple-400/25 text-purple-300 print:hidden">
                    <Award size={20} />
                  </div>
                  <h3 className="text-xl font-bold print:text-black">Certifications</h3>
                </div>
                <div className="flex flex-col gap-3 print:gap-1.5">
                  {certifications.map((cert) => (
                    <div
                      key={cert}
                      className="group flex items-start gap-3 p-3 print:p-1.5 rounded-xl bg-zinc-900/90 print:bg-transparent border border-white/10 print:border-0 hover:border-cyan-300/40 transition-colors"
                    >
                      <ChevronRight
                        size={16}
                        className="text-indigo-300/80 group-hover:text-cyan-200 mt-0.5 shrink-0 transition-colors print:text-zinc-700"
                      />
                      <span className="text-sm text-zinc-200 print:text-zinc-800 group-hover:text-white transition-colors">
                        {cert}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Contact Panel */}
              <div className="no-print p-6 rounded-3xl bg-zinc-950/85 border border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.45)] text-center">
                <h3 className="text-lg font-bold mb-2">Looking to collaborate?</h3>
                <p className="text-zinc-300 text-sm mb-5">
                  Reach out directly for engineering roles, freelance IoT builds, or full-stack projects.
                </p>
                <div className="flex flex-col gap-2.5">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl text-sm font-semibold transition-all shadow-[0_0_20px_rgba(99,102,241,0.35)]"
                  >
                    <Mail size={15} />
                    Contact Me
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 border rounded-xl font-sans text-sm font-medium transition-colors ${
                      copiedEmail
                        ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-200'
                        : 'bg-zinc-900/90 hover:bg-zinc-800 border-white/15 hover:border-indigo-300/45 text-zinc-100'
                    }`}
                  >
                    {copiedEmail ? <Check size={14} className="text-emerald-300" /> : <Copy size={14} />}
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
