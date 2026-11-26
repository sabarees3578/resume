import React, { useEffect, useRef } from 'react';

const VERTEX_SHADER = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

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
  vec2 p = uv * 2.2 - 1.1;
  float a = sin(p.x * 1.9 + t * 0.45 + cos(p.y * 1.6 - t * 0.35));
  float b = cos(p.y * 2.3 - t * 0.38 + sin(p.x * 1.4 + t * 0.25));
  float c = sin((p.x + p.y) * 1.5 + t * 0.3);
  float glow = exp(-length(p - vec2(sin(t * 0.23) * 0.35, cos(t * 0.19) * 0.25)) * 1.2);
  return clamp(0.45 + 0.22 * a + 0.18 * b + 0.14 * c + 0.28 * glow, 0.0, 1.0);
}

void main() {
  float pixelScale = 4.0;
  vec2 cell = floor(gl_FragCoord.xy / pixelScale);
  vec2 sampleUv = (cell * pixelScale + pixelScale * 0.5) / max(uResolution, vec2(1.0));

  float field = waveField(sampleUv, uTime);
  float threshold = bayer4x4(cell);

  vec3 deepIndigo = vec3(0.09, 0.14, 0.48);
  vec3 cobalt = vec3(0.18, 0.34, 0.88);
  vec3 violet = vec3(0.50, 0.25, 0.84);
  vec3 coral = vec3(0.92, 0.52, 0.74);

  float band = clamp((field - 0.12) / 0.88, 0.0, 1.0);
  vec3 tone;
  if (band < 0.4) {
    tone = mix(deepIndigo, cobalt, band / 0.4);
  } else if (band < 0.75) {
    tone = mix(cobalt, violet, (band - 0.4) / 0.35);
  } else {
    tone = mix(violet, coral, (band - 0.75) / 0.25);
  }

  float ditherStep = step(threshold, fract(band * 3.0));
  vec3 finalColor = mix(tone * 0.82, min(tone * 1.12, vec3(1.0)), ditherStep);

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

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.floor(window.innerWidth * dpr));
      canvas.height = Math.max(1, Math.floor(window.innerHeight * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize);

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    let raf = 0;
    const start = performance.now();

    const renderFrame = (now: number) => {
      const elapsed = reducedMotion ? 1.5 : (now - start) / 1000;
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, elapsed);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      if (!reducedMotion) {
        raf = requestAnimationFrame(renderFrame);
      }
    };

    raf = requestAnimationFrame(renderFrame);

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
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none no-print"
    />
  );
};
