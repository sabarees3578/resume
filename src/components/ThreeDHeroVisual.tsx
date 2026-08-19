import React, { useState, useRef, useEffect } from 'react';
import { Cpu, Wifi, Code, Bot, Smartphone, Zap, Activity } from 'lucide-react';

type NodeId = 'iot' | 'fullstack' | 'robotics' | 'mobile';

interface Node {
  id: NodeId;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
  borderColor: string;
  activeBg: string;
  cx: number; // SVG center x %
  cy: number; // SVG center y %
  techStack: string;
}

const NODES: Node[] = [
  {
    id: 'iot',
    label: 'IoT Firmware',
    sublabel: 'Embedded',
    icon: <Wifi size={16} />,
    color: 'text-blue-400',
    glowColor: 'rgba(59,130,246,0.5)',
    borderColor: 'border-blue-500/50',
    activeBg: 'bg-blue-600 border-blue-400',
    cx: 18, cy: 28,
    techStack: 'ESP32 • Arduino • MQTT • Sensors',
  },
  {
    id: 'fullstack',
    label: 'Full-Stack',
    sublabel: 'Web Dev',
    icon: <Code size={16} />,
    color: 'text-purple-400',
    glowColor: 'rgba(168,85,247,0.5)',
    borderColor: 'border-purple-500/50',
    activeBg: 'bg-purple-600 border-purple-400',
    cx: 82, cy: 28,
    techStack: 'React • Node.js • WebSockets • REST',
  },
  {
    id: 'robotics',
    label: 'Robotics',
    sublabel: 'CAD & Sim',
    icon: <Bot size={16} />,
    color: 'text-emerald-400',
    glowColor: 'rgba(52,211,153,0.5)',
    borderColor: 'border-emerald-500/50',
    activeBg: 'bg-emerald-600 border-emerald-400',
    cx: 18, cy: 78,
    techStack: 'Webots • RobotDK • PCB • 3D Print',
  },
  {
    id: 'mobile',
    label: 'Mobile',
    sublabel: 'Android',
    icon: <Smartphone size={16} />,
    color: 'text-orange-400',
    glowColor: 'rgba(251,146,60,0.5)',
    borderColor: 'border-orange-500/50',
    activeBg: 'bg-orange-600 border-orange-400',
    cx: 82, cy: 78,
    techStack: 'Android Studio • React Native • Firebase',
  },
];

// Animated data packet flowing along an SVG path
const DataPacket: React.FC<{ pathId: string; color: string; duration: number; delay: number }> = ({
  pathId, color, duration, delay,
}) => (
  <circle r="4" fill={color} opacity="0.9">
    <animateMotion
      dur={`${duration}s`}
      begin={`${delay}s`}
      repeatCount="indefinite"
      calcMode="linear"
    >
      <mpath href={`#${pathId}`} />
    </animateMotion>
    <animate attributeName="opacity" values="0;1;1;0" dur={`${duration}s`} begin={`${delay}s`} repeatCount="indefinite" />
    <animate attributeName="r" values="2;4;2" dur={`${duration}s`} begin={`${delay}s`} repeatCount="indefinite" />
  </circle>
);

// Connection line with animated dash and glowing packet
const ConnectionLine: React.FC<{
  fromCx: number; fromCy: number;
  toCx: number; toCy: number;
  id: string;
  color: string;
  packetColor: string;
  active: boolean;
  duration: number;
  delay: number;
}> = ({ fromCx, fromCy, toCx, toCy, id, color, packetColor, active, duration, delay }) => {
  // Midpoint for bezier curve control
  const mx = (fromCx + toCx) / 2;
  const my = (fromCy + toCy) / 2;
  const d = `M ${fromCx} ${fromCy} Q ${mx} ${my + 8} ${toCx} ${toCy}`;

  return (
    <g>
      {/* Base dim line */}
      <path
        id={id}
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={active ? '1.5' : '0.8'}
        strokeOpacity={active ? 0.7 : 0.2}
        strokeDasharray="6 4"
        style={{ transition: 'all 0.4s ease' }}
      >
        <animate
          attributeName="stroke-dashoffset"
          values="0;-20"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </path>
      {/* Glow line when active */}
      {active && (
        <path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeOpacity="0.15"
          filter={`drop-shadow(0 0 4px ${packetColor})`}
        />
      )}
      {/* Moving data packets */}
      <DataPacket pathId={id} color={packetColor} duration={duration} delay={delay} />
      <DataPacket pathId={id} color={packetColor} duration={duration} delay={delay + duration / 2} />
    </g>
  );
};

export const ThreeDHeroVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [activeNode, setActiveNode] = useState<NodeId>('iot');
  const [tick, setTick] = useState(0);

  // Heartbeat tick for live activity
  useEffect(() => {
    const t = setInterval(() => setTick(v => v + 1), 1200);
    return () => clearInterval(t);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const rY = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 14;
    const rX = -((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 14;
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => { setRotateX(0); setRotateY(0); };

  const activeNodeData = NODES.find(n => n.id === activeNode)!;

  // SVG viewBox dimensions
  const VW = 100;
  const VH = 100;
  const chipCx = 50;
  const chipCy = 53;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[440px] select-none"
      style={{ perspective: '900px' }}
    >
      {/* Outer ambient glow */}
      <div
        className="absolute -inset-4 rounded-3xl blur-3xl -z-10 transition-all duration-700"
        style={{ background: `radial-gradient(ellipse at center, ${activeNodeData.glowColor} 0%, transparent 70%)`, opacity: 0.35 }}
      />

      {/* 3D Card */}
      <div
        className="relative w-full bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-700/70 rounded-3xl shadow-2xl backdrop-blur-md overflow-hidden"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.15s ease-out',
          boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 25px 60px rgba(0,0,0,0.7), 0 0 40px ${activeNodeData.glowColor}33`,
        }}
      >
        {/* Dot-grid background */}
        <div className="absolute inset-0 opacity-[0.12]"
          style={{ backgroundImage: 'radial-gradient(#60a5fa 1px, transparent 1px)', backgroundSize: '18px 18px' }} />

        {/* Corner accent marks */}
        {[
          'top-3 left-3 border-t-2 border-l-2',
          'top-3 right-3 border-t-2 border-r-2',
          'bottom-3 left-3 border-b-2 border-l-2',
          'bottom-3 right-3 border-b-2 border-r-2',
        ].map((cls, i) => (
          <div key={i} className={`absolute w-4 h-4 ${cls} border-blue-500/40 rounded-sm`} />
        ))}

        {/* ── Header Bar ── */}
        <div
          className="relative z-10 flex items-center justify-between px-5 py-3.5 border-b border-zinc-800/80"
          style={{ transform: 'translateZ(20px)' }}
        >
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-400" />
            </span>
            <span className="text-[11px] font-mono font-bold text-blue-300 uppercase tracking-[0.15em]">
              Core Architecture
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <Activity size={12} className="animate-pulse" />
              <span className="text-[10px] font-mono">LIVE</span>
            </div>
            <div className="flex gap-1">
              {['bg-red-500','bg-yellow-500','bg-green-500'].map(c => (
                <div key={c} className={`w-2.5 h-2.5 rounded-full ${c} opacity-70`} />
              ))}
            </div>
          </div>
        </div>

        {/* ── SVG Circuit Layer ── */}
        <div className="relative" style={{ transform: 'translateZ(40px)' }}>
          <svg
            viewBox={`0 0 ${VW} ${VH}`}
            className="absolute inset-0 w-full h-full z-10 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ height: '100%', position: 'absolute' }}
          >
            <defs>
              <filter id="glow-blue">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="glow-purple">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Lines from chip to each node */}
            <ConnectionLine fromCx={chipCx} fromCy={chipCy} toCx={NODES[0].cx} toCy={NODES[0].cy}
              id="line-iot"      color="#3b82f6" packetColor="#60a5fa" active={activeNode==='iot'}      duration={2}   delay={0} />
            <ConnectionLine fromCx={chipCx} fromCy={chipCy} toCx={NODES[1].cx} toCy={NODES[1].cy}
              id="line-fs"       color="#a855f7" packetColor="#c084fc" active={activeNode==='fullstack'} duration={2.3} delay={0.4} />
            <ConnectionLine fromCx={chipCx} fromCy={chipCy} toCx={NODES[2].cx} toCy={NODES[2].cy}
              id="line-rob"      color="#34d399" packetColor="#6ee7b7" active={activeNode==='robotics'}  duration={1.8} delay={0.8} />
            <ConnectionLine fromCx={chipCx} fromCy={chipCy} toCx={NODES[3].cx} toCy={NODES[3].cy}
              id="line-mob"      color="#fb923c" packetColor="#fdba74" active={activeNode==='mobile'}    duration={2.1} delay={0.2} />
          </svg>

          {/* ── Chip Container ── */}
          <div className="relative flex flex-col items-center justify-center py-14">
            {/* Orbit rings */}
            <div className="absolute w-48 h-48 rounded-full border border-dashed border-blue-400/20 animate-[spin_22s_linear_infinite]" />
            <div className="absolute w-36 h-36 rounded-full border border-purple-400/20 animate-[spin_14s_linear_infinite_reverse]" />

            {/* Chip */}
            <div
              className="relative z-20 w-28 h-28 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-transform duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                border: `2px solid ${activeNodeData.glowColor}`,
                boxShadow: `0 0 0 1px rgba(255,255,255,0.05), 0 0 30px ${activeNodeData.glowColor}50, inset 0 1px 0 rgba(255,255,255,0.08)`,
                transform: 'translateZ(80px)',
              }}
            >
              {/* Pins - top */}
              <div className="absolute -top-[6px] flex justify-between w-[72px]">
                {[...Array(5)].map((_,i) => <div key={i} className="w-[5px] h-[6px] bg-amber-400/80 rounded-t-sm" />)}
              </div>
              {/* Pins - bottom */}
              <div className="absolute -bottom-[6px] flex justify-between w-[72px]">
                {[...Array(5)].map((_,i) => <div key={i} className="w-[5px] h-[6px] bg-amber-400/80 rounded-b-sm" />)}
              </div>
              {/* Pins - left */}
              <div className="absolute -left-[6px] flex flex-col justify-between h-[64px]">
                {[...Array(4)].map((_,i) => <div key={i} className="h-[5px] w-[6px] bg-amber-400/80 rounded-l-sm" />)}
              </div>
              {/* Pins - right */}
              <div className="absolute -right-[6px] flex flex-col justify-between h-[64px]">
                {[...Array(4)].map((_,i) => <div key={i} className="h-[5px] w-[6px] bg-amber-400/80 rounded-r-sm" />)}
              </div>

              {/* Inner chip surface lines */}
              <div className="absolute inset-3 border border-zinc-600/30 rounded-lg" />
              <div className="absolute inset-5 border border-zinc-700/20 rounded-md" />

              <Cpu size={28} style={{ color: activeNodeData.glowColor }} className="mb-1 transition-colors duration-500" />
              <span className="font-mono font-bold text-white text-[10px] tracking-[0.15em]">SABAREES</span>
              <span className="font-mono text-[8px] text-zinc-500 mt-0.5">MCU-v2026</span>
            </div>

            {/* 4 satellite node badges — positioned around chip via absolute + translate */}
            {NODES.map((node) => {
              const isActive = activeNode === node.id;
              // Place each node in one of 4 corners relative to chip
              const posClass = {
                iot:       'top-5 left-4',
                fullstack: 'top-5 right-4',
                robotics:  'bottom-5 left-4',
                mobile:    'bottom-5 right-4',
              }[node.id];

              return (
                <button
                  key={node.id}
                  onClick={() => setActiveNode(node.id)}
                  className={`absolute z-30 ${posClass} flex flex-col items-center gap-1 px-3 py-2.5 rounded-2xl border-2
                    font-mono text-[10px] cursor-pointer transition-all duration-350 backdrop-blur-sm
                    ${isActive
                      ? `${node.activeBg} text-white shadow-lg`
                      : `bg-zinc-900/70 ${node.borderColor} ${node.color} hover:bg-zinc-800/80`
                    }`}
                  style={{
                    boxShadow: isActive ? `0 0 20px ${node.glowColor}, 0 4px 15px rgba(0,0,0,0.5)` : '0 2px 8px rgba(0,0,0,0.4)',
                    transform: isActive ? 'translateZ(100px) scale(1.08)' : 'translateZ(60px) scale(1)',
                  }}
                >
                  <span className={`transition-colors ${isActive ? 'text-white' : node.color}`}>{node.icon}</span>
                  <span className="font-bold text-[10px] leading-none">{node.label}</span>
                  <span className={`text-[8px] font-normal leading-none ${isActive ? 'text-white/70' : 'text-zinc-500'}`}>{node.sublabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Active tech stack panel ── */}
        <div
          className="relative z-10 mx-4 mb-4 rounded-2xl border border-zinc-700/60 overflow-hidden"
          style={{ transform: 'translateZ(30px)' }}
        >
          {/* Coloured accent bar on left */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[3px] transition-colors duration-500"
            style={{ background: activeNodeData.glowColor }}
          />

          <div className="px-4 py-3 pl-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <Zap size={13} className="flex-shrink-0" style={{ color: activeNodeData.glowColor }} />
              <span className="text-xs text-zinc-300 font-mono truncate">{activeNodeData.techStack}</span>
            </div>
            {/* Heartbeat pulse bar */}
            <div className="flex items-end gap-[3px] flex-shrink-0 h-5">
              {[3,5,2,7,4,6,3,5].map((h, i) => (
                <div
                  key={i}
                  className="w-[3px] rounded-full transition-all duration-300"
                  style={{
                    height: `${tick % 2 === 0 ? h + (i % 3) : h}px`,
                    background: activeNodeData.glowColor,
                    opacity: 0.7 + (i % 3) * 0.1,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
