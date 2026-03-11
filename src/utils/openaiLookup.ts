import type { PlantSpecies } from '../types';

const getApiKey = () => import.meta.env.VITE_OPENAI_API_KEY as string | undefined;

export function isOpenAIConfigured(): boolean {
  return !!getApiKey();
}

export async function lookupPlantSpecies(name: string): Promise<PlantSpecies | null> {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('OpenAI API key not configured. Add VITE_OPENAI_API_KEY to .env.local');
  }

  const prompt = `You are a horticultural database assistant. Given the plant name "${name}", determine if it is a real plant species or cultivar. If it is, return a JSON object with these exact fields. If it is NOT a real plant, return {"error": "not a real plant"}.

Return ONLY valid JSON (no markdown fences):
{
  "id": "<kebab-case-id>",
  "commonName": "<string>",
  "scientificName": "<string>",
  "category": "<perennial|grass|shrub|tree|herb|vegetable|fern|annual|vine>",
  "heightRange": [<min_inches>, <max_inches>],
  "spreadRange": [<min_inches>, <max_inches>],
  "sunRequirement": "<full-sun|part-sun|part-shade|full-shade>",
  "moistureRequirement": "<dry|average|moist|wet>",
  "soilPreference": ["<clay|loam|sand|rocky|any>"],
  "bloomSeason": ["<spring|summer|fall|winter>"],
  "bloomColor": ["<color>"],
  "hardinessZone": [<min_zone>, <max_zone>],
  "deerResistant": <true|false>,
  "nativeTo": ["<region>"],
  "estimatedCostPerPlant": <number>,
  "notes": "AI-generated entry"
}`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
      temperature: 0.3,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  let raw = data.choices[0].message.content.trim();

  if (raw.startsWith('```')) {
    raw = raw.split('\n').slice(1).join('\n');
    if (raw.endsWith('```')) raw = raw.slice(0, raw.lastIndexOf('```'));
    raw = raw.trim();
  }

  const parsed = JSON.parse(raw);
  if (parsed.error) return null;
  if (!parsed.id || !parsed.commonName || !parsed.scientificName) return null;

  return parsed as PlantSpecies;
}
