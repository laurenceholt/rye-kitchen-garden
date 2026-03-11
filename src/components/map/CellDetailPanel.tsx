import { X, Building2 } from 'lucide-react';
import { useGarden } from '../../hooks/useGardenState';
import { gridCellMap } from '../../data/gridAssignments';
import { PlantingRow } from './PlantingRow';

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
  if (!state.selectedCellId) return null;

  const cell = gridCellMap.get(state.selectedCellId);
  if (!cell) return null;

  const rowLabel = String.fromCharCode(65 + cell.row);
  const colLabel = cell.col + 1;

  return (
    <div className="w-80 bg-surface border-l border-border flex flex-col h-full overflow-hidden shrink-0">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-garden-50">
        <div>
          <h2 className="font-serif font-bold text-lg text-garden-700">Cell {cell.id}</h2>
          <p className="text-xs text-text-secondary">Row {rowLabel}, Column {colLabel}</p>
        </div>
        <button
          onClick={() => actions.selectCell(null)}
          className="p-1.5 hover:bg-garden-100 rounded-lg"
        >
          <X className="w-4 h-4" />
        </button>
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
        {cell.plantings.length > 0 ? (
          <div className="p-2">
            <p className="text-xs font-medium text-text-secondary px-3 py-1.5">
              PLANTINGS ({cell.plantings.length})
            </p>
            <div className="divide-y divide-border/50">
              {cell.plantings.map(p => (
                <PlantingRow key={p.id} planting={p} />
              ))}
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-text-secondary">
            <p className="text-sm">No plantings in this cell</p>
          </div>
        )}
      </div>
    </div>
  );
}
