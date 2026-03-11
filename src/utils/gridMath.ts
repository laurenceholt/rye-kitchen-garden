export const MAP_WIDTH = 1280;
export const MAP_HEIGHT = 960;
export const GRID_COLS = 10;
export const GRID_ROWS = 10;
export const CELL_WIDTH = MAP_WIDTH / GRID_COLS;
export const CELL_HEIGHT = MAP_HEIGHT / GRID_ROWS;

export function cellIdFromRowCol(row: number, col: number): string {
  return `${String.fromCharCode(65 + row)}${col + 1}`;
}

export function rowColFromCellId(cellId: string): { row: number; col: number } {
  const row = cellId.charCodeAt(0) - 65;
  const col = parseInt(cellId.slice(1)) - 1;
  return { row, col };
}

export function getCellBounds(row: number, col: number) {
  return {
    x: col * CELL_WIDTH,
    y: row * CELL_HEIGHT,
    width: CELL_WIDTH,
    height: CELL_HEIGHT,
  };
}
