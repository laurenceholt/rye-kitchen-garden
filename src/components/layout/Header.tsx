import { Leaf } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-garden-500 text-white px-6 py-4 no-print">
      <div className="max-w-[1400px] mx-auto flex items-center gap-3">
        <Leaf className="w-7 h-7" />
        <div>
          <h1 className="text-xl font-serif font-bold tracking-tight">Rye Kitchen Garden</h1>
          <p className="text-garden-200 text-sm">Interactive planting map &middot; New York</p>
        </div>
        <div className="ml-auto flex items-center gap-2 text-sm text-garden-200">
          <span className="bg-garden-600 px-2 py-0.5 rounded text-xs">60px = 1ft</span>
          <span className="bg-garden-600 px-2 py-0.5 rounded text-xs">10 &times; 10 grid</span>
        </div>
      </div>
    </header>
  );
}
