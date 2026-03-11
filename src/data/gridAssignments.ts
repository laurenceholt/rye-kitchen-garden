import type { GridCell } from '../types';

// Grid: 10 rows (A-J, top to bottom) x 10 cols (1-10, left to right)
// Image is 4320x3165px, each cell is ~432x316px
// Scale: 60px = 1 foot (from map legend)
// Circle counts verified by zooming into individual cell crops of the source image

export const gridAssignments: GridCell[] = [
  // === ROW A (top row, y: 0-316) ===
  {
    row: 0, col: 0, id: 'A1',
    plantings: [
      { id: 'A1-1', abbreviation: 'coreopsis mix', decodedSpeciesId: 'coreopsis', confidence: 'high', quantity: 2 },
    ],
    structures: [],
  },
  {
    row: 0, col: 1, id: 'A2',
    plantings: [],
    structures: [],
  },
  {
    row: 0, col: 2, id: 'A3',
    plantings: [],
    structures: [],
  },
  {
    row: 0, col: 3, id: 'A4',
    plantings: [],
    structures: [],
  },
  {
    row: 0, col: 4, id: 'A5',
    plantings: [
      { id: 'A5-1', abbreviation: 'sprinter BX', decodedSpeciesId: 'sprinter-bx', confidence: 'high', quantity: 1 },
      { id: 'A5-2', abbreviation: 'SA grass', decodedSpeciesId: 'sa-grass', confidence: 'medium', quantity: 3 },
      { id: 'A5-3', abbreviation: 'verbena b', decodedSpeciesId: 'verbena-bonariensis', confidence: 'high', quantity: 1 },
      { id: 'A5-4', abbreviation: 'knautia macedon', decodedSpeciesId: 'knautia-macedo', confidence: 'high', quantity: 1 },
      { id: 'A5-5', abbreviation: 'geum', decodedSpeciesId: 'geum', confidence: 'high', quantity: 1 },
      { id: 'A5-6', abbreviation: 'tang', decodedSpeciesId: 'tansy', confidence: 'medium', quantity: 1 },
      { id: 'A5-7', abbreviation: 'liatris', decodedSpeciesId: 'liatris', confidence: 'high', quantity: 3 },
      { id: 'A5-8', abbreviation: 'liatris ligul', decodedSpeciesId: 'liatris-ligulistylis', confidence: 'high', quantity: 2 },
      { id: 'A5-9', abbreviation: '*rattlesnake', decodedSpeciesId: 'rattlesnake-master', confidence: 'high', quantity: 1 },
      { id: 'A5-10', abbreviation: '*stipa barbata', decodedSpeciesId: 'stipa-barbata', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 0, col: 5, id: 'A6',
    plantings: [
      { id: 'A6-1', abbreviation: 'verbena b', decodedSpeciesId: 'verbena-bonariensis', confidence: 'high', quantity: 4 },
      { id: 'A6-2', abbreviation: 'SA grass', decodedSpeciesId: 'sa-grass', confidence: 'medium', quantity: 3 },
      { id: 'A6-3', abbreviation: 'knautia macedon', decodedSpeciesId: 'knautia-macedo', confidence: 'high', quantity: 2 },
      { id: 'A6-4', abbreviation: 'baltic parsley', decodedSpeciesId: 'baltic-parsley', confidence: 'high', quantity: 2 },
      { id: 'A6-5', abbreviation: 'liatris ligul', decodedSpeciesId: 'liatris-ligulistylis', confidence: 'high', quantity: 1 },
      { id: 'A6-6', abbreviation: 'salvia NC', decodedSpeciesId: 'nepeta', confidence: 'medium', quantity: 2 },
      { id: 'A6-7', abbreviation: 'sea holly', decodedSpeciesId: 'sea-holly', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 0, col: 6, id: 'A7',
    plantings: [
      { id: 'A7-1', abbreviation: 'verbena b', decodedSpeciesId: 'verbena-bonariensis', confidence: 'high', quantity: 1 },
      { id: 'A7-2', abbreviation: 'sea holly', decodedSpeciesId: 'sea-holly', confidence: 'high', quantity: 1 },
      { id: 'A7-3', abbreviation: 'verbena hastata', decodedSpeciesId: 'verbena-hastata', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 0, col: 7, id: 'A8',
    plantings: [],
    structures: [],
  },
  {
    row: 0, col: 8, id: 'A9',
    plantings: [],
    structures: [],
  },
  {
    row: 0, col: 9, id: 'A10',
    plantings: [
      { id: 'A10-1', abbreviation: 'cherry', decodedSpeciesId: 'cherry', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },

  // === ROW B (y: 316-633) ===
  {
    row: 1, col: 0, id: 'B1',
    plantings: [
      { id: 'B1-1', abbreviation: 'PLANTER', decodedSpeciesId: 'potatoes', confidence: 'high', quantity: 1 },
    ],
    structures: ['planter'],
  },
  {
    row: 1, col: 1, id: 'B2',
    plantings: [],
    structures: ['planter'],
  },
  {
    row: 1, col: 2, id: 'B3',
    plantings: [],
    structures: ['planter'],
  },
  {
    row: 1, col: 3, id: 'B4',
    plantings: [
      { id: 'B4-1', abbreviation: 'aruncus horatia', decodedSpeciesId: 'aruncus-horatia', confidence: 'high', quantity: 1 },
      { id: 'B4-2', abbreviation: 'beans', decodedSpeciesId: 'beans', confidence: 'high', quantity: 2 },
      { id: 'B4-3', abbreviation: 'jap. anem', decodedSpeciesId: 'japanese-anemone', confidence: 'high', quantity: 1 },
    ],
    structures: ['planter'],
  },
  {
    row: 1, col: 4, id: 'B5',
    plantings: [
      { id: 'B5-1', abbreviation: 'liatris spic', decodedSpeciesId: 'liatris', confidence: 'high', quantity: 2 },
      { id: 'B5-2', abbreviation: '*rattlesnake snake', decodedSpeciesId: 'rattlesnake-master', confidence: 'high', quantity: 1 },
      { id: 'B5-3', abbreviation: '*stipa barbata', decodedSpeciesId: 'stipa-barbata', confidence: 'high', quantity: 3 },
      { id: 'B5-4', abbreviation: 'salv. LSp', decodedSpeciesId: 'little-spire', confidence: 'high', quantity: 3 },
      { id: 'B5-5', abbreviation: 'ECH.PV', decodedSpeciesId: 'echinacea-purpurea-vintage-wine', confidence: 'high', quantity: 3 },
      { id: 'B5-6', abbreviation: 'baltic parsley', decodedSpeciesId: 'baltic-parsley', confidence: 'high', quantity: 1 },
      { id: 'B5-7', abbreviation: 'ECH.PA', decodedSpeciesId: 'echinacea-pallida', confidence: 'high', quantity: 1 },
      { id: 'B5-8', abbreviation: 'SA', decodedSpeciesId: 'salvia', confidence: 'high', quantity: 1 },
      { id: 'B5-9', abbreviation: 'ECH', decodedSpeciesId: 'echinacea-purpurea', confidence: 'high', quantity: 1 },
      { id: 'B5-10', abbreviation: 'SA grass', decodedSpeciesId: 'sa-grass', confidence: 'medium', quantity: 1 },
      { id: 'B5-11', abbreviation: 'knautia macedon', decodedSpeciesId: 'knautia-macedo', confidence: 'high', quantity: 1 },
      { id: 'B5-12', abbreviation: 'rudbeck sub', decodedSpeciesId: 'rudbeckia', confidence: 'medium', quantity: 1 },
      { id: 'B5-13', abbreviation: 'echinops exaltus', decodedSpeciesId: 'echinops-exaltus', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 1, col: 5, id: 'B6',
    plantings: [
      { id: 'B6-1', abbreviation: 'STP.G', decodedSpeciesId: 'stipa-tenuissima', confidence: 'high', quantity: 1 },
      { id: 'B6-2', abbreviation: 'baltic parsley', decodedSpeciesId: 'baltic-parsley', confidence: 'high', quantity: 3 },
      { id: 'B6-3', abbreviation: 'sprinter BX', decodedSpeciesId: 'sprinter-bx', confidence: 'high', quantity: 1 },
      { id: 'B6-4', abbreviation: 'ceph gig', decodedSpeciesId: 'cephalaria-gigantea', confidence: 'high', quantity: 2 },
      { id: 'B6-5', abbreviation: 'echinops exaltus', decodedSpeciesId: 'echinops-exaltus', confidence: 'high', quantity: 2 },
      { id: 'B6-6', abbreviation: 'NC', decodedSpeciesId: 'nepeta', confidence: 'medium', quantity: 1 },
      { id: 'B6-7', abbreviation: 'ACH', decodedSpeciesId: 'achillea', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 1, col: 6, id: 'B7',
    plantings: [
      { id: 'B7-1', abbreviation: 'RS', decodedSpeciesId: 'russian-sage', confidence: 'high', quantity: 1 },
      { id: 'B7-2', abbreviation: 'baltic parsley', decodedSpeciesId: 'baltic-parsley', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 1, col: 7, id: 'B8',
    plantings: [
      { id: 'B8-1', abbreviation: 'PHLX.PAND', decodedSpeciesId: 'phlox-paniculata-david', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 1, col: 8, id: 'B9',
    plantings: [],
    structures: [],
  },
  {
    row: 1, col: 9, id: 'B10',
    plantings: [],
    structures: [],
  },

  // === ROW C (y: 633-949) ===
  {
    row: 2, col: 0, id: 'C1',
    plantings: [
      { id: 'C1-1', abbreviation: 'PLANTER', decodedSpeciesId: 'lettuce', confidence: 'high', quantity: 1 },
    ],
    structures: ['planter'],
  },
  {
    row: 2, col: 1, id: 'C2',
    plantings: [
      { id: 'C2-1', abbreviation: 'PLANTER', decodedSpeciesId: 'tomatoes', confidence: 'high', quantity: 1 },
    ],
    structures: ['planter'],
  },
  {
    row: 2, col: 2, id: 'C3',
    plantings: [
      { id: 'C3-1', abbreviation: '*stipa barbata', decodedSpeciesId: 'stipa-barbata', confidence: 'high', quantity: 1 },
    ],
    structures: ['planter'],
  },
  {
    row: 2, col: 3, id: 'C4',
    plantings: [
      { id: 'C4-1', abbreviation: 'ECH.PA', decodedSpeciesId: 'echinacea-pallida', confidence: 'high', quantity: 3 },
      { id: 'C4-2', abbreviation: 'KF', decodedSpeciesId: 'karl-foerster', confidence: 'high', quantity: 1 },
      { id: 'C4-3', abbreviation: 'veronica LAV', decodedSpeciesId: 'veronica-lav', confidence: 'high', quantity: 1 },
      { id: 'C4-4', abbreviation: 'wood spurge', decodedSpeciesId: 'wood-spurge', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 2, col: 4, id: 'C5',
    plantings: [
      { id: 'C5-1', abbreviation: 'yellow hyssop', decodedSpeciesId: 'hyssop', confidence: 'high', quantity: 1 },
      { id: 'C5-2', abbreviation: 'ECH', decodedSpeciesId: 'echinacea-purpurea', confidence: 'high', quantity: 2 },
      { id: 'C5-3', abbreviation: 'PHLX.PAN', decodedSpeciesId: 'phlox-paniculata-david', confidence: 'high', quantity: 1 },
      { id: 'C5-4', abbreviation: 'ECH burn', decodedSpeciesId: 'echinacea-cheyenne', confidence: 'low', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 2, col: 5, id: 'C6',
    plantings: [
      { id: 'C6-1', abbreviation: 'STP.G', decodedSpeciesId: 'stipa-tenuissima', confidence: 'high', quantity: 1 },
      { id: 'C6-2', abbreviation: 'ceph gig', decodedSpeciesId: 'cephalaria-gigantea', confidence: 'high', quantity: 1 },
      { id: 'C6-3', abbreviation: 'VERB.OLYM', decodedSpeciesId: 'verbascum-olympicum', confidence: 'high', quantity: 1 },
      { id: 'C6-4', abbreviation: 'veronica Red Arrow', decodedSpeciesId: 'veronica-red-arrow', confidence: 'high', quantity: 2 },
      { id: 'C6-5', abbreviation: 'little blue stem', decodedSpeciesId: 'little-bluestem', confidence: 'medium', quantity: 2 },
      { id: 'C6-6', abbreviation: 'meadow rue', decodedSpeciesId: 'meadow-rue', confidence: 'high', quantity: 2 },
      { id: 'C6-7', abbreviation: 'VV', decodedSpeciesId: 'vernonia', confidence: 'medium', quantity: 1 },
      { id: 'C6-8', abbreviation: 'monarda b', decodedSpeciesId: 'monarda-bradburiana', confidence: 'high', quantity: 3 },
      { id: 'C6-9', abbreviation: 'sea holly', decodedSpeciesId: 'sea-holly', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 2, col: 6, id: 'C7',
    plantings: [
      { id: 'C7-1', abbreviation: 'RS', decodedSpeciesId: 'russian-sage', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 2, col: 7, id: 'C8',
    plantings: [
      { id: 'C8-1', abbreviation: 'sprinter BX', decodedSpeciesId: 'sprinter-bx', confidence: 'high', quantity: 1 },
      { id: 'C8-2', abbreviation: 'monarda b', decodedSpeciesId: 'monarda-bradburiana', confidence: 'high', quantity: 1 },
      { id: 'C8-3', abbreviation: 'thyme', decodedSpeciesId: 'thyme', confidence: 'high', quantity: 1 },
      { id: 'C8-4', abbreviation: 'VV', decodedSpeciesId: 'vernonia', confidence: 'medium', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 2, col: 8, id: 'C9',
    plantings: [
      { id: 'C9-1', abbreviation: 'phlox', decodedSpeciesId: 'phlox', confidence: 'high', quantity: 1 },
      { id: 'C9-2', abbreviation: 'sage', decodedSpeciesId: 'sage', confidence: 'high', quantity: 1 },
      { id: 'C9-3', abbreviation: 'veronica Red Arrow', decodedSpeciesId: 'veronica-red-arrow', confidence: 'high', quantity: 1 },
      { id: 'C9-4', abbreviation: 'VERB.BOU', decodedSpeciesId: 'verbena-bonariensis', confidence: 'medium', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 2, col: 9, id: 'C10',
    plantings: [],
    structures: ['basement-stairs'],
  },

  // === ROW D (y: 949-1264) ===
  {
    row: 3, col: 0, id: 'D1',
    plantings: [
      { id: 'D1-1', abbreviation: 'liatris spic', decodedSpeciesId: 'liatris', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 3, col: 1, id: 'D2',
    plantings: [
      { id: 'D2-1', abbreviation: 'lavender', decodedSpeciesId: 'lavender', confidence: 'high', quantity: 2 },
      { id: 'D2-2', abbreviation: 'ECH', decodedSpeciesId: 'echinacea-purpurea', confidence: 'high', quantity: 1 },
      { id: 'D2-3', abbreviation: 'sprinter BX', decodedSpeciesId: 'sprinter-bx', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 3, col: 2, id: 'D3',
    plantings: [
      { id: 'D3-1', abbreviation: 'ACH', decodedSpeciesId: 'achillea', confidence: 'high', quantity: 1 },
      { id: 'D3-2', abbreviation: 'thyme', decodedSpeciesId: 'thyme', confidence: 'high', quantity: 1 },
      { id: 'D3-3', abbreviation: 'ERYN.BOU', decodedSpeciesId: 'eryngium-bourgatii', confidence: 'medium', quantity: 2 },
      { id: 'D3-4', abbreviation: 'Verbas.Nigrum', decodedSpeciesId: 'verbascum-nigrum', confidence: 'medium', quantity: 2 },
      { id: 'D3-5', abbreviation: 'russian sage', decodedSpeciesId: 'russian-sage', confidence: 'high', quantity: 1 },
      { id: 'D3-6', abbreviation: 'poppy', decodedSpeciesId: 'poppy', confidence: 'high', quantity: 1 },
      { id: 'D3-7', abbreviation: 'fennel', decodedSpeciesId: 'fennel', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 3, col: 3, id: 'D4',
    plantings: [
      { id: 'D4-1', abbreviation: 'BAP.AUS', decodedSpeciesId: 'baptisia-australis', confidence: 'high', quantity: 1 },
      { id: 'D4-2', abbreviation: 'fennel', decodedSpeciesId: 'fennel', confidence: 'high', quantity: 1 },
      { id: 'D4-3', abbreviation: 'foxtail lily', decodedSpeciesId: 'foxtail-lily', confidence: 'medium', quantity: 2 },
      { id: 'D4-4', abbreviation: 'Verbas.Nigrum', decodedSpeciesId: 'verbascum-nigrum', confidence: 'medium', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 3, col: 4, id: 'D5',
    plantings: [
      { id: 'D5-1', abbreviation: 'veronica Red Arrow', decodedSpeciesId: 'veronica-red-arrow', confidence: 'high', quantity: 1 },
      { id: 'D5-2', abbreviation: 'russian sage', decodedSpeciesId: 'russian-sage', confidence: 'high', quantity: 1 },
      { id: 'D5-3', abbreviation: 'VERB.OLYM', decodedSpeciesId: 'verbascum-olympicum', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 3, col: 5, id: 'D6',
    plantings: [
      { id: 'D6-1', abbreviation: 'PVG*', decodedSpeciesId: 'panicum-virgatum', confidence: 'high', quantity: 1 },
      { id: 'D6-2', abbreviation: 'viburnum Dawn', decodedSpeciesId: 'viburnum', confidence: 'high', quantity: 1 },
      { id: 'D6-3', abbreviation: 'WH', decodedSpeciesId: 'muhlenbergia-white-cloud', confidence: 'medium', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 3, col: 6, id: 'D7',
    plantings: [
      { id: 'D7-1', abbreviation: 'aster SYM.LAE', decodedSpeciesId: 'aster-sym-lae', confidence: 'medium', quantity: 2 },
      { id: 'D7-2', abbreviation: 'golden rod', decodedSpeciesId: 'golden-rod', confidence: 'high', quantity: 3 },
      { id: 'D7-3', abbreviation: 'STP.G', decodedSpeciesId: 'stipa-tenuissima', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 3, col: 7, id: 'D8',
    plantings: [
      { id: 'D8-1', abbreviation: 'ACH', decodedSpeciesId: 'achillea', confidence: 'high', quantity: 1 },
      { id: 'D8-2', abbreviation: 'EchPV', decodedSpeciesId: 'echinacea-purpurea-vintage-wine', confidence: 'high', quantity: 1 },
      { id: 'D8-3', abbreviation: 'russian sage', decodedSpeciesId: 'russian-sage', confidence: 'high', quantity: 1 },
      { id: 'D8-4', abbreviation: 'JPYW', decodedSpeciesId: 'joe-pye-weed', confidence: 'medium', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 3, col: 8, id: 'D9',
    plantings: [
      { id: 'D9-1', abbreviation: 'JPYW', decodedSpeciesId: 'joe-pye-weed', confidence: 'medium', quantity: 2 },
      { id: 'D9-2', abbreviation: 'sang blk', decodedSpeciesId: 'sanguisorba', confidence: 'medium', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 3, col: 9, id: 'D10',
    plantings: [],
    structures: ['barbecue'],
  },

  // === ROW E (y: 1264-1580) ===
  {
    row: 4, col: 0, id: 'E1',
    plantings: [
      { id: 'E1-1', abbreviation: 'lavender', decodedSpeciesId: 'lavender', confidence: 'high', quantity: 1 },
      { id: 'E1-2', abbreviation: 'thyme', decodedSpeciesId: 'thyme', confidence: 'high', quantity: 1 },
      { id: 'E1-3', abbreviation: 'oregano', decodedSpeciesId: 'oregano', confidence: 'high', quantity: 1 },
      { id: 'E1-4', abbreviation: 'sprinter BX', decodedSpeciesId: 'sprinter-bx', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 4, col: 1, id: 'E2',
    plantings: [
      { id: 'E2-1', abbreviation: 'ECH', decodedSpeciesId: 'echinacea-purpurea', confidence: 'high', quantity: 2 },
      { id: 'E2-2', abbreviation: 'echinops', decodedSpeciesId: 'echinops', confidence: 'high', quantity: 1 },
      { id: 'E2-3', abbreviation: 'foxtail lily', decodedSpeciesId: 'foxtail-lily', confidence: 'medium', quantity: 2 },
      { id: 'E2-4', abbreviation: 'verbena b', decodedSpeciesId: 'verbena-bonariensis', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 4, col: 2, id: 'E3',
    plantings: [
      { id: 'E3-1', abbreviation: 'fennel', decodedSpeciesId: 'fennel', confidence: 'high', quantity: 1 },
      { id: 'E3-2', abbreviation: 'VERB.OLYM', decodedSpeciesId: 'verbascum-olympicum', confidence: 'high', quantity: 1 },
      { id: 'E3-3', abbreviation: 'veronica Red Arrow', decodedSpeciesId: 'veronica-red-arrow', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 4, col: 3, id: 'E4',
    plantings: [
      { id: 'E4-1', abbreviation: 'WH', decodedSpeciesId: 'muhlenbergia-white-cloud', confidence: 'medium', quantity: 2 },
      { id: 'E4-2', abbreviation: 'persicaria polymorpha', decodedSpeciesId: 'persicaria-polymorpha', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 4, col: 4, id: 'E5',
    plantings: [
      { id: 'E5-1', abbreviation: 'ACH', decodedSpeciesId: 'achillea', confidence: 'high', quantity: 1 },
      { id: 'E5-2', abbreviation: 'STP.G', decodedSpeciesId: 'stipa-tenuissima', confidence: 'high', quantity: 1 },
      { id: 'E5-3', abbreviation: 'golden rod', decodedSpeciesId: 'golden-rod', confidence: 'high', quantity: 2 },
    ],
    structures: [],
  },
  {
    row: 4, col: 5, id: 'E6',
    plantings: [
      { id: 'E6-1', abbreviation: 'JPYW', decodedSpeciesId: 'joe-pye-weed', confidence: 'medium', quantity: 2 },
      { id: 'E6-2', abbreviation: 'golden rod', decodedSpeciesId: 'golden-rod', confidence: 'high', quantity: 2 },
    ],
    structures: [],
  },
  {
    row: 4, col: 6, id: 'E7',
    plantings: [
      { id: 'E7-1', abbreviation: 'JSBF', decodedSpeciesId: 'joe-pye-weed', confidence: 'medium', quantity: 2 },
      { id: 'E7-2', abbreviation: 'EchG', decodedSpeciesId: 'echinacea-green-jewel', confidence: 'medium', quantity: 3 },
      { id: 'E7-3', abbreviation: 'PHL.TUBA', decodedSpeciesId: 'phlox-tuba', confidence: 'medium', quantity: 1 },
      { id: 'E7-4', abbreviation: 'sang blk', decodedSpeciesId: 'sanguisorba', confidence: 'medium', quantity: 1 },
      { id: 'E7-5', abbreviation: 'VERB.OLYM', decodedSpeciesId: 'verbascum-olympicum', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 4, col: 7, id: 'E8',
    plantings: [
      { id: 'E8-1', abbreviation: 'PHLX.PAND', decodedSpeciesId: 'phlox-paniculata-david', confidence: 'high', quantity: 2 },
      { id: 'E8-2', abbreviation: 'PHLX.NC', decodedSpeciesId: 'phlox', confidence: 'medium', quantity: 1 },
      { id: 'E8-3', abbreviation: 'aruncus horatia', decodedSpeciesId: 'aruncus-horatia', confidence: 'high', quantity: 2 },
      { id: 'E8-4', abbreviation: 'EchG', decodedSpeciesId: 'echinacea-green-jewel', confidence: 'medium', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 4, col: 8, id: 'E9',
    plantings: [
      { id: 'E9-1', abbreviation: 'aruncus horatia', decodedSpeciesId: 'aruncus-horatia', confidence: 'high', quantity: 1 },
      { id: 'E9-2', abbreviation: 'STP.G', decodedSpeciesId: 'stipa-tenuissima', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 4, col: 9, id: 'E10',
    plantings: [],
    structures: ['barbecue'],
  },

  // === ROW F (y: 1580-1896) ===
  {
    row: 5, col: 0, id: 'F1',
    plantings: [
      { id: 'F1-1', abbreviation: 'verbena b', decodedSpeciesId: 'verbena-bonariensis', confidence: 'high', quantity: 1 },
      { id: 'F1-2', abbreviation: 'nepeta', decodedSpeciesId: 'nepeta', confidence: 'high', quantity: 1 },
      { id: 'F1-3', abbreviation: 'echinops', decodedSpeciesId: 'echinops', confidence: 'high', quantity: 1 },
      { id: 'F1-4', abbreviation: 'salvia nem', decodedSpeciesId: 'salvia-nemorosa', confidence: 'high', quantity: 3 },
    ],
    structures: [],
  },
  {
    row: 5, col: 1, id: 'F2',
    plantings: [
      { id: 'F2-1', abbreviation: 'SB', decodedSpeciesId: 'salvia', confidence: 'medium', quantity: 1 },
      { id: 'F2-2', abbreviation: 'rudbeckia sub', decodedSpeciesId: 'rudbeckia', confidence: 'high', quantity: 2 },
      { id: 'F2-3', abbreviation: 'nepeta', decodedSpeciesId: 'nepeta', confidence: 'high', quantity: 1 },
      { id: 'F2-4', abbreviation: 'PnR', decodedSpeciesId: 'pennisetum', confidence: 'low', quantity: 2 },
      { id: 'F2-5', abbreviation: 'monarda brad', decodedSpeciesId: 'monarda-bradburiana', confidence: 'high', quantity: 2 },
    ],
    structures: [],
  },
  {
    row: 5, col: 2, id: 'F3',
    plantings: [
      { id: 'F3-1', abbreviation: 'VV', decodedSpeciesId: 'vernonia', confidence: 'medium', quantity: 1 },
      { id: 'F3-2', abbreviation: 'monarda', decodedSpeciesId: 'monarda', confidence: 'high', quantity: 2 },
      { id: 'F3-3', abbreviation: 'persicaria polymorpha', decodedSpeciesId: 'persicaria-polymorpha', confidence: 'high', quantity: 2 },
    ],
    structures: [],
  },
  {
    row: 5, col: 3, id: 'F4',
    plantings: [
      { id: 'F4-1', abbreviation: 'salvia', decodedSpeciesId: 'salvia', confidence: 'high', quantity: 2 },
      { id: 'F4-2', abbreviation: 'aster SYM.LAE', decodedSpeciesId: 'aster-sym-lae', confidence: 'medium', quantity: 1 },
      { id: 'F4-3', abbreviation: 'NC', decodedSpeciesId: 'nepeta', confidence: 'medium', quantity: 1 },
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
      { id: 'F6-1', abbreviation: 'swamp milkweed', decodedSpeciesId: 'swamp-milkweed', confidence: 'high', quantity: 1 },
      { id: 'F6-2', abbreviation: 'PVG', decodedSpeciesId: 'panicum-virgatum', confidence: 'high', quantity: 2 },
    ],
    structures: [],
  },
  {
    row: 5, col: 6, id: 'F7',
    plantings: [
      { id: 'F7-1', abbreviation: 'PVG', decodedSpeciesId: 'panicum-virgatum', confidence: 'high', quantity: 2 },
      { id: 'F7-2', abbreviation: 'red twig dogwood', decodedSpeciesId: 'red-twig-dogwood', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 5, col: 7, id: 'F8',
    plantings: [
      { id: 'F8-1', abbreviation: 'LBC', decodedSpeciesId: 'little-bluestem', confidence: 'medium', quantity: 3 },
      { id: 'F8-2', abbreviation: 'little spire', decodedSpeciesId: 'little-spire', confidence: 'medium', quantity: 2 },
    ],
    structures: [],
  },
  {
    row: 5, col: 8, id: 'F9',
    plantings: [
      { id: 'F9-1', abbreviation: 'EchP', decodedSpeciesId: 'echinacea-purpurea', confidence: 'high', quantity: 1 },
      { id: 'F9-2', abbreviation: 'STP.G', decodedSpeciesId: 'stipa-tenuissima', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 5, col: 9, id: 'F10',
    plantings: [
      { id: 'F10-1', abbreviation: 'little spire', decodedSpeciesId: 'little-spire', confidence: 'medium', quantity: 2 },
      { id: 'F10-2', abbreviation: 'headache blue fortune', decodedSpeciesId: 'eupatorium-blue-fortune', confidence: 'medium', quantity: 1 },
    ],
    structures: [],
  },

  // === ROW G (y: 1896-2212) ===
  {
    row: 6, col: 0, id: 'G1',
    plantings: [
      { id: 'G1-1', abbreviation: 'echinops', decodedSpeciesId: 'echinops', confidence: 'high', quantity: 1 },
      { id: 'G1-2', abbreviation: 'salvia nem', decodedSpeciesId: 'salvia-nemorosa', confidence: 'high', quantity: 3 },
      { id: 'G1-3', abbreviation: '*stipa barbata', decodedSpeciesId: 'stipa-barbata', confidence: 'high', quantity: 3 },
      { id: 'G1-4', abbreviation: 'EchP', decodedSpeciesId: 'echinacea-purpurea', confidence: 'high', quantity: 3 },
      { id: 'G1-5', abbreviation: 'verbena b', decodedSpeciesId: 'verbena-bonariensis', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 6, col: 1, id: 'G2',
    plantings: [
      { id: 'G2-1', abbreviation: '*stipa barbata', decodedSpeciesId: 'stipa-barbata', confidence: 'high', quantity: 2 },
      { id: 'G2-2', abbreviation: 'rudbeckia sub', decodedSpeciesId: 'rudbeckia', confidence: 'high', quantity: 2 },
      { id: 'G2-3', abbreviation: 'verbena b', decodedSpeciesId: 'verbena-bonariensis', confidence: 'high', quantity: 1 },
      { id: 'G2-4', abbreviation: 'echinops', decodedSpeciesId: 'echinops', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 6, col: 2, id: 'G3',
    plantings: [
      { id: 'G3-1', abbreviation: 'WH', decodedSpeciesId: 'muhlenbergia-white-cloud', confidence: 'medium', quantity: 1 },
      { id: 'G3-2', abbreviation: '*stipa barbata', decodedSpeciesId: 'stipa-barbata', confidence: 'high', quantity: 2 },
    ],
    structures: [],
  },
  {
    row: 6, col: 3, id: 'G4',
    plantings: [
      { id: 'G4-1', abbreviation: 'aster.FM', decodedSpeciesId: 'aster-fm', confidence: 'medium', quantity: 2 },
      { id: 'G4-2', abbreviation: 'KF', decodedSpeciesId: 'karl-foerster', confidence: 'high', quantity: 1 },
      { id: 'G4-3', abbreviation: 'verbena hastata', decodedSpeciesId: 'verbena-hastata', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 6, col: 4, id: 'G5',
    plantings: [
      { id: 'G5-1', abbreviation: 'persicaria polymorpha', decodedSpeciesId: 'persicaria-polymorpha', confidence: 'high', quantity: 1 },
      { id: 'G5-2', abbreviation: 'PVG', decodedSpeciesId: 'panicum-virgatum', confidence: 'high', quantity: 1 },
      { id: 'G5-3', abbreviation: 'aster.FM', decodedSpeciesId: 'aster-fm', confidence: 'medium', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 6, col: 5, id: 'G6',
    plantings: [
      { id: 'G6-1', abbreviation: 'golden rod', decodedSpeciesId: 'golden-rod', confidence: 'high', quantity: 2 },
      { id: 'G6-2', abbreviation: 'swamp milkweed', decodedSpeciesId: 'swamp-milkweed', confidence: 'high', quantity: 1 },
      { id: 'G6-3', abbreviation: 'red twig dogwood', decodedSpeciesId: 'red-twig-dogwood', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 6, col: 6, id: 'G7',
    plantings: [
      { id: 'G7-1', abbreviation: 'knautia macedo', decodedSpeciesId: 'knautia-macedo', confidence: 'medium', quantity: 1 },
      { id: 'G7-2', abbreviation: 'LBC', decodedSpeciesId: 'little-bluestem', confidence: 'medium', quantity: 3 },
      { id: 'G7-3', abbreviation: 'hosta halcyon', decodedSpeciesId: 'hosta-halcyon', confidence: 'high', quantity: 1 },
      { id: 'G7-4', abbreviation: 'swamp milkweed', decodedSpeciesId: 'swamp-milkweed', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 6, col: 7, id: 'G8',
    plantings: [
      { id: 'G8-1', abbreviation: 'butterfly weed', decodedSpeciesId: 'butterfly-weed', confidence: 'high', quantity: 2 },
      { id: 'G8-2', abbreviation: 'hosta halcyon', decodedSpeciesId: 'hosta-halcyon', confidence: 'high', quantity: 1 },
      { id: 'G8-3', abbreviation: 'little spire', decodedSpeciesId: 'little-spire', confidence: 'medium', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 6, col: 8, id: 'G9',
    plantings: [
      { id: 'G9-1', abbreviation: 'panicum cloud nine', decodedSpeciesId: 'panicum-cloud-nine', confidence: 'high', quantity: 1 },
      { id: 'G9-2', abbreviation: '*stipa barbata', decodedSpeciesId: 'stipa-barbata', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 6, col: 9, id: 'G10',
    plantings: [
      { id: 'G10-1', abbreviation: 'camellia', decodedSpeciesId: 'camellia', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },

  // === ROW H (y: 2212-2528) ===
  {
    row: 7, col: 0, id: 'H1',
    plantings: [
      { id: 'H1-1', abbreviation: '*stipa barbata', decodedSpeciesId: 'stipa-barbata', confidence: 'high', quantity: 2 },
      { id: 'H1-2', abbreviation: 'salvia', decodedSpeciesId: 'salvia', confidence: 'high', quantity: 1 },
      { id: 'H1-3', abbreviation: 'echinops', decodedSpeciesId: 'echinops', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 7, col: 1, id: 'H2',
    plantings: [
      { id: 'H2-1', abbreviation: 'verbena hastata', decodedSpeciesId: 'verbena-hastata', confidence: 'high', quantity: 2 },
      { id: 'H2-2', abbreviation: 'YRW', decodedSpeciesId: 'achillea', confidence: 'high', quantity: 1 },
      { id: 'H2-3', abbreviation: '*stipa barbata', decodedSpeciesId: 'stipa-barbata', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 7, col: 2, id: 'H3',
    plantings: [
      { id: 'H3-1', abbreviation: 'red twig dogwood', decodedSpeciesId: 'red-twig-dogwood', confidence: 'high', quantity: 1 },
      { id: 'H3-2', abbreviation: 'echinops', decodedSpeciesId: 'echinops', confidence: 'high', quantity: 1 },
      { id: 'H3-3', abbreviation: 'JSBF', decodedSpeciesId: 'joe-pye-weed', confidence: 'medium', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 7, col: 3, id: 'H4',
    plantings: [
      { id: 'H4-1', abbreviation: 'JSBF', decodedSpeciesId: 'joe-pye-weed', confidence: 'medium', quantity: 2 },
      { id: 'H4-2', abbreviation: 'red twig dogwood', decodedSpeciesId: 'red-twig-dogwood', confidence: 'high', quantity: 1 },
      { id: 'H4-3', abbreviation: '*stipa barbata', decodedSpeciesId: 'stipa-barbata', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 7, col: 4, id: 'H5',
    plantings: [
      { id: 'H5-1', abbreviation: 'YRW', decodedSpeciesId: 'achillea', confidence: 'high', quantity: 1 },
      { id: 'H5-2', abbreviation: 'sneeze weed', decodedSpeciesId: 'sneeze-weed', confidence: 'high', quantity: 3 },
      { id: 'H5-3', abbreviation: 'FG', decodedSpeciesId: 'japanese-feather-grass', confidence: 'medium', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 7, col: 5, id: 'H6',
    plantings: [
      { id: 'H6-1', abbreviation: 'cinnamon fern', decodedSpeciesId: 'cinnamon-fern', confidence: 'high', quantity: 1 },
      { id: 'H6-2', abbreviation: 'daylily', decodedSpeciesId: 'daylily', confidence: 'high', quantity: 2 },
      { id: 'H6-3', abbreviation: 'hosta halcyon', decodedSpeciesId: 'hosta-halcyon', confidence: 'high', quantity: 1 },
      { id: 'H6-4', abbreviation: 'sprinter BX', decodedSpeciesId: 'sprinter-bx', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 7, col: 6, id: 'H7',
    plantings: [
      { id: 'H7-1', abbreviation: 'cinnamon fern', decodedSpeciesId: 'cinnamon-fern', confidence: 'high', quantity: 2 },
      { id: 'H7-2', abbreviation: 'butterfly weed', decodedSpeciesId: 'butterfly-weed', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 7, col: 7, id: 'H8',
    plantings: [
      { id: 'H8-1', abbreviation: 'actea chocoholic', decodedSpeciesId: 'actaea-chocoholic', confidence: 'high', quantity: 1 },
      { id: 'H8-2', abbreviation: 'cinnamon fern', decodedSpeciesId: 'cinnamon-fern', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 7, col: 8, id: 'H9',
    plantings: [
      { id: 'H9-1', abbreviation: 'camellia snowman', decodedSpeciesId: 'camellia', confidence: 'high', quantity: 1 },
      { id: 'H9-2', abbreviation: 'panicum cloud nine', decodedSpeciesId: 'panicum-cloud-nine', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 7, col: 9, id: 'H10',
    plantings: [
      { id: 'H10-1', abbreviation: 'cherry laurel', decodedSpeciesId: 'cherry-laurel', confidence: 'high', quantity: 1 },
      { id: 'H10-2', abbreviation: 'yew', decodedSpeciesId: 'yew', confidence: 'high', quantity: 1 },
      { id: 'H10-3', abbreviation: 'verbena b', decodedSpeciesId: 'verbena-bonariensis', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },

  // === ROW I (y: 2528-2844) ===
  {
    row: 8, col: 0, id: 'I1',
    plantings: [],
    structures: ['hot-tub'],
  },
  {
    row: 8, col: 1, id: 'I2',
    plantings: [
      { id: 'I2-1', abbreviation: 'panicum cloud nine', decodedSpeciesId: 'panicum-cloud-nine', confidence: 'high', quantity: 2 },
      { id: 'I2-2', abbreviation: 'SA grass', decodedSpeciesId: 'sa-grass', confidence: 'medium', quantity: 2 },
    ],
    structures: [],
  },
  {
    row: 8, col: 2, id: 'I3',
    plantings: [
      { id: 'I3-1', abbreviation: 'rudbeckia laciniata', decodedSpeciesId: 'rudbeckia-laciniata', confidence: 'high', quantity: 2 },
      { id: 'I3-2', abbreviation: '*stipa barbata', decodedSpeciesId: 'stipa-barbata', confidence: 'high', quantity: 1 },
      { id: 'I3-3', abbreviation: 'SA grass', decodedSpeciesId: 'sa-grass', confidence: 'medium', quantity: 1 },
      { id: 'I3-4', abbreviation: 'ECH', decodedSpeciesId: 'echinacea-purpurea', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 8, col: 3, id: 'I4',
    plantings: [
      { id: 'I4-1', abbreviation: 'monarda brad', decodedSpeciesId: 'monarda-bradburiana', confidence: 'high', quantity: 1 },
      { id: 'I4-2', abbreviation: 'SA grass', decodedSpeciesId: 'sa-grass', confidence: 'medium', quantity: 2 },
      { id: 'I4-3', abbreviation: 'YRW', decodedSpeciesId: 'achillea', confidence: 'high', quantity: 1 },
      { id: 'I4-4', abbreviation: 'SA', decodedSpeciesId: 'salvia', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 8, col: 4, id: 'I5',
    plantings: [
      { id: 'I5-1', abbreviation: 'daylily', decodedSpeciesId: 'daylily', confidence: 'high', quantity: 1 },
      { id: 'I5-2', abbreviation: 'ACH', decodedSpeciesId: 'achillea', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 8, col: 5, id: 'I6',
    plantings: [
      { id: 'I6-1', abbreviation: 'daylily', decodedSpeciesId: 'daylily', confidence: 'high', quantity: 3 },
      { id: 'I6-2', abbreviation: 'actea chocoholic', decodedSpeciesId: 'actaea-chocoholic', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 8, col: 6, id: 'I7',
    plantings: [
      { id: 'I7-1', abbreviation: 'SA', decodedSpeciesId: 'salvia', confidence: 'high', quantity: 1 },
      { id: 'I7-2', abbreviation: 'cinnamon fern', decodedSpeciesId: 'cinnamon-fern', confidence: 'high', quantity: 2 },
      { id: 'I7-3', abbreviation: 'actea chocoholic', decodedSpeciesId: 'actaea-chocoholic', confidence: 'high', quantity: 1 },
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
    plantings: [],
    structures: [],
  },
  {
    row: 8, col: 9, id: 'I10',
    plantings: [],
    structures: [],
  },

  // === ROW J (bottom row, y: 2844-3165) ===
  {
    row: 9, col: 0, id: 'J1',
    plantings: [],
    structures: ['hot-tub'],
  },
  {
    row: 9, col: 1, id: 'J2',
    plantings: [
      { id: 'J2-1', abbreviation: 'rudbeckia laciniata', decodedSpeciesId: 'rudbeckia-laciniata', confidence: 'high', quantity: 3 },
      { id: 'J2-2', abbreviation: 'SA grass', decodedSpeciesId: 'sa-grass', confidence: 'medium', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 9, col: 2, id: 'J3',
    plantings: [
      { id: 'J3-1', abbreviation: 'ECH', decodedSpeciesId: 'echinacea-purpurea', confidence: 'high', quantity: 1 },
      { id: 'J3-2', abbreviation: 'SA grass', decodedSpeciesId: 'sa-grass', confidence: 'medium', quantity: 2 },
      { id: 'J3-3', abbreviation: 'SA', decodedSpeciesId: 'salvia', confidence: 'high', quantity: 2 },
      { id: 'J3-4', abbreviation: 'aruncus horatia', decodedSpeciesId: 'aruncus-horatia', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 9, col: 3, id: 'J4',
    plantings: [
      { id: 'J4-1', abbreviation: 'amaranth', decodedSpeciesId: 'amaranth', confidence: 'high', quantity: 2 },
      { id: 'J4-2', abbreviation: 'SA', decodedSpeciesId: 'salvia', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 9, col: 4, id: 'J5',
    plantings: [
      { id: 'J5-1', abbreviation: 'daylily', decodedSpeciesId: 'daylily', confidence: 'high', quantity: 2 },
      { id: 'J5-2', abbreviation: 'aruncus horatia', decodedSpeciesId: 'aruncus-horatia', confidence: 'high', quantity: 1 },
    ],
    structures: [],
  },
  {
    row: 9, col: 5, id: 'J6',
    plantings: [
      { id: 'J6-1', abbreviation: 'daylily', decodedSpeciesId: 'daylily', confidence: 'high', quantity: 2 },
      { id: 'J6-2', abbreviation: 'SA', decodedSpeciesId: 'salvia', confidence: 'high', quantity: 1 },
      { id: 'J6-3', abbreviation: 'aruncus horatia', decodedSpeciesId: 'aruncus-horatia', confidence: 'high', quantity: 1 },
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
