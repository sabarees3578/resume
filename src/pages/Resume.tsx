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
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none no-print">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 print:pt-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14 border-b border-zinc-800 print:border-zinc-300 pb-10 print:pb-6">
          <div className="max-w-2xl">
            <div className="no-print inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-semibold mb-5">
              <FileText size={16} />
              Professional History
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-3 print:text-3xl print:text-black">
              <span className="hidden print:inline">Sabarees Rajendran — </span>
              <span className="print:hidden">My </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 print:text-black">
                Resume
              </span>
            </h1>
            <p className="text-zinc-400 print:text-zinc-700 text-lg print:text-sm leading-relaxed">
              A detailed timeline of my professional experience, academic background, and technical certifications.
            </p>
            <p className="hidden print:block text-xs text-zinc-600 mt-2">
              Email: {CONTACT_EMAIL} • GitHub: github.com/sabarees3578 • LinkedIn: linkedin.com/in/sabarees-rajendran
            </p>
          </div>

          <button
            type="button"
            onClick={handleDownloadPdf}
            className="no-print group relative flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] overflow-hidden"
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
                <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 print:hidden">
                  <Briefcase size={24} />
                </div>
                <h2 className="text-3xl print:text-xl font-bold">Experience</h2>
              </div>

              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-500/50 before:via-zinc-800 before:to-transparent print:before:hidden print:space-y-4">
                {experiences.map((exp) => (
                  <div
                    key={`${exp.company}-${exp.title}`}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group print:block"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-zinc-950 bg-zinc-800 text-zinc-400 group-hover:bg-blue-500 group-hover:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors duration-300 print:hidden">
                      <div className="w-2 h-2 bg-current rounded-full" />
                    </div>

                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] print:w-full p-6 print:p-4 rounded-2xl bg-zinc-900/45 print:bg-white border border-zinc-800/80 print:border-zinc-300 group-hover:border-blue-500/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                      <div className="flex flex-col gap-1 mb-3">
                        <h3 className="text-xl print:text-base font-bold text-white print:text-black group-hover:text-blue-400 transition-colors">
                          {exp.title}
                        </h3>
                        <div className="text-blue-400 print:text-zinc-800 font-semibold">{exp.company}</div>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 print:text-zinc-600 mb-3">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} /> {exp.period}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={14} /> {exp.location}
                        </div>
                      </div>
                      <p className="text-zinc-400 print:text-zinc-700 text-sm leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Education Section */}
            <section>
              <div className="flex items-center gap-4 mb-8 print:mb-4">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 print:hidden">
                  <GraduationCap size={24} />
                </div>
                <h2 className="text-3xl print:text-xl font-bold">Education</h2>
              </div>

              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-emerald-500/50 before:via-zinc-800 before:to-transparent print:before:hidden print:space-y-4">
                {education.map((edu) => (
                  <div
                    key={edu.degree}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group print:block"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-zinc-950 bg-zinc-800 text-zinc-400 group-hover:bg-emerald-500 group-hover:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors duration-300 print:hidden">
                      <div className="w-2 h-2 bg-current rounded-full" />
                    </div>

                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] print:w-full p-6 print:p-4 rounded-2xl bg-zinc-900/45 print:bg-white border border-zinc-800/80 print:border-zinc-300 group-hover:border-emerald-500/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                      <div className="flex flex-col gap-1 mb-3">
                        <h3 className="text-xl print:text-base font-bold text-white print:text-black group-hover:text-emerald-400 transition-colors">
                          {edu.degree}
                        </h3>
                        <div className="text-emerald-400 print:text-zinc-800 font-semibold">{edu.institution}</div>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 print:text-zinc-600 mb-3">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} /> {edu.period}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={14} /> {edu.location}
                        </div>
                      </div>
                      <p className="text-zinc-400 print:text-zinc-700 text-sm leading-relaxed">{edu.description}</p>
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
              <div className="p-6 print:p-4 rounded-3xl bg-zinc-900/45 print:bg-white border border-zinc-800/80 print:border-zinc-300 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6 print:mb-3">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 print:hidden">
                    <Award size={20} />
                  </div>
                  <h3 className="text-xl font-bold print:text-black">Certifications</h3>
                </div>
                <div className="flex flex-col gap-3 print:gap-1.5">
                  {certifications.map((cert) => (
                    <div
                      key={cert}
                      className="group flex items-start gap-3 p-3 print:p-1.5 rounded-xl bg-zinc-950/60 print:bg-transparent border border-zinc-800/60 print:border-0 hover:border-purple-500/30 transition-colors"
                    >
                      <ChevronRight
                        size={16}
                        className="text-zinc-500 group-hover:text-purple-400 mt-0.5 shrink-0 transition-colors print:text-zinc-700"
                      />
                      <span className="text-sm text-zinc-300 print:text-zinc-800 group-hover:text-white transition-colors">
                        {cert}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Contact Panel */}
              <div className="no-print p-6 rounded-3xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 backdrop-blur-sm text-center">
                <h3 className="text-lg font-bold mb-2">Looking to collaborate?</h3>
                <p className="text-zinc-400 text-sm mb-5">
                  Reach out directly for engineering roles, freelance IoT builds, or full-stack projects.
                </p>
                <div className="flex flex-col gap-2.5">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold transition-colors"
                  >
                    <Mail size={15} />
                    Contact Me
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl text-xs font-mono text-zinc-300 transition-colors"
                  >
                    {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    {copiedEmail ? 'Email copied!' : CONTACT_EMAIL}
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
