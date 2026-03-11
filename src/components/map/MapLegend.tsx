import { Info } from 'lucide-react';
import { useState } from 'react';

export function MapLegend() {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute bottom-3 left-3 z-10 no-print">
      <button
        onClick={() => setOpen(!open)}
        className="bg-surface/90 backdrop-blur p-1.5 rounded-lg shadow hover:bg-white transition-colors"
        title="Map legend"
      >
        <Info className="w-4 h-4" />
      </button>
      {open && (
        <div className="absolute bottom-10 left-0 bg-surface/95 backdrop-blur rounded-xl shadow-xl border border-border p-4 w-64">
          <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">Legend</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-emerald-100 border border-emerald-300" />
              <span>High confidence decoding</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-amber-100 border border-amber-300" />
              <span>Medium confidence</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-red-100 border border-red-300" />
              <span>Low confidence (needs review)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-blue-100 border border-blue-300" />
              <span>User-corrected</span>
            </div>
            <hr className="border-border" />
            <p className="text-text-secondary">Click a grid cell to view its plantings. Click the pencil icon to correct a decoding.</p>
          </div>
        </div>
      )}
    </div>
  );
}
