import { useState } from 'react';
import { X, Building2, Plus, Search, Eye } from 'lucide-react';
import type { Confidence } from '../../types';
import { useGarden } from '../../hooks/useGardenState';
import { gridCellMap } from '../../data/gridAssignments';
import { searchPlants } from '../../utils/searchPlants';
import { PlantingRow } from './PlantingRow';
import { CellVisualizer } from './CellVisualizer';

const structureLabels: Record<string, string> = {
  'hot-tub': 'Hot Tub',
  'bench': 'Bench',
  'basement-stairs': 'Basement Stairs',
  'barbecue': 'Barbecue',
  'planter': 'Planter Box',
  'pond': 'Pond / Water Feature',
  'path': 'Path',
  'property-line': 'Property Line',
};

export function CellDetailPanel() {
  const { state, actions } = useGarden();
  const [adding, setAdding] = useState(false);
  const [showVisualizer, setShowVisualizer] = useState(false);
  const [newAbbr, setNewAbbr] = useState('');
  const [newQuery, setNewQuery] = useState('');
  const [newQty, setNewQty] = useState(1);
  const [newConfidence, setNewConfidence] = useState<Confidence>('high');

  if (!state.selectedCellId) return null;

  const cell = gridCellMap.get(state.selectedCellId);
  if (!cell) return null;

  const plantings = actions.getResolvedPlantings(state.selectedCellId);
  const rowLabel = String.fromCharCode(65 + cell.row);
  const colLabel = cell.col + 1;

  const searchResults = newQuery.trim() ? searchPlants(newQuery, actions.getAllPlants()).slice(0, 6) : [];

  const handleAddPlanting = (speciesId: string) => {
    const cellId = state.selectedCellId!;
    actions.addPlanting(cellId, {
      id: `${cellId}-user-${Date.now()}`,
      abbreviation: newAbbr.trim() || speciesId,
      decodedSpeciesId: speciesId,
      confidence: newConfidence,
      quantity: newQty,
    });
    setAdding(false);
    setNewAbbr('');
    setNewQuery('');
    setNewQty(1);
    setNewConfidence('high');
  };

  return (
    <div className="w-[416px] bg-surface border-l border-border flex flex-col h-full overflow-hidden shrink-0">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-garden-50">
        <div>
          <h2 className="font-serif font-bold text-lg text-garden-700">Cell {cell.id}</h2>
          <p className="text-xs text-text-secondary">Row {rowLabel}, Column {colLabel}</p>
        </div>
        <div className="flex items-center gap-1">
          {plantings.length > 0 && (
            <button
              onClick={() => setShowVisualizer(true)}
              className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-garden-600 bg-garden-100 rounded-lg hover:bg-garden-200 transition-colors"
              title="3D visualization"
            >
              <Eye className="w-3.5 h-3.5" />
              Visualize
            </button>
          )}
          <button
            onClick={() => actions.selectCell(null)}
            className="p-1.5 hover:bg-garden-100 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {cell.structures.length > 0 && (
        <div className="px-4 py-2 border-b border-border bg-amber-50/50">
          <div className="flex items-center gap-1.5 text-xs font-medium text-amber-700">
            <Building2 className="w-3.5 h-3.5" />
            Structures
          </div>
          <div className="mt-1 flex flex-wrap gap-1">
            {cell.structures.map(s => (
              <span key={s} className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                {structureLabels[s] || s}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        {plantings.length > 0 ? (
          <div className="p-2">
            <p className="text-xs font-medium text-text-secondary px-3 py-1.5">
              PLANTINGS ({plantings.reduce((s, p) => s + p.quantity, 0)})
            </p>
            <div className="divide-y divide-border/50">
              {plantings.map(p => (
                <PlantingRow key={p.id} planting={p} cellId={state.selectedCellId!} />
              ))}
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-text-secondary">
            <p className="text-sm">No plantings in this cell</p>
          </div>
        )}

        {/* Add Planting */}
        {!adding ? (
          <div className="px-4 pb-3 pt-1">
            <button
              onClick={() => setAdding(true)}
              className="flex items-center gap-1.5 w-full px-3 py-2 text-xs font-medium text-garden-600 border border-dashed border-garden-300 rounded-lg hover:bg-garden-50 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Planting
            </button>
          </div>
        ) : (
          <div className="mx-4 mb-3 p-3 border border-garden-200 rounded-lg bg-garden-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-garden-700">New Planting</span>
              <button onClick={() => setAdding(false)} className="p-0.5 hover:bg-garden-100 rounded">
                <X className="w-3.5 h-3.5 text-text-secondary" />
              </button>
            </div>

            <div>
              <label className="text-[10px] font-medium text-text-secondary block mb-0.5">Map code / abbreviation</label>
              <input
                type="text"
                value={newAbbr}
                onChange={e => setNewAbbr(e.target.value)}
                placeholder="e.g. ECH, SA..."
                className="w-full px-2 py-1.5 text-xs border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-garden-400 bg-white"
              />
            </div>

            <div>
              <label className="text-[10px] font-medium text-text-secondary block mb-0.5">Species</label>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-text-secondary" />
                <input
                  type="text"
                  value={newQuery}
                  onChange={e => setNewQuery(e.target.value)}
                  placeholder="Search species..."
                  className="w-full pl-6 pr-2 py-1.5 text-xs border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-garden-400 bg-white"
                  autoFocus
                />
              </div>
              {searchResults.length > 0 && (
                <div className="mt-1 max-h-32 overflow-y-auto border border-border rounded-md divide-y divide-border bg-white">
                  {searchResults.map(plant => (
                    <button
                      key={plant.id}
                      onClick={() => handleAddPlanting(plant.id)}
                      className="w-full text-left px-2 py-1.5 text-xs hover:bg-garden-50 transition-colors"
                    >
                      <div className="font-medium">{plant.commonName}</div>
                      <div className="text-[10px] text-text-secondary italic">{plant.scientificName}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-[10px] font-medium text-text-secondary block mb-0.5">Qty</label>
                <input
                  type="number"
                  min={1}
                  value={newQty}
                  onChange={e => setNewQty(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-2 py-1.5 text-xs border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-garden-400 bg-white"
                />
              </div>
              <div className="flex-1">
                <label className="text-[10px] font-medium text-text-secondary block mb-0.5">Confidence</label>
                <select
                  value={newConfidence}
                  onChange={e => setNewConfidence(e.target.value as Confidence)}
                  className="w-full px-2 py-1.5 text-xs border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-garden-400 bg-white"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {showVisualizer && (
        <CellVisualizer
          cellId={state.selectedCellId!}
          plantings={plantings}
          onClose={() => setShowVisualizer(false)}
        />
      )}
    </div>
  );
}
