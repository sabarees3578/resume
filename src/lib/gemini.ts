const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const SKILL_KNOWLEDGE_BASE: Record<string, string> = {
  mqtt: 'MQTT (Message Queuing Telemetry Transport) is a lightweight publish/subscribe messaging protocol built for constrained IoT devices and unreliable networks.\n\nIn embedded systems like ESP32 and LoRaWAN gateways, MQTT enables low-overhead bidirectional telemetry between field nodes, ChirpStack/broker servers, TimescaleDB pipelines, and real-time dashboards.',
  esp32: 'ESP32 / ESP32-C3 are Wi-Fi and Bluetooth Low Energy microcontrollers ideal for connected hardware prototypes and wireless field nodes.\n\nPaired with custom KiCad PCBs, SPI/I2C inertial sensors (such as the MPU9250), and MQTT/WebSocket streams, they power real-time telemetry and low-latency HID peripherals.',
  rust: 'Rust provides memory-safe, zero-cost-abstraction systems performance ideal for native desktop tooling, serial/USB device bridges, and background workers.\n\nPaired with Tauri and React, it powers Raw IDE / Godem IDE with fast local toolchain orchestration (`arduino-cli`, Docker staging, and filesystem watchers).',
  tauri: 'Tauri combines a lightweight Rust core with web UI rendering (React + TypeScript + Monaco Editor) to ship fast desktop engineering tools without heavy Chromium overhead.\n\nIt enables direct native access to serial ports, local compilers, and Docker workflows.',
  kicad: 'KiCad is an open-source EDA suite for schematic capture, multi-layer PCB layout, DRC verification, and 3D board inspection.\n\nCombined with THT & SMT soldering and custom CNC tooling, it bridges firmware prototypes into durable custom circuit boards.',
  timescaledb: 'TimescaleDB extends PostgreSQL with high-ingest hypertables and continuous aggregates tailored for time-series IoT sensor telemetry.\n\nIt pairs cleanly with MQTT ingestion workers and Express/Node.js APIs for sub-second historical charts.',
  lorawan: 'LoRaWAN is a low-power, wide-area networking protocol designed to wirelessly connect battery-operated sensors to gateways over kilometers.\n\nWorking alongside network servers like ChirpStack and TTN, it bridges physical-layer field nodes reliably to cloud analytics and monitoring dashboards.',
  opencv: 'OpenCV is an open-source computer vision library used on edge hardware like Raspberry Pi 4/5 for real-time image filtering, object detection, and visual servoing.\n\nCombined with MediaPipe and motor drivers, it enables autonomous robotics perception pipelines.',
  godot: 'Godot Engine (C# / .NET) enables interactive 3D visualizations, robotics kinematics sandboxes, and real-time digital twins.\n\nIt bridges CAD/Blender models with live telemetry or simulation control loops.',
};

function buildLocalSkillFallback(skillName: string): string {
  const key = skillName.trim().toLowerCase();
  const matchedKey = Object.keys(SKILL_KNOWLEDGE_BASE).find(
    (k) => key.includes(k) || k.includes(key)
  );
  if (matchedKey) {
    return `${SKILL_KNOWLEDGE_BASE[matchedKey]}\n\n(Local knowledge summary shown because VITE_GEMINI_API_KEY is not configured in this browser build.)`;
  }
  return `${skillName} is a core engineering technology used across modern hardware-software workflows to improve reliability, iteration speed, and system integration.\n\nIn Sabarees' multi-discipline stack (spanning embedded firmware, robotics simulation, and full-stack web apps), tools like ${skillName} help bridge physical devices with responsive user interfaces.\n\n(Local summary shown — add VITE_GEMINI_API_KEY in .env to enable live Gemini responses.)`;
}

function buildLocalProjectFallback(projectName: string): string {
  return `${projectName} is an integrated engineering project combining hardware control, real-time telemetry, and an intuitive software interface. Built with modern embedded and web technologies, it focuses on reliable data flow from sensor or actuator layer to user-facing monitoring and control.\n\n(Local template shown — add VITE_GEMINI_API_KEY in .env to generate custom Gemini descriptions.)`;
}

export async function generateGeminiResponse(prompt: string): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error('NO_API_KEY');
  }

  const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const data = await response.json();

  if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
    return data.candidates[0].content.parts[0].text;
  }

  throw new Error('Invalid response format from Gemini API');
}

export async function explainSkill(skillName: string): Promise<string> {
  const prompt = `Explain the technology/skill "${skillName}" in 2-3 concise paragraphs. Focus on what it is, its main use cases, and why it's valuable for IoT, robotics, or full-stack engineers. Keep it professional and informative.`;
  try {
    return await generateGeminiResponse(prompt);
  } catch {
    return buildLocalSkillFallback(skillName);
  }
}

export async function suggestProjectDescription(projectName: string): Promise<string> {
  const prompt = `Generate a professional and engaging project description for a project titled "${projectName}". Include 2-3 sentences covering: what the project does, the key technologies used, and its impact or value. Make it sound impressive but realistic.`;
  try {
    return await generateGeminiResponse(prompt);
  } catch {
    return buildLocalProjectFallback(projectName);
  }
}
