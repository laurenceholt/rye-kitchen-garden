import { useMemo, useState } from 'react';
import { Download, Search, ArrowUpDown } from 'lucide-react';
import type { BOMEntry, Confidence } from '../../types';
import { gridAssignments } from '../../data/gridAssignments';
import { plantDatabaseMap } from '../../data/plantDatabase';
import { useGarden } from '../../hooks/useGardenState';
import { generateCSV, downloadCSV } from '../../utils/csvExport';
import { ConfidenceBadge } from '../map/ConfidenceBadge';

type SortKey = 'name' | 'quantity' | 'cost' | 'category';

const confidenceRank: Record<Confidence, number> = { high: 3, medium: 2, low: 1 };

export function BillOfMaterials() {
  const { actions } = useGarden();
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const entries = useMemo(() => {
    const map = new Map<string, BOMEntry>();

    for (const cell of gridAssignments) {
      for (const planting of cell.plantings) {
        const resolvedId = actions.getResolvedSpeciesId(planting.id, planting.decodedSpeciesId);
        const species = plantDatabaseMap.get(resolvedId);
        if (!species) continue;

        const existing = map.get(resolvedId);
        if (existing) {
          existing.totalQuantity += planting.quantity;
          if (!existing.cellLocations.includes(cell.id)) {
            existing.cellLocations.push(cell.id);
          }
          existing.estimatedTotalCost = existing.totalQuantity * species.estimatedCostPerPlant;
          if (confidenceRank[planting.confidence] < confidenceRank[existing.confidence]) {
            existing.confidence = planting.confidence;
          }
        } else {
          map.set(resolvedId, {
            speciesId: resolvedId,
            species,
            totalQuantity: planting.quantity,
            cellLocations: [cell.id],
            estimatedTotalCost: planting.quantity * species.estimatedCostPerPlant,
            confidence: planting.confidence,
          });
        }
      }
    }

    return Array.from(map.values());
  }, [actions]);

  const filtered = useMemo(() => {
    let result = entries;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        e =>
          e.species.commonName.toLowerCase().includes(q) ||
          e.species.scientificName.toLowerCase().includes(q) ||
          e.species.category.includes(q)
      );
    }
    result.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case 'name': cmp = a.species.commonName.localeCompare(b.species.commonName); break;
        case 'quantity': cmp = a.totalQuantity - b.totalQuantity; break;
        case 'cost': cmp = a.estimatedTotalCost - b.estimatedTotalCost; break;
        case 'category': cmp = a.species.category.localeCompare(b.species.category); break;
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return result;
  }, [entries, search, sortKey, sortDir]);

  const totals = useMemo(() => ({
    plants: filtered.reduce((s, e) => s + e.totalQuantity, 0),
    species: filtered.length,
    cost: filtered.reduce((s, e) => s + e.estimatedTotalCost, 0),
  }), [filtered]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const handleExport = () => {
    downloadCSV(generateCSV(filtered), 'rye-kitchen-garden-bom.csv');
  };

  const SortHeader = ({ label, k }: { label: string; k: SortKey }) => (
    <button
      onClick={() => handleSort(k)}
      className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-text-secondary hover:text-text-primary"
    >
      {label}
      <ArrowUpDown className="w-3 h-3" />
    </button>
  );

  return (
    <div className="max-w-[1400px] mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-garden-700">Bill of Materials</h2>
          <p className="text-sm text-text-secondary mt-1">
            {totals.species} species &middot; {totals.plants} total plants &middot; ~${totals.cost.toFixed(0)} estimated
          </p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-garden-500 text-white rounded-lg hover:bg-garden-600 transition-colors text-sm font-medium no-print"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="relative mb-4 no-print">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search species..."
          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-garden-400 bg-white"
        />
      </div>

      <div className="bg-surface rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-gray-50/80">
                <th className="text-left px-4 py-3"><SortHeader label="Plant" k="name" /></th>
                <th className="text-left px-4 py-3"><SortHeader label="Category" k="category" /></th>
                <th className="text-right px-4 py-3"><SortHeader label="Qty" k="quantity" /></th>
                <th className="text-left px-4 py-3 hidden md:table-cell">
                  <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Locations</span>
                </th>
                <th className="text-right px-4 py-3"><SortHeader label="Est. Cost" k="cost" /></th>
                <th className="text-center px-4 py-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Confidence</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filtered.map(entry => (
                <tr key={entry.speciesId} className="hover:bg-garden-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium">{entry.species.commonName}</div>
                    <div className="text-xs text-text-secondary italic">{entry.species.scientificName}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="capitalize text-xs bg-gray-100 text-text-secondary px-2 py-0.5 rounded-full">
                      {entry.species.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-medium">{entry.totalQuantity}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {entry.cellLocations.slice(0, 5).map(loc => (
                        <span key={loc} className="text-xs bg-garden-100 text-garden-700 px-1.5 py-0.5 rounded font-mono">
                          {loc}
                        </span>
                      ))}
                      {entry.cellLocations.length > 5 && (
                        <span className="text-xs text-text-secondary">+{entry.cellLocations.length - 5}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-mono">${entry.estimatedTotalCost.toFixed(0)}</td>
                  <td className="px-4 py-3 text-center">
                    <ConfidenceBadge confidence={entry.confidence} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-border bg-garden-50 px-4 py-3 flex items-center justify-between text-sm font-medium">
          <span className="text-garden-700">
            Total: {totals.species} species, {totals.plants} plants
          </span>
          <span className="text-garden-700 font-mono">
            ~${totals.cost.toFixed(0)} estimated
          </span>
        </div>
      </div>
    </div>
  );
}
