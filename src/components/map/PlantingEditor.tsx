import { useState } from 'react';
import { X, RotateCcw, Sparkles } from 'lucide-react';
import type { CellPlanting, Confidence } from '../../types';
import { gridAssignments } from '../../data/gridAssignments';
import { searchPlants } from '../../utils/searchPlants';
import { useGarden } from '../../hooks/useGardenState';
import { isOpenAIConfigured, lookupPlantSpecies } from '../../utils/openaiLookup';

interface Props {
  cellId: string;
  planting: CellPlanting;
  onClose: () => void;
}

export function PlantingEditor({ cellId, planting, onClose }: Props) {
  const { actions } = useGarden();

  const resolvedId = actions.getResolvedSpeciesId(planting.id, planting.decodedSpeciesId);

  const [selectedSpeciesId, setSelectedSpeciesId] = useState(resolvedId);
  const [abbreviation, setAbbreviation] = useState(planting.abbreviation);
  const [quantity, setQuantity] = useState(planting.quantity);
  const [confidence, setConfidence] = useState<Confidence>(planting.confidence);
  const [notes, setNotes] = useState('');
  const [query, setQuery] = useState('');

  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

  const [showBulkPrompt, setShowBulkPrompt] = useState(false);

  const allPlants = actions.getAllPlants();
  const filtered = query.trim() ? searchPlants(query, allPlants).slice(0, 8) : [];
  const selectedSpecies = actions.getPlantById(selectedSpeciesId);

  const countOtherMatches = (abbr: string) => {
    const abbrLower = abbr.toLowerCase();
    let count = 0;
    for (const cell of gridAssignments) {
      for (const p of cell.plantings) {
        if (p.id !== planting.id && p.abbreviation.toLowerCase() === abbrLower) count++;
      }
    }
    return count;
  };

  const handleSave = () => {
    actions.updatePlanting(planting.id, {
      speciesId: selectedSpeciesId,
      abbreviation: abbreviation !== planting.abbreviation ? abbreviation : undefined,
      quantity: quantity !== planting.quantity ? quantity : undefined,
      confidence,
      notes: notes || undefined,
    });

    // Check for bulk update opportunity if species changed
    if (selectedSpeciesId !== resolvedId) {
      const otherCount = countOtherMatches(planting.abbreviation);
      if (otherCount > 0) {
        setShowBulkPrompt(true);
        return;
      }
    }

    onClose();
  };

  const handleBulkYes = () => {
    actions.bulkCorrectByAbbreviation(planting.abbreviation, selectedSpeciesId, notes || undefined);
    onClose();
  };

  const handleReset = () => {
    actions.resetCorrection(planting.id);
    onClose();
  };

  const handleAILookup = async () => {
    setAiLoading(true);
    setAiError('');
    try {
      const result = await lookupPlantSpecies(query);
      if (result) {
        actions.addCustomPlant(result);
        setSelectedSpeciesId(result.id);
        setQuery('');
      } else {
        setAiError('Not recognized as a real plant species');
      }
    } catch (e) {
      setAiError(e instanceof Error ? e.message : 'Lookup failed');
    } finally {
      setAiLoading(false);
    }
  };

  if (showBulkPrompt) {
    const otherCount = countOtherMatches(planting.abbreviation);
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={onClose}>
        <div className="bg-surface rounded-xl shadow-2xl border border-border w-[380px]" onClick={e => e.stopPropagation()}>
          <div className="px-4 py-3 border-b border-border bg-garden-50">
            <h3 className="font-semibold text-sm">Update all matching plantings?</h3>
          </div>
          <div className="p-4">
            <p className="text-sm text-text-secondary">
              There {otherCount === 1 ? 'is' : 'are'} <strong>{otherCount}</strong> other planting{otherCount !== 1 ? 's' : ''} with
              the code <span className="font-mono font-bold">{planting.abbreviation}</span>. Update them all to the same species?
            </p>
          </div>
          <div className="px-4 py-3 border-t border-border bg-gray-50 flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium text-text-secondary border border-border rounded-lg hover:bg-white transition-colors"
            >
              No, just this one
            </button>
            <button
              onClick={handleBulkYes}
              className="px-3 py-1.5 text-xs font-medium text-white bg-garden-500 rounded-lg hover:bg-garden-600 transition-colors"
            >
              Yes, update all {otherCount + 1}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={onClose}>
      <div
        className="bg-surface rounded-xl shadow-2xl border border-border w-[460px] max-h-[85vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-garden-50">
          <div>
            <h3 className="font-semibold text-sm">Edit Planting</h3>
            <p className="text-xs text-text-secondary mt-0.5">
              Cell {cellId} &middot; <span className="font-mono font-bold">{planting.abbreviation}</span>
            </p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-garden-100 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-3 overflow-y-auto max-h-[60vh]">
          {/* Current species */}
          {selectedSpecies && (
            <div className="p-2 bg-garden-50 rounded-lg border border-garden-200">
              <p className="text-xs text-text-secondary">Current species</p>
              <p className="text-sm font-medium">{selectedSpecies.commonName}</p>
              <p className="text-xs text-text-secondary italic">{selectedSpecies.scientificName}</p>
            </div>
          )}

          {/* Species search */}
          <div>
            <label className="text-xs font-medium text-text-secondary block mb-1">Change species</label>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by common or scientific name..."
              className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-garden-400 bg-white"
            />
          </div>

          {filtered.length > 0 && (
            <div className="max-h-40 overflow-y-auto border border-border rounded-lg divide-y divide-border">
              {filtered.map(plant => (
                <button
                  key={plant.id}
                  onClick={() => {
                    setSelectedSpeciesId(plant.id);
                    setConfidence('high');
                    setQuery('');
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-garden-50 transition-colors ${
                    plant.id === selectedSpeciesId ? 'bg-garden-100 font-medium' : ''
                  }`}
                >
                  <div className="font-medium">{plant.commonName}</div>
                  <div className="text-xs text-text-secondary italic">{plant.scientificName}</div>
                </button>
              ))}
            </div>
          )}

          {/* AI lookup when no results */}
          {filtered.length === 0 && query.trim().length >= 3 && isOpenAIConfigured() && (
            <div className="p-3 border border-dashed border-garden-300 rounded-lg bg-garden-50/50">
              <p className="text-xs text-text-secondary mb-2">No matching species in database</p>
              <button
                onClick={handleAILookup}
                disabled={aiLoading}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-garden-500 rounded-lg hover:bg-garden-600 transition-colors disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {aiLoading ? 'Looking up...' : `Look up "${query}" with AI`}
              </button>
              {aiError && <p className="mt-1 text-xs text-red-600">{aiError}</p>}
            </div>
          )}

          {/* Abbreviation */}
          <div>
            <label className="text-xs font-medium text-text-secondary block mb-1">Abbreviation / map code</label>
            <input
              type="text"
              value={abbreviation}
              onChange={e => setAbbreviation(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-garden-400 bg-white font-mono"
            />
          </div>

          {/* Quantity + Confidence */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs font-medium text-text-secondary block mb-1">Quantity</label>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-garden-400 bg-white"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs font-medium text-text-secondary block mb-1">Confidence</label>
              <select
                value={confidence}
                onChange={e => setConfidence(e.target.value as Confidence)}
                className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-garden-400 bg-white"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          {/* Notes */}
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

        <div className="px-4 py-3 border-t border-border bg-gray-50 flex justify-between">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-white transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium text-text-secondary border border-border rounded-lg hover:bg-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1.5 text-xs font-medium text-white bg-garden-500 rounded-lg hover:bg-garden-600 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
