import { MAP_WIDTH, MAP_HEIGHT, GRID_COLS, GRID_ROWS, CELL_WIDTH, CELL_HEIGHT, cellIdFromRowCol } from '../../utils/gridMath';
import { useGarden } from '../../hooks/useGardenState';

export function GridOverlay() {
  const { state, actions } = useGarden();
  const cells: { row: number; col: number; id: string }[] = [];

  for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS; c++) {
      cells.push({ row: r, col: c, id: cellIdFromRowCol(r, c) });
    }
  }

  return (
    <svg
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    >
      {cells.map(cell => {
        const x = cell.col * CELL_WIDTH;
        const y = cell.row * CELL_HEIGHT;
        const isSelected = state.selectedCellId === cell.id;

        return (
          <g key={cell.id} style={{ pointerEvents: 'all', cursor: 'pointer' }}
            onClick={() => actions.selectCell(isSelected ? null : cell.id)}
          >
            <rect
              x={x}
              y={y}
              width={CELL_WIDTH}
              height={CELL_HEIGHT}
              fill={isSelected ? 'rgba(45, 90, 39, 0.2)' : 'transparent'}
              stroke={isSelected ? '#2d5a27' : 'rgba(255,255,255,0.5)'}
              strokeWidth={isSelected ? 2 : 0.5}
              className="hover:fill-[rgba(45,90,39,0.1)] transition-colors"
            />
            <text
              x={x + 4}
              y={y + 14}
              fontSize="11"
              fontWeight="600"
              fill={isSelected ? '#2d5a27' : 'rgba(255,255,255,0.85)'}
              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)', userSelect: 'none' }}
            >
              {cell.id}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
