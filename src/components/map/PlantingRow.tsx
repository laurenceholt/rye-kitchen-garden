import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import type { CellPlanting } from '../../types';
import { useGarden } from '../../hooks/useGardenState';
import { ConfidenceBadge } from './ConfidenceBadge';
import { PlantingEditor } from './PlantingEditor';

export function PlantingRow({ planting, cellId }: { planting: CellPlanting; cellId: string }) {
  const [editing, setEditing] = useState(false);
  const { actions } = useGarden();

  const resolvedId = actions.getResolvedSpeciesId(planting.id, planting.decodedSpeciesId);
  const isEdited = actions.isUserCorrected(planting.id);
  const species = actions.getPlantById(resolvedId);

  return (
    <>
      <div className="flex items-start gap-2 py-2 px-3 hover:bg-garden-50 rounded-lg group transition-colors">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-text-secondary bg-gray-100 px-1.5 py-0.5 rounded">
              {planting.abbreviation}
            </span>
            <span className="text-text-secondary text-xs">&rarr;</span>
            <span className="text-sm font-medium truncate">
              {species?.commonName ?? 'Unknown'}
            </span>
          </div>
          {species && (
            <p className="text-xs text-text-secondary italic mt-0.5 truncate">
              {species.scientificName}
            </p>
          )}
          <div className="flex items-center gap-2 mt-1">
            <ConfidenceBadge confidence={planting.confidence} isEdited={isEdited} />
            {planting.quantity > 1 && (
              <span className="text-xs text-text-secondary">&times;{planting.quantity}</span>
            )}
          </div>
        </div>
        <div className="flex gap-0.5">
          <button
            onClick={() => setEditing(true)}
            className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-garden-100 rounded transition-opacity"
            title="Edit planting"
          >
            <Pencil className="w-3.5 h-3.5 text-text-secondary" />
          </button>
          <button
            onClick={() => actions.deletePlanting(planting.id)}
            className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-red-100 rounded transition-opacity"
            title="Remove planting"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-500" />
          </button>
        </div>
      </div>
      {editing && (
        <PlantingEditor
          cellId={cellId}
          planting={planting}
          onClose={() => setEditing(false)}
        />
      )}
    </>
  );
}
