import type { CompanionEntry, CompatibilityRating, PlantSpecies } from '../types';

export const companionEntries: CompanionEntry[] = [
  { speciesA: 'echinacea-purpurea', speciesB: 'rudbeckia', rating: 'excellent', reason: 'Both native prairie plants with similar sun/moisture needs; stagger bloom times for continuous color' },
  { speciesA: 'echinacea-purpurea', speciesB: 'salvia', rating: 'excellent', reason: 'Both full sun lovers with complementary bloom colors; salvia attracts pollinators that benefit echinacea' },
  { speciesA: 'echinacea-purpurea', speciesB: 'achillea', rating: 'good', reason: 'Both drought-tolerant perennials, though yarrow prefers drier conditions' },
  { speciesA: 'echinacea-purpurea', speciesB: 'monarda', rating: 'excellent', reason: 'Classic prairie companions; both native, similar sun needs, attract butterflies and bees' },
  { speciesA: 'salvia', speciesB: 'lavender', rating: 'excellent', reason: 'Mediterranean herbs that both prefer full sun and well-drained soil; deer resistant pairing' },
  { speciesA: 'salvia', speciesB: 'nepeta', rating: 'good', reason: 'Both in the mint family; similar growing conditions, complementary flower shapes' },
  { speciesA: 'karl-foerster', speciesB: 'echinacea-purpurea', rating: 'excellent', reason: 'Iconic pairing; vertical grass structure complements rounded coneflower form' },
  { speciesA: 'karl-foerster', speciesB: 'rudbeckia', rating: 'excellent', reason: 'Referenced in map legend as companion; classic prairie-inspired combination' },
  { speciesA: 'panicum-virgatum', speciesB: 'golden-rod', rating: 'excellent', reason: 'Both native to North American prairies; natural companions in wild meadows' },
  { speciesA: 'panicum-virgatum', speciesB: 'aster', rating: 'excellent', reason: 'Native fall combination; grass provides structure while asters bloom' },
  { speciesA: 'joe-pye-weed', speciesB: 'swamp-milkweed', rating: 'excellent', reason: 'Both native moisture-loving perennials; together support monarch butterflies' },
  { speciesA: 'joe-pye-weed', speciesB: 'golden-rod', rating: 'good', reason: 'Both native and bloom in late summer/fall; Joe-Pye prefers more moisture' },
  { speciesA: 'hosta-halcyon', speciesB: 'cinnamon-fern', rating: 'excellent', reason: 'Perfect shade garden pairing; both thrive in moist, shady conditions' },
  { speciesA: 'hosta-halcyon', speciesB: 'actaea-chocoholic', rating: 'excellent', reason: 'Both shade-loving with contrasting foliage colors and textures' },
  { speciesA: 'cinnamon-fern', speciesB: 'actaea-chocoholic', rating: 'excellent', reason: 'Both prefer part shade and moist soil; dramatic texture contrast' },
  { speciesA: 'butterfly-weed', speciesB: 'echinacea-purpurea', rating: 'good', reason: 'Both native prairie plants; butterfly weed prefers drier soil than echinacea' },
  { speciesA: 'lavender', speciesB: 'thyme', rating: 'excellent', reason: 'Mediterranean herbs; identical sun, drainage, and soil needs' },
  { speciesA: 'lavender', speciesB: 'oregano', rating: 'excellent', reason: 'Mediterranean herb companions with matching cultural requirements' },
  { speciesA: 'verbascum-olympicum', speciesB: 'salvia', rating: 'good', reason: 'Both full sun; mullein provides dramatic height behind lower salvias' },
  { speciesA: 'baptisia-australis', speciesB: 'echinacea-purpurea', rating: 'excellent', reason: 'Classic native pairing; baptisia blooms first in spring, echinacea follows in summer' },
  { speciesA: 'persicaria-polymorpha', speciesB: 'monarda', rating: 'good', reason: 'Both vigorous growers with similar moisture needs; dramatic size contrast' },
  { speciesA: 'daylily', speciesB: 'cinnamon-fern', rating: 'good', reason: 'Daylily prefers more sun but tolerates part shade near ferns; complementary textures' },
  { speciesA: 'aruncus-horatia', speciesB: 'hosta-halcyon', rating: 'good', reason: 'Both enjoy shade and moisture; aruncus provides height above hostas' },
  { speciesA: 'sneeze-weed', speciesB: 'golden-rod', rating: 'excellent', reason: 'Both native moisture-tolerant fall bloomers with complementary yellow tones' },
  { speciesA: 'red-twig-dogwood', speciesB: 'cinnamon-fern', rating: 'excellent', reason: 'Both thrive in moist soil; dogwood provides winter structure when fern is dormant' },
  { speciesA: 'stipa-barbata', speciesB: 'salvia', rating: 'good', reason: 'Both prefer full sun; silver grass contrasts beautifully with purple salvia' },
  { speciesA: 'echinops', speciesB: 'eryngium-bourgatii', rating: 'excellent', reason: 'Both thistle-like plants with similar dry, sunny requirements; architectural pairing' },
  { speciesA: 'verbena-bonariensis', speciesB: 'karl-foerster', rating: 'good', reason: 'Both vertical forms; verbena weaves through grass for airy, transparent effect' },
  { speciesA: 'tomatoes', speciesB: 'beans', rating: 'good', reason: 'Classic companion plants; beans fix nitrogen that benefits tomatoes' },
  { speciesA: 'lettuce', speciesB: 'tomatoes', rating: 'good', reason: 'Lettuce benefits from tomato shade in hot weather; good space sharing' },
  { speciesA: 'hosta-halcyon', speciesB: 'daylily', rating: 'neutral', reason: 'Different sun preferences - hostas prefer shade, daylilies prefer sun; border pairing works at transition zones' },
  { speciesA: 'butterfly-weed', speciesB: 'hosta-halcyon', rating: 'poor', reason: 'Conflicting needs: butterfly weed requires full sun and dry soil; hostas prefer shade and moisture' },
  { speciesA: 'lavender', speciesB: 'hosta-halcyon', rating: 'poor', reason: 'Opposite requirements: lavender needs full sun, dry soil; hostas need shade and moisture' },
  { speciesA: 'cinnamon-fern', speciesB: 'stipa-tenuissima', rating: 'poor', reason: 'Conflicting moisture needs: ferns require consistently moist soil; stipa prefers dry conditions' },
];

function sunScore(a: string, b: string): number {
  const levels = ['full-sun', 'part-sun', 'part-shade', 'full-shade'];
  const diff = Math.abs(levels.indexOf(a) - levels.indexOf(b));
  if (diff === 0) return 3;
  if (diff === 1) return 2;
  if (diff === 2) return 1;
  return 0;
}

function moistureScore(a: string, b: string): number {
  const levels = ['dry', 'average', 'moist', 'wet'];
  const diff = Math.abs(levels.indexOf(a) - levels.indexOf(b));
  if (diff === 0) return 3;
  if (diff === 1) return 2;
  if (diff === 2) return 1;
  return 0;
}

export function deriveCompatibility(a: PlantSpecies, b: PlantSpecies): { rating: CompatibilityRating; reason: string } {
  // Check explicit entries first
  const explicit = companionEntries.find(
    e => (e.speciesA === a.id && e.speciesB === b.id) ||
         (e.speciesA === b.id && e.speciesB === a.id)
  );
  if (explicit) return { rating: explicit.rating, reason: explicit.reason };

  // Derive from growing conditions
  let score = 0;
  const reasons: string[] = [];

  const sun = sunScore(a.sunRequirement, b.sunRequirement);
  score += sun;
  if (sun >= 3) reasons.push('matching sun requirements');
  else if (sun <= 1) reasons.push('different sun needs');

  const moisture = moistureScore(a.moistureRequirement, b.moistureRequirement);
  score += moisture;
  if (moisture >= 3) reasons.push('similar moisture needs');
  else if (moisture <= 1) reasons.push('different moisture preferences');

  const sharedSoil = a.soilPreference.filter(s => b.soilPreference.includes(s));
  if (sharedSoil.length > 0) {
    score += 1;
    reasons.push(`compatible soil (${sharedSoil.join(', ')})`);
  }

  // Height layering bonus
  const avgA = (a.heightRange[0] + a.heightRange[1]) / 2;
  const avgB = (b.heightRange[0] + b.heightRange[1]) / 2;
  if (Math.abs(avgA - avgB) > 12) {
    score += 1;
    reasons.push('good height layering');
  }

  let rating: CompatibilityRating;
  if (score >= 7) rating = 'excellent';
  else if (score >= 5) rating = 'good';
  else if (score >= 3) rating = 'neutral';
  else rating = 'poor';

  return { rating, reason: reasons.join('; ') || 'No specific data available' };
}

export function getCellCompatibilityScore(ratings: CompatibilityRating[]): number {
  if (ratings.length === 0) return 0;
  const ratingValues: Record<CompatibilityRating, number> = {
    excellent: 10,
    good: 7.5,
    neutral: 5,
    poor: 2.5,
  };
  const sum = ratings.reduce((acc, r) => acc + ratingValues[r], 0);
  return Math.round((sum / ratings.length) * 10) / 10;
}
