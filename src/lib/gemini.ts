const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

export async function generateGeminiResponse(prompt: string): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.');
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }

    throw new Error('Invalid response format from Gemini API');
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
}

export async function explainSkill(skillName: string): Promise<string> {
  const prompt = `Explain the technology/skill "${skillName}" in 2-3 concise paragraphs. Focus on what it is, its main use cases, and why it's valuable for developers. Keep it professional and informative.`;
  return generateGeminiResponse(prompt);
}

export async function suggestProjectDescription(projectName: string): Promise<string> {
  const prompt = `Generate a professional and engaging project description for a project titled "${projectName}". Include 2-3 sentences covering: what the project does, the key technologies used, and its impact or value. Make it sound impressive but realistic.`;
  return generateGeminiResponse(prompt);
}
