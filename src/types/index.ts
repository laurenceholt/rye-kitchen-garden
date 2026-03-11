export type Confidence = 'high' | 'medium' | 'low';

export type PlantCategory =
  | 'perennial' | 'grass' | 'shrub' | 'tree'
  | 'herb' | 'vegetable' | 'fern' | 'annual' | 'vine';

export type SunLevel = 'full-sun' | 'part-sun' | 'part-shade' | 'full-shade';
export type MoistureLevel = 'dry' | 'average' | 'moist' | 'wet';
export type SoilType = 'clay' | 'loam' | 'sand' | 'rocky' | 'any';
export type Season = 'spring' | 'summer' | 'fall' | 'winter';

export interface PlantSpecies {
  id: string;
  commonName: string;
  scientificName: string;
  category: PlantCategory;
  heightRange: [number, number]; // inches
  spreadRange: [number, number]; // inches
  sunRequirement: SunLevel;
  moistureRequirement: MoistureLevel;
  soilPreference: SoilType[];
  bloomSeason: Season[];
  bloomColor: string[];
  hardinessZone: [number, number];
  deerResistant: boolean;
  nativeTo: string[];
  estimatedCostPerPlant: number;
  notes?: string;
}

export interface AbbreviationDecoding {
  abbreviation: string;
  speciesId: string;
  confidence: Confidence;
  alternateInterpretations?: string[];
  notes?: string;
}

export type StructureType =
  | 'hot-tub' | 'bench' | 'basement-stairs'
  | 'barbecue' | 'planter' | 'pond'
  | 'path' | 'property-line';

export interface CellPlanting {
  id: string;
  abbreviation: string;
  decodedSpeciesId: string;
  confidence: Confidence;
  quantity: number;
}

export interface GridCell {
  row: number;
  col: number;
  id: string;
  plantings: CellPlanting[];
  structures: StructureType[];
}

export interface UserCorrection {
  speciesId: string;
  notes?: string;
  timestamp: number;
}

export interface UserCorrections {
  version: number;
  corrections: Record<string, UserCorrection>;
}

export interface BOMEntry {
  speciesId: string;
  species: PlantSpecies;
  totalQuantity: number;
  cellLocations: string[];
  estimatedTotalCost: number;
  confidence: Confidence;
}

export type CompatibilityRating = 'excellent' | 'good' | 'neutral' | 'poor';

export interface CompanionEntry {
  speciesA: string;
  speciesB: string;
  rating: CompatibilityRating;
  reason: string;
}

export type TabId = 'map' | 'bom' | 'companions';

export interface GardenState {
  selectedCellId: string | null;
  selectedTab: TabId;
  searchQuery: string;
  confidenceFilter: Confidence[];
  userCorrections: UserCorrections;
}
