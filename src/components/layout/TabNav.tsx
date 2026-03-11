import { Map, ShoppingCart, Sprout } from 'lucide-react';
import { useGarden } from '../../hooks/useGardenState';
import type { TabId } from '../../types';

const tabs: { id: TabId; label: string; icon: typeof Map }[] = [
  { id: 'map', label: 'Garden Map', icon: Map },
  { id: 'bom', label: 'Bill of Materials', icon: ShoppingCart },
  { id: 'companions', label: 'Companion Analysis', icon: Sprout },
];

export function TabNav() {
  const { state, actions } = useGarden();

  return (
    <nav className="bg-surface border-b border-border no-print">
      <div className="max-w-[1400px] mx-auto flex">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const active = state.selectedTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => actions.selectTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                active
                  ? 'border-garden-500 text-garden-600'
                  : 'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
