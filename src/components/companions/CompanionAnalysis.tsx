import { useMemo, useState } from 'react';
import { gridAssignments } from '../../data/gridAssignments';
import { deriveCompatibility, getCellCompatibilityScore } from '../../data/companionData';
import { useGarden } from '../../hooks/useGardenState';
import { CompatibilityScore } from './CompatibilityScore';
import { PlantProfile } from './PlantProfile';
import type { CompatibilityRating, PlantSpecies } from '../../types';

export function CompanionAnalysis() {
  const { actions } = useGarden();
  const [selectedCellId, setSelectedCellId] = useState<string | null>(null);

  // Compute per-cell scores for all cells with 2+ species
  const cellsWithScores = useMemo(() => {
    return gridAssignments
      .map(cell => {
        const plantings = actions.getResolvedPlantings(cell.id);
        const species: PlantSpecies[] = [];
        for (const p of plantings) {
          const id = actions.getResolvedSpeciesId(p.id, p.decodedSpeciesId);
          const sp = actions.getPlantById(id);
          if (sp && !species.find(s => s.id === sp.id)) species.push(sp);
        }

        if (species.length < 2) return null;

        const ratings: CompatibilityRating[] = [];
        for (let i = 0; i < species.length; i++) {
          for (let j = i + 1; j < species.length; j++) {
            ratings.push(deriveCompatibility(species[i], species[j]).rating);
          }
        }

        const score = getCellCompatibilityScore(ratings);
        const totalPlants = plantings.reduce((s, p) => s + p.quantity, 0);
        return { cell, score, speciesCount: species.length, totalPlants };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
      .sort((a, b) => a.score - b.score); // worst first
  }, [actions]);

  const analysis = useMemo(() => {
    if (!selectedCellId) return null;

    const plantings = actions.getResolvedPlantings(selectedCellId);
    if (plantings.length < 1) return null;

    const species: PlantSpecies[] = [];
    for (const p of plantings) {
      const id = actions.getResolvedSpeciesId(p.id, p.decodedSpeciesId);
      const sp = actions.getPlantById(id);
      if (sp && !species.find(s => s.id === sp.id)) species.push(sp);
    }

    const pairs: { a: PlantSpecies; b: PlantSpecies; rating: CompatibilityRating; reason: string }[] = [];
    for (let i = 0; i < species.length; i++) {
      for (let j = i + 1; j < species.length; j++) {
        const result = deriveCompatibility(species[i], species[j]);
        pairs.push({ a: species[i], b: species[j], ...result });
      }
    }

    const ratings = pairs.map(p => p.rating);
    const score = getCellCompatibilityScore(ratings);

    return { species, pairs, score };
  }, [selectedCellId, actions]);

  return (
    <div className="max-w-[1400px] mx-auto p-6">
      <div className="mb-6">
        <h2 className="font-serif text-2xl font-bold text-garden-700">Companion Planting Analysis</h2>
        <p className="text-sm text-text-secondary mt-1">
          Cells sorted by compatibility score (lowest first) to help you focus on problem areas
        </p>
      </div>

      <div className="flex gap-6">
        {/* Cell selector */}
        <div className="w-72 shrink-0">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">
            Cells with 2+ species ({cellsWithScores.length})
          </h3>
          <div className="space-y-1 max-h-[70vh] overflow-y-auto pr-1">
            {cellsWithScores.map(({ cell, score, speciesCount }) => {
              const isSelected = selectedCellId === cell.id;
              const scoreColor = score >= 7 ? 'text-emerald-600' :
                                 score >= 5 ? 'text-amber-600' : 'text-red-600';
              const scoreBg = score >= 7 ? 'bg-emerald-100' :
                              score >= 5 ? 'bg-amber-100' : 'bg-red-100';
              return (
                <button
                  key={cell.id}
                  onClick={() => setSelectedCellId(isSelected ? null : cell.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                    isSelected
                      ? 'bg-garden-100 text-garden-700 border border-garden-300'
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <span>
                    <span className="font-mono font-bold">{cell.id}</span>
                    <span className="text-text-secondary ml-2">
                      {speciesCount} species
                    </span>
                  </span>
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${scoreBg} ${scoreColor}`}>
                    {score}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Analysis panel */}
        <div className="flex-1 min-w-0">
          {!analysis ? (
            <div className="bg-surface border border-border rounded-xl p-12 text-center text-text-secondary">
              <p>Select a cell to see companion planting analysis</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Score header */}
              <div className="bg-surface border border-border rounded-xl p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg">
                    Cell {selectedCellId} &mdash; {analysis.species.length} unique species
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {analysis.pairs.length} pairwise comparison{analysis.pairs.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${
                    analysis.score >= 7 ? 'text-emerald-600' :
                    analysis.score >= 5 ? 'text-amber-600' :
                    'text-red-600'
                  }`}>
                    {analysis.score}
                  </div>
                  <div className="text-xs text-text-secondary">/ 10</div>
                </div>
              </div>

              {/* Plant profiles */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">
                  Species in this cell
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {analysis.species.map(sp => (
                    <PlantProfile key={sp.id} species={sp} />
                  ))}
                </div>
              </div>

              {/* Pairwise analysis */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">
                  Compatibility pairs
                </h4>
                <div className="space-y-2">
                  {analysis.pairs.map((pair, i) => (
                    <div
                      key={i}
                      className="bg-surface border border-border rounded-lg p-3 flex items-start gap-3"
                    >
                      <CompatibilityScore rating={pair.rating} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">
                          {pair.a.commonName} + {pair.b.commonName}
                        </p>
                        <p className="text-xs text-text-secondary mt-0.5">
                          {pair.reason}
                        </p>
                      </div>
                    </div>
                  ))}
                  {analysis.pairs.length === 0 && (
                    <p className="text-sm text-text-secondary text-center py-4">
                      Only one unique species in this cell
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
