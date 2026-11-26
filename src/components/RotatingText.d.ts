import type { CSSProperties, HTMLAttributes } from 'react';

export interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

export interface RotatingTextProps extends HTMLAttributes<HTMLSpanElement> {
  texts: string[];
  transition?: Record<string, unknown>;
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
  exit?: Record<string, unknown>;
  effect?: 'slide' | 'flip' | 'blur' | 'scale' | 'drop';
  direction?: 'up' | 'down';
  highlight?: boolean;
  highlightColor?: string;
  animatePresenceMode?: 'wait' | 'sync' | 'popLayout';
  animatePresenceInitial?: boolean;
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: 'first' | 'last' | 'center' | 'random' | number;
  loop?: boolean;
  auto?: boolean;
  pauseOnHover?: boolean;
  blur?: number;
  splitBy?: 'characters' | 'words' | 'lines' | string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
  style?: CSSProperties;
}

declare const RotatingText: React.ForwardRefExoticComponent<
  RotatingTextProps & React.RefAttributes<RotatingTextRef>
>;
export default RotatingText;
