import { useState, useMemo } from 'react';
import { X, Eye } from 'lucide-react';
import type { CellPlanting, PlantSpecies } from '../../types';
import { useGarden } from '../../hooks/useGardenState';

interface Props {
  cellId: string;
  plantings: CellPlanting[];
  onClose: () => void;
}

interface PlantPlacement {
  species: PlantSpecies;
  x: number;
  z: number;
  height: number;
  imageUrl: string;
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function CellVisualizer({ cellId, plantings, onClose }: Props) {
  const { actions } = useGarden();
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const placements = useMemo(() => {
    const result: PlantPlacement[] = [];

    for (const p of plantings) {
      const resolvedId = actions.getResolvedSpeciesId(p.id, p.decodedSpeciesId);
      const species = actions.getPlantById(resolvedId);
      if (!species) continue;

      const imageUrl = `/plant-images/${resolvedId}.png`;
      const avgHeight = (species.heightRange[0] + species.heightRange[1]) / 2;
      const renderedHeight = Math.max(40, Math.min(200, avgHeight * 2));

      for (let q = 0; q < p.quantity; q++) {
        const seed = hashCode(`${p.id}-${q}`);
        const x = 8 + (seed % 84);
        const z = 8 + ((seed * 37) % 84);

        result.push({ species, x, z, height: renderedHeight, imageUrl });
      }
    }

    result.sort((a, b) => a.z - b.z);
    return result;
  }, [plantings, actions]);

  const bloomColors = useMemo(() => {
    const colors: Record<string, string> = {};
    for (const p of placements) {
      if (!colors[p.species.id] && p.species.bloomColor.length > 0) {
        colors[p.species.id] = p.species.bloomColor[0];
      }
    }
    return colors;
  }, [placements]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-surface rounded-xl shadow-2xl border border-border overflow-hidden"
        style={{ width: '720px', maxHeight: '85vh' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-garden-50">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-garden-600" />
            <h3 className="font-serif font-bold text-sm">Cell {cellId} &mdash; Garden View</h3>
            <span className="text-xs text-text-secondary">({placements.length} plants)</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-garden-100 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div
          className="relative overflow-hidden"
          style={{
            height: '500px',
            background: 'linear-gradient(180deg, #87CEEB 0%, #B0E0E6 35%, #90C695 50%, #6B8E5A 100%)',
          }}
        >
          {/* Ground plane with perspective */}
          <div
            className="absolute left-0 right-0"
            style={{
              bottom: 0,
              height: '55%',
              background: 'linear-gradient(180deg, #7CB469 0%, #5A9A48 40%, #4A7C3F 100%)',
              borderTop: '2px solid #8CC67A',
            }}
          />

          {/* Soil/earth strip */}
          <div
            className="absolute left-0 right-0"
            style={{
              bottom: 0,
              height: '8%',
              background: 'linear-gradient(180deg, #6B4F3A 0%, #5A4030 100%)',
            }}
          />

          {/* Plants */}
          {placements.map((plant, i) => {
            const depthFactor = plant.z / 100;
            const depthScale = 0.35 + depthFactor * 0.65;
            const yPos = 20 + depthFactor * 35;
            const bloomColor = bloomColors[plant.species.id] || '#5A9A48';

            return (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${plant.x}%`,
                  bottom: `${yPos}%`,
                  transform: `translateX(-50%) scale(${depthScale})`,
                  transformOrigin: 'bottom center',
                  zIndex: Math.round(plant.z),
                }}
                title={`${plant.species.commonName}\n${plant.species.heightRange[0]}-${plant.species.heightRange[1]}" tall`}
              >
                {!imageErrors.has(plant.species.id) ? (
                  <img
                    src={plant.imageUrl}
                    alt={plant.species.commonName}
                    style={{
                      height: `${plant.height}px`,
                      width: 'auto',
                      maxWidth: `${plant.height * 1.2}px`,
                      filter: `brightness(${0.85 + depthFactor * 0.15})`,
                      objectFit: 'contain',
                    }}
                    onError={() => setImageErrors(prev => new Set(prev).add(plant.species.id))}
                    draggable={false}
                  />
                ) : (
                  /* Fallback: stylized plant silhouette */
                  <div className="flex flex-col items-center">
                    {/* Foliage */}
                    <div
                      style={{
                        width: `${plant.height * 0.5}px`,
                        height: `${plant.height * 0.7}px`,
                        borderRadius: '45% 45% 35% 35%',
                        background: `radial-gradient(ellipse at 40% 40%, ${bloomColor}, #3A6B2A)`,
                        opacity: 0.85,
                      }}
                    />
                    {/* Stem */}
                    <div
                      style={{
                        width: '3px',
                        height: `${plant.height * 0.3}px`,
                        background: '#4A6B3A',
                        borderRadius: '1px',
                      }}
                    />
                  </div>
                )}
                {/* Label */}
                <div className="text-center mt-0.5" style={{ transform: `scale(${1 / depthScale})`, transformOrigin: 'top center' }}>
                  <span className="text-[8px] bg-white/85 px-1 rounded text-gray-700 whitespace-nowrap shadow-sm">
                    {plant.species.commonName}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
