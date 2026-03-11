import { Sun, Droplets, Ruler, Flower } from 'lucide-react';
import type { PlantSpecies } from '../../types';

const sunLabels: Record<string, string> = {
  'full-sun': 'Full Sun',
  'part-sun': 'Part Sun',
  'part-shade': 'Part Shade',
  'full-shade': 'Full Shade',
};

const moistureLabels: Record<string, string> = {
  dry: 'Dry',
  average: 'Average',
  moist: 'Moist',
  wet: 'Wet',
};

export function PlantProfile({ species }: { species: PlantSpecies }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-4">
      <h4 className="font-serif font-bold text-garden-700">{species.commonName}</h4>
      <p className="text-xs text-text-secondary italic">{species.scientificName}</p>

      <div className="grid grid-cols-2 gap-3 mt-3">
        <div className="flex items-center gap-2 text-xs">
          <Sun className="w-3.5 h-3.5 text-amber-500" />
          <span>{sunLabels[species.sunRequirement] || species.sunRequirement}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Droplets className="w-3.5 h-3.5 text-blue-500" />
          <span>{moistureLabels[species.moistureRequirement] || species.moistureRequirement}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Ruler className="w-3.5 h-3.5 text-text-secondary" />
          <span>{species.heightRange[0]}-{species.heightRange[1]}&quot; tall</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Flower className="w-3.5 h-3.5 text-pink-500" />
          <span>{species.bloomSeason.length > 0 ? species.bloomSeason.join(', ') : 'No blooms'}</span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1">
        <span className="capitalize text-[10px] bg-gray-100 text-text-secondary px-1.5 py-0.5 rounded-full">
          {species.category}
        </span>
        {species.deerResistant && (
          <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-full">
            Deer resistant
          </span>
        )}
        {species.soilPreference.map(s => (
          <span key={s} className="text-[10px] bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-full">
            {s} soil
          </span>
        ))}
      </div>
    </div>
  );
}
