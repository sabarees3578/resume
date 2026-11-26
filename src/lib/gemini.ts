const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const SKILL_KNOWLEDGE_BASE: Record<string, string> = {
  mqtt: 'MQTT (Message Queuing Telemetry Transport) is a lightweight publish/subscribe messaging protocol built for constrained IoT devices and unreliable networks.\n\nIn embedded systems like ESP32 and LoRaWAN gateways, MQTT enables low-overhead bidirectional telemetry between field sensors, ChirpStack/broker servers, and real-time React web dashboards.',
  esp32: 'ESP32 is a dual-core Wi-Fi & Bluetooth Low Energy microcontroller widely used in connected hardware prototypes and production IoT nodes.\n\nIt pairs seamlessly with FreeRTOS, SPI/I2C inertial sensors (such as the MPU9250), and MQTT/WebSocket clients to stream real-time telemetry or operate as wireless HID peripherals.',
  react: 'React is a declarative component-based UI library for building fast, interactive web applications and real-time engineering dashboards.\n\nCombined with TypeScript, Tailwind CSS, and WebSockets, React powers live sensor visualization interfaces, developer IDEs, and responsive portfolio experiences.',
  lorawan: 'LoRaWAN is a low-power, wide-area networking protocol designed to wirelessly connect battery-operated sensors to regional or private gateways over kilometers.\n\nWorking alongside network servers like ChirpStack, it bridges physical-layer field nodes reliably to cloud analytics and monitoring dashboards.',
  webots: 'Webots is an open-source 3D robotics simulator used to model robots, sensors, actuators, and physical environments before deploying to real hardware.\n\nIt accelerates kinematic tuning, computer vision testing, and autonomous navigation validation while reducing hardware iteration risk.',
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
