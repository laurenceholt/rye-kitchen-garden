import { createContext, useContext } from 'react';
import type { GardenState, TabId, Confidence, UserCorrections, CellPlanting, PlantSpecies } from '../types';

export interface GardenActions {
  selectCell: (cellId: string | null) => void;
  selectTab: (tab: TabId) => void;
  setSearch: (query: string) => void;
  toggleConfidenceFilter: (c: Confidence) => void;
  saveCorrection: (plantingId: string, speciesId: string, notes?: string, confidence?: Confidence) => void;
  resetCorrection: (plantingId: string) => void;
  getResolvedSpeciesId: (plantingId: string, defaultId: string) => string;
  isUserCorrected: (plantingId: string) => boolean;
  addPlanting: (cellId: string, planting: CellPlanting) => void;
  deletePlanting: (plantingId: string) => void;
  updatePlanting: (plantingId: string, updates: {
    speciesId?: string;
    abbreviation?: string;
    quantity?: number;
    confidence?: Confidence;
    notes?: string;
  }) => void;
  bulkCorrectByAbbreviation: (abbreviation: string, speciesId: string, notes?: string) => void;
  getResolvedPlantings: (cellId: string) => CellPlanting[];
  addCustomPlant: (plant: PlantSpecies) => void;
  getAllPlants: () => PlantSpecies[];
  getPlantById: (id: string) => PlantSpecies | undefined;
}

export const GardenContext = createContext<{
  state: GardenState;
  actions: GardenActions;
} | null>(null);

export function useGarden() {
  const ctx = useContext(GardenContext);
  if (!ctx) throw new Error('useGarden must be used within GardenProvider');
  return ctx;
}

export const defaultCorrections: UserCorrections = {
  version: 1,
  corrections: {},
  addedPlantings: {},
  deletedPlantingIds: [],
};
