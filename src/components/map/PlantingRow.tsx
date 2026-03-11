import { useState } from 'react';
import { Pencil } from 'lucide-react';
import type { CellPlanting } from '../../types';
import { plantDatabaseMap } from '../../data/plantDatabase';
import { useGarden } from '../../hooks/useGardenState';
import { ConfidenceBadge } from './ConfidenceBadge';
import { DecodingEditor } from './DecodingEditor';

export function PlantingRow({ planting }: { planting: CellPlanting }) {
  const [editing, setEditing] = useState(false);
  const { actions } = useGarden();

  const resolvedId = actions.getResolvedSpeciesId(planting.id, planting.decodedSpeciesId);
  const isEdited = actions.isUserCorrected(planting.id);
  const species = plantDatabaseMap.get(resolvedId);

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
        <button
          onClick={() => setEditing(true)}
          className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-garden-100 rounded transition-opacity"
          title="Edit decoding"
        >
          <Pencil className="w-3.5 h-3.5 text-text-secondary" />
        </button>
      </div>
      {editing && (
        <DecodingEditor
          plantingId={planting.id}
          abbreviation={planting.abbreviation}
          currentSpeciesId={resolvedId}
          onClose={() => setEditing(false)}
        />
      )}
    </>
  );
}
