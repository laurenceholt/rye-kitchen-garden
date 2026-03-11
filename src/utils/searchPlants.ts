import type { PlantSpecies } from '../types';

export function searchPlants(query: string, plants: PlantSpecies[]): PlantSpecies[] {
  if (!query.trim()) return plants;
  const lower = query.toLowerCase();
  return plants.filter(
    p =>
      p.commonName.toLowerCase().includes(lower) ||
      p.scientificName.toLowerCase().includes(lower) ||
      p.id.includes(lower) ||
      p.category.includes(lower)
  );
}
