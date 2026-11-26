import type { JSX } from 'react';

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines' | string;
  from?: Record<string, unknown>;
  to?: Record<string, unknown>;
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right';
  tag?: keyof JSX.IntrinsicElements;
  staggerFrom?: 'start' | 'end' | 'center' | 'edges' | 'random' | number;
  mask?: boolean;
  effect?: 'rise' | 'fade' | 'blur' | 'flip' | 'pop' | 'skew' | 'wave';
  trigger?: 'view' | 'load' | 'hover' | 'click';
  loop?: boolean;
  loopDelay?: number;
  hoverEffect?: 'none' | 'lift' | 'wave';
  color?: string;
  accentColor?: string;
  onLetterAnimationComplete?: () => void;
}

declare const SplitText: React.FC<SplitTextProps>;
export default SplitText;
