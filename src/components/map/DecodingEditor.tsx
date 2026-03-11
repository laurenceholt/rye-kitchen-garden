import { useState } from 'react';
import { X, RotateCcw } from 'lucide-react';
import { plantDatabase } from '../../data/plantDatabase';
import { searchPlants } from '../../utils/searchPlants';
import { useGarden } from '../../hooks/useGardenState';

interface Props {
  plantingId: string;
  abbreviation: string;
  currentSpeciesId: string;
  onClose: () => void;
}

export function DecodingEditor({ plantingId, abbreviation, currentSpeciesId, onClose }: Props) {
  const { actions } = useGarden();
  const [query, setQuery] = useState('');
  const [notes, setNotes] = useState('');
  const filtered = searchPlants(query, plantDatabase).slice(0, 8);

  const handleSelect = (speciesId: string) => {
    actions.saveCorrection(plantingId, speciesId, notes || undefined);
    onClose();
  };

  const handleReset = () => {
    actions.resetCorrection(plantingId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={onClose}>
      <div
        className="bg-surface rounded-xl shadow-2xl border border-border w-[420px] max-h-[80vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-garden-50">
          <div>
            <h3 className="font-semibold text-sm">Edit Decoding</h3>
            <p className="text-xs text-text-secondary mt-0.5">
              Abbreviation: <span className="font-mono font-bold">{abbreviation}</span>
            </p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-garden-100 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          <div>
            <label className="text-xs font-medium text-text-secondary block mb-1">Search species</label>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Type common or scientific name..."
              className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-garden-400 bg-white"
              autoFocus
            />
          </div>

          <div className="max-h-48 overflow-y-auto border border-border rounded-lg divide-y divide-border">
            {filtered.map(plant => (
              <button
                key={plant.id}
                onClick={() => handleSelect(plant.id)}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-garden-50 transition-colors ${
                  plant.id === currentSpeciesId ? 'bg-garden-100 font-medium' : ''
                }`}
              >
                <div className="font-medium">{plant.commonName}</div>
                <div className="text-xs text-text-secondary italic">{plant.scientificName}</div>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="text-xs text-text-secondary text-center py-3">No matching species found</p>
            )}
          </div>

          <div>
            <label className="text-xs font-medium text-text-secondary block mb-1">Notes (optional)</label>
            <input
              type="text"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Add a note about this correction..."
              className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-garden-400 bg-white"
            />
          </div>
        </div>

        <div className="px-4 py-3 border-t border-border bg-gray-50 flex justify-end gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-white transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-medium text-white bg-garden-500 rounded-lg hover:bg-garden-600 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
