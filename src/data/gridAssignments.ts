import type { GridCell } from '../types';

// Grid: 10 rows (A-J, top to bottom) x 10 cols (1-10, left to right)
// Image is ~1280x960px, each cell is ~128x96px
// Scale: 60px = 1 foot (from map legend)

export const gridAssignments: GridCell[] = [
  // === ROW A (top row, y: 0-96) ===
  {
    row: 0, col: 0, id: 'A1',
    plantings: [
      { id: 'A1-1', abbreviation: 'coreopsis mix', decodedSpeciesId: 'coreopsis', confidence: 'high', quantity: 3 },
    ],
    structures: [],
  },
  {
    row: 0, col: 1, id: 'A2',
    plantings: [
      { id: 'A2-1', abbreviation: 'PLANTER', decodedSpeciesId: 'lettuce', confidence: 'high', quantity: 1 },
      { id: 'A2-2', abbreviation: 'PLANTER', decodedSpeciesId: 'tomatoes', confidence: 'high', quantity: 1 },
    ],
    structures: ['planter'],
  },
  {
    row: 0, col: 2, id: 'A3',
    plantings: [
      { id: 'A3-1', abbreviation: 'PLANTER', decodedSpeciesId: 'potatoes', confidence: 'high', quantity: 1 },
      { id: 'A3-2', abbreviation: 'aruncus horatia', decodedSpeciesId: 'aruncus-horatia', confidence: 'high', quantity: 1 },
      { id: 'A3-3', abbreviation: 'beans', decodedSpeciesId: 'beans', confidence: 'high', quantity: 2 },
    ],
    structures: ['planter'],
  },
  {
    row: 0, col: 3, id: 'A4',
    plantings: [
      { id: 'A4-1', abbreviation: 'ECH.PA', decodedSpeciesId: 'echinacea-pallida', confidence: 'high', quantity: 1 },
      { id: 'A4-2', abbreviation: '*stipa barbata', decodedSpeciesId: 'stipa-barbata', confidence: 'high', quantity: 2 },
      { id: 'A4-3', abbreviation: 'liatris', decodedSpeciesId: 'liatris', confidence: 'high', quantity: 2 },
    ],
    structures: [],
  },
  {
    row: 0, col: 4, id: 'A5',
    plantings: [
      { id: 'A5-1', abbreviation: 'SA', decodedSpeciesId: 'salvia', confidence: 'high', quantity: 4 },
      { id: 'A5-2', abbreviation: 'verbena b', decodedSpeciesId: 'verbena-bonariensis', confidence: 'high', quantity: 3 },
      { id: 'A5-3', abbreviation: 'knautia', decodedSpeciesId: 'knautia', confidence: 'high', quantity: 2 },
      { id: 'A5-4', abbreviation: 'ECH', decodedSpeciesId: 'echinacea-purpurea', confidence: 'high', quantity: 2 },
    ],
    structures: [],
  },
  {
    row: 0, col: 5, id: 'A6',
    plantings: [
      { id: 'A6-1', abbreviation: 'SA', decodedSpeciesId: 'salvia', confidence: 'high', quantity: 3 },
      { id: 'A6-2', abbreviation: 'baltic parsley', decodedSpeciesId: 'baltic-parsley', confidence: 'high', quantity: 2 },
      { id: 'A6-3', abbreviation: 'liatris', decodedSpeciesId: 'liatris', confidence: 'high', quantity: 2 },
      { id: 'A6-4', abbreviation: '*stipa barbata', decodedSpeciesId: 'stipa-barbata', confidence: 'high', quantity: 2 },
    ],
    structures: [],
  },
  {
    row: 0, col: 6, id: 'A7',
    plantings: [
      { id: 'A7-1', abbreviation: 'verbena b', decodedSpeciesId: 'verbena-bonariensis', confidence: 'high', quantity: 2 },
      { id: 'A7-2', abbreviation: 'ceph gig', decodedSpeciesId: 'cephalaria-gigantea', confidence: 'high', quantity: 2 },
      { id: 'A7-3', abbreviation: 'echinops', decodedSpeciesId: 'echinops', confidence: 'high', quantity: 1 },
      { id: 'A7-4', abbreviation: 'STP.G', decodedSpeciesId: 'stipa-tenuissima', confidence: 'high', quantity: 2 },
    ],
    structures: [],
  },
  {
    row: 0, col: 7, id: 'A8',
    plantings: [
      { id: 'A8-1', abbreviation: 'sprinter BX', decodedSpeciesId: 'sprinter-bx', confidence: 'high', quantity: 1 },
      { id: 'A8-2', abbreviation: 'baltic parsley', decodedSpeciesId: 'baltic-parsley', confidence: 'high', quantity: 2 },
      { id: 'A8-3', abbreviation: 'veronica Red Arrow', decodedSpeciesId: 'veronica-red-arrow', confidence: 'high', quantity: 1 },
      { id: 'A8-4', abbreviation: 'ACH', decodedSpeciesId: 'achillea', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 0, col: 8, id: 'A9',
    plantings: [
      { id: 'A9-1', abbreviation: 'sea holly', decodedSpeciesId: 'sea-holly', confidence: 'high', quantity: 2 },
      { id: 'A9-2', abbreviation: 'monarda b', decodedSpeciesId: 'monarda-bradburiana', confidence: 'high', quantity: 1 },
      { id: 'A9-3', abbreviation: 'PHLX.PAND', decodedSpeciesId: 'phlox-paniculata-david', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 0, col: 9, id: 'A10',
    plantings: [
      { id: 'A10-1', abbreviation: 'cherry', decodedSpeciesId: 'cherry', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },

  // === ROW B (y: 96-192) ===
  {
    row: 1, col: 0, id: 'B1',
    plantings: [
      { id: 'B1-1', abbreviation: 'wood spurge', decodedSpeciesId: 'wood-spurge', confidence: 'high', quantity: 2 },
    ],
    structures: [],
  },
  {
    row: 1, col: 1, id: 'B2',
    plantings: [
      { id: 'B2-1', abbreviation: 'veronica LAV', decodedSpeciesId: 'veronica-lav', confidence: 'high', quantity: 1 },
      { id: 'B2-2', abbreviation: 'ECH.PA', decodedSpeciesId: 'echinacea-pallida', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 1, col: 2, id: 'B3',
    plantings: [
      { id: 'B3-1', abbreviation: 'yellow hyssop', decodedSpeciesId: 'hyssop', confidence: 'high', quantity: 1 },
      { id: 'B3-2', abbreviation: 'ECH', decodedSpeciesId: 'echinacea-purpurea', confidence: 'high', quantity: 3 },
      { id: 'B3-3', abbreviation: 'SA', decodedSpeciesId: 'salvia', confidence: 'high', quantity: 2 },
      { id: 'B3-4', abbreviation: 'ECH.PV', decodedSpeciesId: 'echinacea-purpurea-vintage-wine', confidence: 'high', quantity: 2 },
    ],
    structures: [],
  },
  {
    row: 1, col: 3, id: 'B4',
    plantings: [
      { id: 'B4-1', abbreviation: 'knautia', decodedSpeciesId: 'knautia', confidence: 'high', quantity: 2 },
      { id: 'B4-2', abbreviation: 'ECH.PV', decodedSpeciesId: 'echinacea-purpurea-vintage-wine', confidence: 'high', quantity: 1 },
      { id: 'B4-3', abbreviation: 'ACH', decodedSpeciesId: 'achillea', confidence: 'high', quantity: 1 },
      { id: 'B4-4', abbreviation: 'rudbeck sub', decodedSpeciesId: 'rudbeckia', confidence: 'medium', quantity: 2 },
    ],
    structures: [],
  },
  {
    row: 1, col: 4, id: 'B5',
    plantings: [
      { id: 'B5-1', abbreviation: 'STP.G', decodedSpeciesId: 'stipa-tenuissima', confidence: 'high', quantity: 3 },
      { id: 'B5-2', abbreviation: 'PHLX.PAN', decodedSpeciesId: 'phlox-paniculata-david', confidence: 'high', quantity: 1 },
    ],
    structures: ['pond'],
  },
  {
    row: 1, col: 5, id: 'B6',
    plantings: [
      { id: 'B6-1', abbreviation: 'meadow rue', decodedSpeciesId: 'meadow-rue', confidence: 'high', quantity: 1 },
      { id: 'B6-2', abbreviation: 'salvia', decodedSpeciesId: 'salvia', confidence: 'high', quantity: 1 },
    ],
    structures: ['pond'],
  },
  {
    row: 1, col: 6, id: 'B7',
    plantings: [
      { id: 'B7-1', abbreviation: 'VERB.OLYM', decodedSpeciesId: 'verbascum-olympicum', confidence: 'high', quantity: 2 },
      { id: 'B7-2', abbreviation: 'VV', decodedSpeciesId: 'vernonia', confidence: 'medium', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 1, col: 7, id: 'B8',
    plantings: [
      { id: 'B8-1', abbreviation: 'veronica Red Arrow', decodedSpeciesId: 'veronica-red-arrow', confidence: 'high', quantity: 2 },
      { id: 'B8-2', abbreviation: 'monarda b', decodedSpeciesId: 'monarda-bradburiana', confidence: 'high', quantity: 2 },
    ],
    structures: [],
  },
  {
    row: 1, col: 8, id: 'B9',
    plantings: [
      { id: 'B9-1', abbreviation: 'phlox', decodedSpeciesId: 'phlox', confidence: 'high', quantity: 2 },
      { id: 'B9-2', abbreviation: 'thyme', decodedSpeciesId: 'thyme', confidence: 'high', quantity: 1 },
      { id: 'B9-3', abbreviation: 'sprinter BX', decodedSpeciesId: 'sprinter-bx', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 1, col: 9, id: 'B10',
    plantings: [
      { id: 'B10-1', abbreviation: 'RS', decodedSpeciesId: 'russian-sage', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },

  // === ROW C (y: 192-288) ===
  {
    row: 2, col: 0, id: 'C1',
    plantings: [
      { id: 'C1-1', abbreviation: 'KF', decodedSpeciesId: 'karl-foerster', confidence: 'high', quantity: 2 },
      { id: 'C1-2', abbreviation: 'YRW', decodedSpeciesId: 'achillea', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 2, col: 1, id: 'C2',
    plantings: [
      { id: 'C2-1', abbreviation: 'PHLX.PAN', decodedSpeciesId: 'phlox-paniculata-david', confidence: 'high', quantity: 1 },
    ],
    structures: ['pond'],
  },
  {
    row: 2, col: 2, id: 'C3',
    plantings: [],
    structures: ['pond'],
  },
  {
    row: 2, col: 3, id: 'C4',
    plantings: [],
    structures: ['pond'],
  },
  {
    row: 2, col: 4, id: 'C5',
    plantings: [],
    structures: ['pond'],
  },
  {
    row: 2, col: 5, id: 'C6',
    plantings: [
      { id: 'C6-1', abbreviation: 'STP.G', decodedSpeciesId: 'stipa-tenuissima', confidence: 'high', quantity: 2 },
    ],
    structures: [],
  },
  {
    row: 2, col: 6, id: 'C7',
    plantings: [
      { id: 'C7-1', abbreviation: 'little blue stem', decodedSpeciesId: 'little-bluestem', confidence: 'medium', quantity: 3 },
      { id: 'C7-2', abbreviation: 'sage', decodedSpeciesId: 'sage', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 2, col: 7, id: 'C8',
    plantings: [
      { id: 'C8-1', abbreviation: 'veronica Red Arrow', decodedSpeciesId: 'veronica-red-arrow', confidence: 'high', quantity: 1 },
      { id: 'C8-2', abbreviation: 'VERB.OLYM', decodedSpeciesId: 'verbascum-olympicum', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 2, col: 8, id: 'C9',
    plantings: [
      { id: 'C9-1', abbreviation: 'sprinter BX', decodedSpeciesId: 'sprinter-bx', confidence: 'high', quantity: 1 },
      { id: 'C9-2', abbreviation: 'veronica Red Arrow', decodedSpeciesId: 'veronica-red-arrow', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 2, col: 9, id: 'C10',
    plantings: [],
    structures: ['basement-stairs'],
  },

  // === ROW D (y: 288-384) ===
  {
    row: 3, col: 0, id: 'D1',
    plantings: [
      { id: 'D1-1', abbreviation: 'lavender', decodedSpeciesId: 'lavender', confidence: 'high', quantity: 2 },
      { id: 'D1-2', abbreviation: 'ECHP', decodedSpeciesId: 'echinacea-purpurea', confidence: 'high', quantity: 1 },
      { id: 'D1-3', abbreviation: 'sprinter BX', decodedSpeciesId: 'sprinter-bx', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 3, col: 1, id: 'D2',
    plantings: [
      { id: 'D2-1', abbreviation: 'ACH', decodedSpeciesId: 'achillea', confidence: 'high', quantity: 2 },
      { id: 'D2-2', abbreviation: 'Verbas.Nigrum', decodedSpeciesId: 'verbascum-nigrum', confidence: 'medium', quantity: 2 },
      { id: 'D2-3', abbreviation: 'russian sage', decodedSpeciesId: 'russian-sage', confidence: 'high', quantity: 1 },
      { id: 'D2-4', abbreviation: 'ERYN.BOU', decodedSpeciesId: 'eryngium-bourgatii', confidence: 'medium', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 3, col: 2, id: 'D3',
    plantings: [
      { id: 'D3-1', abbreviation: 'monarda b', decodedSpeciesId: 'monarda', confidence: 'high', quantity: 3 },
      { id: 'D3-2', abbreviation: 'SA grass', decodedSpeciesId: 'sa-grass', confidence: 'medium', quantity: 1 },
      { id: 'D3-3', abbreviation: 'monarda', decodedSpeciesId: 'monarda', confidence: 'high', quantity: 2 },
    ],
    structures: [],
  },
  {
    row: 3, col: 3, id: 'D4',
    plantings: [
      { id: 'D4-1', abbreviation: 'salvia', decodedSpeciesId: 'salvia', confidence: 'high', quantity: 2 },
      { id: 'D4-2', abbreviation: 'aster SYM.LAE', decodedSpeciesId: 'aster-sym-lae', confidence: 'medium', quantity: 2 },
      { id: 'D4-3', abbreviation: 'NC', decodedSpeciesId: 'nepeta', confidence: 'medium', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 3, col: 4, id: 'D5',
    plantings: [
      { id: 'D5-1', abbreviation: 'aster SYM.LAE', decodedSpeciesId: 'aster-sym-lae', confidence: 'medium', quantity: 1 },
      { id: 'D5-2', abbreviation: 'golden rod', decodedSpeciesId: 'golden-rod', confidence: 'high', quantity: 3 },
    ],
    structures: [],
  },
  {
    row: 3, col: 5, id: 'D6',
    plantings: [
      { id: 'D6-1', abbreviation: 'golden rod', decodedSpeciesId: 'golden-rod', confidence: 'high', quantity: 2 },
      { id: 'D6-2', abbreviation: 'JPYW', decodedSpeciesId: 'joe-pye-weed', confidence: 'medium', quantity: 2 },
    ],
    structures: [],
  },
  {
    row: 3, col: 6, id: 'D7',
    plantings: [
      { id: 'D7-1', abbreviation: 'JPYW', decodedSpeciesId: 'joe-pye-weed', confidence: 'medium', quantity: 2 },
      { id: 'D7-2', abbreviation: 'sang blk', decodedSpeciesId: 'sanguisorba', confidence: 'medium', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 3, col: 7, id: 'D8',
    plantings: [
      { id: 'D8-1', abbreviation: 'PHL.TUBA', decodedSpeciesId: 'phlox-tuba', confidence: 'medium', quantity: 1 },
      { id: 'D8-2', abbreviation: 'JSBF', decodedSpeciesId: 'joe-pye-weed', confidence: 'medium', quantity: 2 },
      { id: 'D8-3', abbreviation: 'EchG', decodedSpeciesId: 'echinacea-green-jewel', confidence: 'medium', quantity: 2 },
    ],
    structures: [],
  },
  {
    row: 3, col: 8, id: 'D9',
    plantings: [
      { id: 'D9-1', abbreviation: 'PHLX.PAND', decodedSpeciesId: 'phlox-paniculata-david', confidence: 'high', quantity: 1 },
      { id: 'D9-2', abbreviation: 'EchG', decodedSpeciesId: 'echinacea-green-jewel', confidence: 'medium', quantity: 1 },
      { id: 'D9-3', abbreviation: 'VERB.OLYM', decodedSpeciesId: 'verbascum-olympicum', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 3, col: 9, id: 'D10',
    plantings: [
      { id: 'D10-1', abbreviation: 'verbas cum horatia', decodedSpeciesId: 'aruncus-horatia', confidence: 'low', quantity: 2 },
    ],
    structures: ['barbecue'],
  },

  // === ROW E (y: 384-480) ===
  {
    row: 4, col: 0, id: 'E1',
    plantings: [
      { id: 'E1-1', abbreviation: 'lavender thyme oregano', decodedSpeciesId: 'lavender', confidence: 'high', quantity: 1 },
      { id: 'E1-2', abbreviation: 'thyme', decodedSpeciesId: 'thyme', confidence: 'high', quantity: 1 },
      { id: 'E1-3', abbreviation: 'oregano', decodedSpeciesId: 'oregano', confidence: 'high', quantity: 1 },
      { id: 'E1-4', abbreviation: 'echinops', decodedSpeciesId: 'echinops', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 4, col: 1, id: 'E2',
    plantings: [
      { id: 'E2-1', abbreviation: 'fennel', decodedSpeciesId: 'fennel', confidence: 'high', quantity: 2 },
      { id: 'E2-2', abbreviation: 'foxtail lily', decodedSpeciesId: 'foxtail-lily', confidence: 'medium', quantity: 2 },
      { id: 'E2-3', abbreviation: 'Verbas.Nigrum', decodedSpeciesId: 'verbascum-nigrum', confidence: 'medium', quantity: 1 },
      { id: 'E2-4', abbreviation: 'BAP.AUS', decodedSpeciesId: 'baptisia-australis', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 4, col: 2, id: 'E3',
    plantings: [
      { id: 'E3-1', abbreviation: 'PVG*', decodedSpeciesId: 'panicum-virgatum', confidence: 'high', quantity: 1 },
      { id: 'E3-2', abbreviation: 'viburnum Dawn', decodedSpeciesId: 'viburnum', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 4, col: 3, id: 'E4',
    plantings: [
      { id: 'E4-1', abbreviation: 'WH', decodedSpeciesId: 'muhlenbergia-white-cloud', confidence: 'medium', quantity: 2 },
      { id: 'E4-2', abbreviation: 'ACH', decodedSpeciesId: 'achillea', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 4, col: 4, id: 'E5',
    plantings: [
      { id: 'E5-1', abbreviation: 'STP.G', decodedSpeciesId: 'stipa-tenuissima', confidence: 'high', quantity: 1 },
      { id: 'E5-2', abbreviation: 'russian sage', decodedSpeciesId: 'russian-sage', confidence: 'high', quantity: 2 },
    ],
    structures: [],
  },
  {
    row: 4, col: 5, id: 'E6',
    plantings: [
      { id: 'E6-1', abbreviation: 'ACH', decodedSpeciesId: 'achillea', confidence: 'high', quantity: 1 },
      { id: 'E6-2', abbreviation: 'JPYW', decodedSpeciesId: 'joe-pye-weed', confidence: 'medium', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 4, col: 6, id: 'E7',
    plantings: [
      { id: 'E7-1', abbreviation: 'ceph gig', decodedSpeciesId: 'cephalaria-gigantea', confidence: 'high', quantity: 1 },
      { id: 'E7-2', abbreviation: 'sprob', decodedSpeciesId: 'sprinter-bx', confidence: 'low', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 4, col: 7, id: 'E8',
    plantings: [
      { id: 'E8-1', abbreviation: 'VERB.OLYM', decodedSpeciesId: 'verbascum-olympicum', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 4, col: 8, id: 'E9',
    plantings: [
      { id: 'E9-1', abbreviation: 'aruncus horatia', decodedSpeciesId: 'aruncus-horatia', confidence: 'high', quantity: 2 },
      { id: 'E9-2', abbreviation: 'PHLX.NC', decodedSpeciesId: 'phlox', confidence: 'medium', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 4, col: 9, id: 'E10',
    plantings: [
      { id: 'E10-1', abbreviation: 'STP.G', decodedSpeciesId: 'stipa-tenuissima', confidence: 'high', quantity: 1 },
    ],
    structures: ['barbecue'],
  },

  // === ROW F (y: 480-576) ===
  {
    row: 5, col: 0, id: 'F1',
    plantings: [
      { id: 'F1-1', abbreviation: 'sprinter BX', decodedSpeciesId: 'sprinter-bx', confidence: 'high', quantity: 1 },
      { id: 'F1-2', abbreviation: 'echinops', decodedSpeciesId: 'echinops', confidence: 'high', quantity: 1 },
      { id: 'F1-3', abbreviation: 'rattlesnake', decodedSpeciesId: 'rattlesnake-master', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 5, col: 1, id: 'F2',
    plantings: [
      { id: 'F2-1', abbreviation: 'Verbas.Nigrum', decodedSpeciesId: 'verbascum-nigrum', confidence: 'medium', quantity: 2 },
      { id: 'F2-2', abbreviation: 'veronica Red Arrow', decodedSpeciesId: 'veronica-red-arrow', confidence: 'high', quantity: 1 },
      { id: 'F2-3', abbreviation: 'PnR', decodedSpeciesId: 'pennisetum', confidence: 'low', quantity: 2 },
    ],
    structures: [],
  },
  {
    row: 5, col: 2, id: 'F3',
    plantings: [
      { id: 'F3-1', abbreviation: 'persicaria polymorpha', decodedSpeciesId: 'persicaria-polymorpha', confidence: 'high', quantity: 2 },
      { id: 'F3-2', abbreviation: 'VV', decodedSpeciesId: 'vernonia', confidence: 'medium', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 5, col: 3, id: 'F4',
    plantings: [
      { id: 'F4-1', abbreviation: 'EchPV', decodedSpeciesId: 'echinacea-purpurea-vintage-wine', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 5, col: 4, id: 'F5',
    plantings: [
      { id: 'F5-1', abbreviation: 'ACH', decodedSpeciesId: 'achillea', confidence: 'high', quantity: 1 },
      { id: 'F5-2', abbreviation: 'russian sage', decodedSpeciesId: 'russian-sage', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 5, col: 5, id: 'F6',
    plantings: [
      { id: 'F6-1', abbreviation: 'JPYW', decodedSpeciesId: 'joe-pye-weed', confidence: 'medium', quantity: 1 },
      { id: 'F6-2', abbreviation: 'san guisorba squirrel', decodedSpeciesId: 'san-guisorba-squirrel', confidence: 'medium', quantity: 2 },
    ],
    structures: [],
  },
  {
    row: 5, col: 6, id: 'F7',
    plantings: [
      { id: 'F7-1', abbreviation: 'PVG', decodedSpeciesId: 'panicum-virgatum', confidence: 'high', quantity: 2 },
      { id: 'F7-2', abbreviation: 'swamp milkweed', decodedSpeciesId: 'swamp-milkweed', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 5, col: 7, id: 'F8',
    plantings: [
      { id: 'F8-1', abbreviation: 'PVG', decodedSpeciesId: 'panicum-virgatum', confidence: 'high', quantity: 2 },
      { id: 'F8-2', abbreviation: 'red twig dogwood', decodedSpeciesId: 'red-twig-dogwood', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 5, col: 8, id: 'F9',
    plantings: [
      { id: 'F9-1', abbreviation: 'LBC', decodedSpeciesId: 'little-bluestem', confidence: 'medium', quantity: 3 },
    ],
    structures: [],
  },
  {
    row: 5, col: 9, id: 'F10',
    plantings: [
      { id: 'F10-1', abbreviation: 'little spire', decodedSpeciesId: 'little-spire', confidence: 'medium', quantity: 3 },
      { id: 'F10-2', abbreviation: 'EchP', decodedSpeciesId: 'echinacea-purpurea', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },

  // === ROW G (y: 576-672) ===
  {
    row: 6, col: 0, id: 'G1',
    plantings: [
      { id: 'G1-1', abbreviation: 'nepeta', decodedSpeciesId: 'nepeta', confidence: 'high', quantity: 2 },
      { id: 'G1-2', abbreviation: 'verbena b', decodedSpeciesId: 'verbena-bonariensis', confidence: 'high', quantity: 1 },
      { id: 'G1-3', abbreviation: 'SB', decodedSpeciesId: 'salvia', confidence: 'medium', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 6, col: 1, id: 'G2',
    plantings: [
      { id: 'G2-1', abbreviation: 'rudbeckia sub', decodedSpeciesId: 'rudbeckia', confidence: 'high', quantity: 2 },
      { id: 'G2-2', abbreviation: 'nepeta', decodedSpeciesId: 'nepeta', confidence: 'high', quantity: 1 },
      { id: 'G2-3', abbreviation: 'salvia', decodedSpeciesId: 'salvia', confidence: 'high', quantity: 2 },
      { id: 'G2-4', abbreviation: 'echinops', decodedSpeciesId: 'echinops', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 6, col: 2, id: 'G3',
    plantings: [
      { id: 'G3-1', abbreviation: 'WH', decodedSpeciesId: 'muhlenbergia-white-cloud', confidence: 'medium', quantity: 1 },
      { id: 'G3-2', abbreviation: 'monarda brad', decodedSpeciesId: 'monarda-bradburiana', confidence: 'high', quantity: 2 },
      { id: 'G3-3', abbreviation: 'VV', decodedSpeciesId: 'vernonia', confidence: 'medium', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 6, col: 3, id: 'G4',
    plantings: [
      { id: 'G4-1', abbreviation: 'aster.FM', decodedSpeciesId: 'aster-fm', confidence: 'medium', quantity: 2 },
      { id: 'G4-2', abbreviation: 'KF', decodedSpeciesId: 'karl-foerster', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 6, col: 4, id: 'G5',
    plantings: [
      { id: 'G5-1', abbreviation: 'persicaria polymorpha', decodedSpeciesId: 'persicaria-polymorpha', confidence: 'high', quantity: 1 },
      { id: 'G5-2', abbreviation: 'PVG', decodedSpeciesId: 'panicum-virgatum', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 6, col: 5, id: 'G6',
    plantings: [
      { id: 'G6-1', abbreviation: 'golden rod', decodedSpeciesId: 'golden-rod', confidence: 'high', quantity: 2 },
      { id: 'G6-2', abbreviation: 'verbena hastata', decodedSpeciesId: 'verbena-hastata', confidence: 'high', quantity: 1 },
      { id: 'G6-3', abbreviation: 'milkweed', decodedSpeciesId: 'swamp-milkweed', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 6, col: 6, id: 'G7',
    plantings: [
      { id: 'G7-1', abbreviation: 'golden rod', decodedSpeciesId: 'golden-rod', confidence: 'high', quantity: 2 },
      { id: 'G7-2', abbreviation: 'swamp milkweed', decodedSpeciesId: 'swamp-milkweed', confidence: 'high', quantity: 1 },
      { id: 'G7-3', abbreviation: 'panicum cloud nine', decodedSpeciesId: 'panicum-cloud-nine', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 6, col: 7, id: 'G8',
    plantings: [
      { id: 'G8-1', abbreviation: 'butterfly weed', decodedSpeciesId: 'butterfly-weed', confidence: 'high', quantity: 2 },
      { id: 'G8-2', abbreviation: 'knautia macedo', decodedSpeciesId: 'knautia-macedo', confidence: 'medium', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 6, col: 8, id: 'G9',
    plantings: [
      { id: 'G9-1', abbreviation: 'hosta halcyon', decodedSpeciesId: 'hosta-halcyon', confidence: 'high', quantity: 2 },
    ],
    structures: [],
  },
  {
    row: 6, col: 9, id: 'G10',
    plantings: [
      { id: 'G10-1', abbreviation: 'headache blue fortune', decodedSpeciesId: 'eupatorium-blue-fortune', confidence: 'medium', quantity: 2 },
      { id: 'G10-2', abbreviation: '*stipa barbata', decodedSpeciesId: 'stipa-barbata', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },

  // === ROW H (y: 672-768) ===
  {
    row: 7, col: 0, id: 'H1',
    plantings: [
      { id: 'H1-1', abbreviation: 'salvia', decodedSpeciesId: 'salvia', confidence: 'high', quantity: 2 },
      { id: 'H1-2', abbreviation: '*stipa barbata', decodedSpeciesId: 'stipa-barbata', confidence: 'high', quantity: 2 },
      { id: 'H1-3', abbreviation: 'verbena b', decodedSpeciesId: 'verbena-bonariensis', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 7, col: 1, id: 'H2',
    plantings: [
      { id: 'H2-1', abbreviation: 'KF', decodedSpeciesId: 'karl-foerster', confidence: 'high', quantity: 1 },
      { id: 'H2-2', abbreviation: 'verbena hastata', decodedSpeciesId: 'verbena-hastata', confidence: 'high', quantity: 2 },
      { id: 'H2-3', abbreviation: 'verbena b', decodedSpeciesId: 'verbena-bonariensis', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 7, col: 2, id: 'H3',
    plantings: [
      { id: 'H3-1', abbreviation: '*stipa barbata', decodedSpeciesId: 'stipa-barbata', confidence: 'high', quantity: 2 },
      { id: 'H3-2', abbreviation: 'echinops', decodedSpeciesId: 'echinops', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 7, col: 3, id: 'H4',
    plantings: [
      { id: 'H4-1', abbreviation: 'red twig dogwood', decodedSpeciesId: 'red-twig-dogwood', confidence: 'high', quantity: 1 },
      { id: 'H4-2', abbreviation: '*stipa barbata', decodedSpeciesId: 'stipa-barbata', confidence: 'high', quantity: 1 },
      { id: 'H4-3', abbreviation: 'JSBF', decodedSpeciesId: 'joe-pye-weed', confidence: 'medium', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 7, col: 4, id: 'H5',
    plantings: [
      { id: 'H5-1', abbreviation: 'YRW', decodedSpeciesId: 'achillea', confidence: 'high', quantity: 1 },
      { id: 'H5-2', abbreviation: 'sneeze weed', decodedSpeciesId: 'sneeze-weed', confidence: 'high', quantity: 3 },
    ],
    structures: [],
  },
  {
    row: 7, col: 5, id: 'H6',
    plantings: [
      { id: 'H6-1', abbreviation: 'sneeze weed', decodedSpeciesId: 'sneeze-weed', confidence: 'high', quantity: 2 },
      { id: 'H6-2', abbreviation: 'VG', decodedSpeciesId: 'panicum-virgatum', confidence: 'medium', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 7, col: 6, id: 'H7',
    plantings: [
      { id: 'H7-1', abbreviation: 'cinnamon fern', decodedSpeciesId: 'cinnamon-fern', confidence: 'high', quantity: 2 },
      { id: 'H7-2', abbreviation: 'daylily', decodedSpeciesId: 'daylily', confidence: 'high', quantity: 2 },
    ],
    structures: [],
  },
  {
    row: 7, col: 7, id: 'H8',
    plantings: [
      { id: 'H8-1', abbreviation: 'sprinter BX', decodedSpeciesId: 'sprinter-bx', confidence: 'high', quantity: 1 },
      { id: 'H8-2', abbreviation: 'hosta halcyon', decodedSpeciesId: 'hosta-halcyon', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 7, col: 8, id: 'H9',
    plantings: [
      { id: 'H9-1', abbreviation: 'panicum cloud nine', decodedSpeciesId: 'panicum-cloud-nine', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 7, col: 9, id: 'H10',
    plantings: [
      { id: 'H10-1', abbreviation: 'camellia', decodedSpeciesId: 'camellia', confidence: 'high', quantity: 1 },
      { id: 'H10-2', abbreviation: 'cherry laurel', decodedSpeciesId: 'cherry-laurel', confidence: 'high', quantity: 1 },
      { id: 'H10-3', abbreviation: 'yew', decodedSpeciesId: 'yew', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },

  // === ROW I (y: 768-864) ===
  {
    row: 8, col: 0, id: 'I1',
    plantings: [],
    structures: ['hot-tub'],
  },
  {
    row: 8, col: 1, id: 'I2',
    plantings: [
      { id: 'I2-1', abbreviation: 'JSBF', decodedSpeciesId: 'joe-pye-weed', confidence: 'medium', quantity: 2 },
      { id: 'I2-2', abbreviation: 'ACH', decodedSpeciesId: 'achillea', confidence: 'high', quantity: 1 },
      { id: 'I2-3', abbreviation: 'panicum cloud nine', decodedSpeciesId: 'panicum-cloud-nine', confidence: 'high', quantity: 2 },
    ],
    structures: [],
  },
  {
    row: 8, col: 2, id: 'I3',
    plantings: [
      { id: 'I3-1', abbreviation: 'red twig dogwood', decodedSpeciesId: 'red-twig-dogwood', confidence: 'high', quantity: 1 },
      { id: 'I3-2', abbreviation: '*stipa barbata', decodedSpeciesId: 'stipa-barbata', confidence: 'high', quantity: 1 },
      { id: 'I3-3', abbreviation: 'YRW', decodedSpeciesId: 'achillea', confidence: 'high', quantity: 1 },
      { id: 'I3-4', abbreviation: 'FG', decodedSpeciesId: 'japanese-feather-grass', confidence: 'medium', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 8, col: 3, id: 'I4',
    plantings: [
      { id: 'I4-1', abbreviation: '*stipa barbata', decodedSpeciesId: 'stipa-barbata', confidence: 'high', quantity: 2 },
      { id: 'I4-2', abbreviation: 'YRW', decodedSpeciesId: 'achillea', confidence: 'high', quantity: 1 },
      { id: 'I4-3', abbreviation: 'ACH', decodedSpeciesId: 'achillea', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 8, col: 4, id: 'I5',
    plantings: [
      { id: 'I5-1', abbreviation: 'baltic parsley', decodedSpeciesId: 'baltic-parsley', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 8, col: 5, id: 'I6',
    plantings: [
      { id: 'I6-1', abbreviation: 'daylily', decodedSpeciesId: 'daylily', confidence: 'high', quantity: 3 },
      { id: 'I6-2', abbreviation: 'cinnamon fern', decodedSpeciesId: 'cinnamon-fern', confidence: 'high', quantity: 2 },
    ],
    structures: [],
  },
  {
    row: 8, col: 6, id: 'I7',
    plantings: [
      { id: 'I7-1', abbreviation: 'actea chocoholic', decodedSpeciesId: 'actaea-chocoholic', confidence: 'high', quantity: 2 },
      { id: 'I7-2', abbreviation: 'daylily', decodedSpeciesId: 'daylily', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 8, col: 7, id: 'I8',
    plantings: [
      { id: 'I8-1', abbreviation: 'cinnamon fern', decodedSpeciesId: 'cinnamon-fern', confidence: 'high', quantity: 2 },
    ],
    structures: [],
  },
  {
    row: 8, col: 8, id: 'I9',
    plantings: [
      { id: 'I9-1', abbreviation: 'cinnamon fern', decodedSpeciesId: 'cinnamon-fern', confidence: 'high', quantity: 2 },
      { id: 'I9-2', abbreviation: 'verbena b', decodedSpeciesId: 'verbena-bonariensis', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 8, col: 9, id: 'I10',
    plantings: [],
    structures: [],
  },

  // === ROW J (bottom row, y: 864-960) ===
  {
    row: 9, col: 0, id: 'J1',
    plantings: [
      { id: 'J1-1', abbreviation: 'rudbeckia laciniata', decodedSpeciesId: 'rudbeckia-laciniata', confidence: 'high', quantity: 3 },
    ],
    structures: ['hot-tub'],
  },
  {
    row: 9, col: 1, id: 'J2',
    plantings: [
      { id: 'J2-1', abbreviation: 'echinacea pallida', decodedSpeciesId: 'echinacea-pallida', confidence: 'high', quantity: 2 },
      { id: 'J2-2', abbreviation: 'SA grass', decodedSpeciesId: 'sa-grass', confidence: 'medium', quantity: 2 },
      { id: 'J2-3', abbreviation: 'monarda brad', decodedSpeciesId: 'monarda-bradburiana', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 9, col: 2, id: 'J3',
    plantings: [
      { id: 'J3-1', abbreviation: 'SA', decodedSpeciesId: 'salvia', confidence: 'high', quantity: 2 },
      { id: 'J3-2', abbreviation: 'SA grass', decodedSpeciesId: 'sa-grass', confidence: 'medium', quantity: 2 },
      { id: 'J3-3', abbreviation: 'aruncus horatia', decodedSpeciesId: 'aruncus-horatia', confidence: 'high', quantity: 2 },
    ],
    structures: [],
  },
  {
    row: 9, col: 3, id: 'J4',
    plantings: [
      { id: 'J4-1', abbreviation: 'aruncus horatia', decodedSpeciesId: 'aruncus-horatia', confidence: 'high', quantity: 2 },
      { id: 'J4-2', abbreviation: 'amaranth', decodedSpeciesId: 'amaranth', confidence: 'high', quantity: 2 },
    ],
    structures: [],
  },
  {
    row: 9, col: 4, id: 'J5',
    plantings: [
      { id: 'J5-1', abbreviation: 'SA', decodedSpeciesId: 'salvia', confidence: 'high', quantity: 2 },
      { id: 'J5-2', abbreviation: 'aruncus horatia', decodedSpeciesId: 'aruncus-horatia', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 9, col: 5, id: 'J6',
    plantings: [
      { id: 'J6-1', abbreviation: 'SA', decodedSpeciesId: 'salvia', confidence: 'high', quantity: 2 },
      { id: 'J6-2', abbreviation: 'daylily', decodedSpeciesId: 'daylily', confidence: 'high', quantity: 2 },
    ],
    structures: [],
  },
  {
    row: 9, col: 6, id: 'J7',
    plantings: [
      { id: 'J7-1', abbreviation: 'cinnamon fern', decodedSpeciesId: 'cinnamon-fern', confidence: 'high', quantity: 3 },
      { id: 'J7-2', abbreviation: 'actea chocoholic', decodedSpeciesId: 'actaea-chocoholic', confidence: 'high', quantity: 2 },
    ],
    structures: [],
  },
  {
    row: 9, col: 7, id: 'J8',
    plantings: [
      { id: 'J8-1', abbreviation: 'cinnamon fern', decodedSpeciesId: 'cinnamon-fern', confidence: 'high', quantity: 2 },
      { id: 'J8-2', abbreviation: 'actea chocoholic', decodedSpeciesId: 'actaea-chocoholic', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 9, col: 8, id: 'J9',
    plantings: [],
    structures: ['bench'],
  },
  {
    row: 9, col: 9, id: 'J10',
    plantings: [],
    structures: [],
  },
];

export const gridCellMap = new Map(gridAssignments.map(c => [c.id, c]));
