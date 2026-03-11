import type { BOMEntry } from '../types';

export function generateCSV(entries: BOMEntry[]): string {
  const headers = [
    'Common Name',
    'Scientific Name',
    'Category',
    'Quantity',
    'Grid Locations',
    'Height (in)',
    'Spread (in)',
    'Sun',
    'Moisture',
    'Bloom Season',
    'Bloom Color',
    'Est. Cost/Plant',
    'Est. Total Cost',
    'Confidence',
  ];

  const rows = entries.map(e => [
    e.species.commonName,
    e.species.scientificName,
    e.species.category,
    e.totalQuantity,
    e.cellLocations.join('; '),
    `${e.species.heightRange[0]}-${e.species.heightRange[1]}`,
    `${e.species.spreadRange[0]}-${e.species.spreadRange[1]}`,
    e.species.sunRequirement,
    e.species.moistureRequirement,
    e.species.bloomSeason.join(', '),
    e.species.bloomColor.join(', '),
    `$${e.species.estimatedCostPerPlant.toFixed(2)}`,
    `$${e.estimatedTotalCost.toFixed(2)}`,
    e.confidence,
  ]);

  const csvContent = [headers, ...rows]
    .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');

  return csvContent;
}

export function downloadCSV(csv: string, filename: string) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
