import React, { useEffect, useRef } from 'react';

const VERTEX_SHADER = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision mediump float;

uniform vec2 uResolution;
uniform float uTime;

float bayer4x4(vec2 pos) {
  int x = int(mod(pos.x, 4.0));
  int y = int(mod(pos.y, 4.0));
  int index = y * 4 + x;
  if (index == 0) return 0.0 / 16.0;
  if (index == 1) return 8.0 / 16.0;
  if (index == 2) return 2.0 / 16.0;
  if (index == 3) return 10.0 / 16.0;
  if (index == 4) return 12.0 / 16.0;
  if (index == 5) return 4.0 / 16.0;
  if (index == 6) return 14.0 / 16.0;
  if (index == 7) return 6.0 / 16.0;
  if (index == 8) return 3.0 / 16.0;
  if (index == 9) return 11.0 / 16.0;
  if (index == 10) return 1.0 / 16.0;
  if (index == 11) return 9.0 / 16.0;
  if (index == 12) return 15.0 / 16.0;
  if (index == 13) return 7.0 / 16.0;
  if (index == 14) return 13.0 / 16.0;
  return 5.0 / 16.0;
}

float waveField(vec2 uv, float t) {
  vec2 p = uv * 2.1 - 1.05;
  float a = sin(p.x * 1.8 + t * 0.35 + cos(p.y * 1.5 - t * 0.25));
  float b = cos(p.y * 2.1 - t * 0.3 + sin(p.x * 1.3 + t * 0.2));
  float c = sin((p.x + p.y) * 1.4 + t * 0.22);
  float glow = exp(-length(p - vec2(0.35 + sin(t * 0.18) * 0.2, -0.1 + cos(t * 0.15) * 0.2)) * 1.25);
  return clamp(0.42 + 0.20 * a + 0.16 * b + 0.12 * c + 0.26 * glow, 0.0, 1.0);
}

void main() {
  vec2 cell = floor(gl_FragCoord.xy);
  vec2 sampleUv = (cell + 0.5) / max(uResolution, vec2(1.0));

  float field = waveField(sampleUv, uTime);
  float threshold = bayer4x4(cell);

  vec3 deepIndigo = vec3(0.055, 0.08, 0.28);
  vec3 cobalt = vec3(0.11, 0.20, 0.56);
  vec3 violet = vec3(0.32, 0.15, 0.56);
  vec3 coral = vec3(0.64, 0.30, 0.50);

  float band = smoothstep(0.08, 0.96, field);
  vec3 tone;
  if (band < 0.45) {
    tone = mix(deepIndigo, cobalt, smoothstep(0.0, 0.45, band));
  } else if (band < 0.78) {
    tone = mix(cobalt, violet, smoothstep(0.45, 0.78, band));
  } else {
    tone = mix(violet, coral, smoothstep(0.78, 1.0, band));
  }

  float ditherMask = step(threshold, clamp(band * 1.15 - 0.1, 0.0, 1.0));
  vec3 finalColor = mix(tone * 0.78, tone * 1.04, ditherMask);

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export const RisoDitherBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const gl = canvas.getContext('webgl', { antialias: false, powerPreference: 'low-power' });
    if (!gl) return undefined;

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return undefined;

    const program = gl.createProgram();
    if (!program) return undefined;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return undefined;
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, 'aPosition');
    const resLoc = gl.getUniformLocation(program, 'uResolution');
    const timeLoc = gl.getUniformLocation(program, 'uTime');

    // Render at 1/3 resolution so each pixel is a crisp 3px Bayer cell (9x lighter on GPU)
    const resize = () => {
      canvas.width = Math.max(1, Math.floor(window.innerWidth / 3));
      canvas.height = Math.max(1, Math.floor(window.innerHeight / 3));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize);

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    let raf = 0;
    const start = performance.now();
    let lastDraw = 0;
    const FRAME_INTERVAL = 50; // ~20fps gentle drift saves GPU for 60fps UI & 3D Lanyard

    const draw = (now: number) => {
      const elapsed = reducedMotion ? 1.5 : (now - start) / 1000;
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, elapsed);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      lastDraw = now;
    };

    const loop = (now: number) => {
      if (!document.hidden && now - lastDraw >= FRAME_INTERVAL) {
        draw(now);
      }
      if (!reducedMotion) {
        raf = requestAnimationFrame(loop);
      }
    };

    draw(start);
    if (!reducedMotion) {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      gl.deleteBuffer(buffer);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none opacity-75 no-print"
      style={{ imageRendering: 'pixelated' }}
    />
  );
};
