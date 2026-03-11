import { useRef, useState, useCallback, useEffect } from 'react';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { GridOverlay } from './GridOverlay';
import { useGarden } from '../../hooks/useGardenState';
import { rowColFromCellId, getCellBounds, MAP_WIDTH } from '../../utils/gridMath';

export function MapCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { state } = useGarden();
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [smooth, setSmooth] = useState(false);

  // Auto-zoom to selected cell
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!state.selectedCellId) {
      setSmooth(true);
      setZoom(1);
      setPan({ x: 0, y: 0 });
      const t = setTimeout(() => setSmooth(false), 400);
      return () => clearTimeout(t);
    }

    const { row, col } = rowColFromCellId(state.selectedCellId);
    const bounds = getCellBounds(row, col);
    const cellCenterX = bounds.x + bounds.width / 2;
    const cellCenterY = bounds.y + bounds.height / 2;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const scale = containerWidth / MAP_WIDTH;

    const targetZoom = 2.5;
    const renderedCX = cellCenterX * scale;
    const renderedCY = cellCenterY * scale;

    setSmooth(true);
    setZoom(targetZoom);
    setPan({
      x: containerWidth / 2 - renderedCX * targetZoom,
      y: containerHeight / 2 - renderedCY * targetZoom,
    });
    const t = setTimeout(() => setSmooth(false), 400);
    return () => clearTimeout(t);
  }, [state.selectedCellId]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    setZoom(z => Math.min(4, Math.max(1, z + delta)));
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  }, [zoom, pan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  }, [dragging, dragStart]);

  const handleMouseUp = useCallback(() => setDragging(false), []);

  const resetView = useCallback(() => {
    setSmooth(true);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setTimeout(() => setSmooth(false), 400);
  }, []);

  return (
    <div className="relative flex-1 overflow-hidden bg-gray-900 rounded-lg">
      {/* Zoom controls */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1 no-print">
        <button
          onClick={() => setZoom(z => Math.min(4, z + 0.3))}
          className="bg-surface/90 backdrop-blur p-1.5 rounded-lg shadow hover:bg-white transition-colors"
          title="Zoom in"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoom(z => Math.max(1, z - 0.3))}
          className="bg-surface/90 backdrop-blur p-1.5 rounded-lg shadow hover:bg-white transition-colors"
          title="Zoom out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={resetView}
          className="bg-surface/90 backdrop-blur p-1.5 rounded-lg shadow hover:bg-white transition-colors"
          title="Reset view"
        >
          <Maximize className="w-4 h-4" />
        </button>
        <span className="text-[10px] text-white/70 text-center mt-1">{Math.round(zoom * 100)}%</span>
      </div>

      {/* Map container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="relative origin-top-left"
          style={{
            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
            transition: smooth ? 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' : 'transform 0.1s',
          }}
        >
          <img
            src="/garden-map.png"
            alt="Rye Kitchen Garden Map"
            className="w-full h-auto block"
            draggable={false}
          />
          <GridOverlay />
        </div>
      </div>
    </div>
  );
}
