import { useGarden } from '../../hooks/useGardenState';
import { MapCanvas } from './MapCanvas';
import { CellDetailPanel } from './CellDetailPanel';
import { MapLegend } from './MapLegend';

export function GardenMap() {
  const { state } = useGarden();

  return (
    <div className="flex h-[calc(100vh-120px)]">
      <div className="relative flex-1 p-3 min-w-0">
        <MapCanvas />
        <MapLegend />
      </div>
      {state.selectedCellId && <CellDetailPanel />}
    </div>
  );
}
