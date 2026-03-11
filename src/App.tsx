import { useState, useCallback, useMemo } from 'react';
import type { GardenState, TabId, Confidence, UserCorrections, CellPlanting, PlantSpecies } from './types';
import { GardenContext, defaultCorrections } from './hooks/useGardenState';
import { useLocalStorage } from './hooks/useLocalStorage';
import { gridCellMap, gridAssignments } from './data/gridAssignments';
import { plantDatabase, plantDatabaseMap } from './data/plantDatabase';
import { Header } from './components/layout/Header';
import { TabNav } from './components/layout/TabNav';
import { GardenMap } from './components/map/GardenMap';
import { BillOfMaterials } from './components/bom/BillOfMaterials';
import { CompanionAnalysis } from './components/companions/CompanionAnalysis';

export default function App() {
  const [selectedCellId, setSelectedCellId] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<TabId>('map');
  const [searchQuery, setSearchQuery] = useState('');
  const [confidenceFilter, setConfidenceFilter] = useState<Confidence[]>(['high', 'medium', 'low']);
  const [userCorrections, setUserCorrections] = useLocalStorage<UserCorrections>(
    'garden-map-corrections-v2',
    defaultCorrections
  );
  const [customPlants, setCustomPlants] = useLocalStorage<PlantSpecies[]>(
    'garden-custom-plants-v1',
    []
  );

  const allPlantsMap = useMemo(() => {
    const map = new Map(plantDatabaseMap);
    for (const cp of customPlants) {
      if (!map.has(cp.id)) map.set(cp.id, cp);
    }
    return map;
  }, [customPlants]);

  const allPlants = useMemo(() => {
    const ids = new Set(plantDatabase.map(p => p.id));
    const merged = [...plantDatabase];
    for (const cp of customPlants) {
      if (!ids.has(cp.id)) merged.push(cp);
    }
    return merged;
  }, [customPlants]);

  const addCustomPlant = useCallback((plant: PlantSpecies) => {
    setCustomPlants(prev => {
      if (prev.find(p => p.id === plant.id)) return prev;
      return [...prev, plant];
    });
  }, [setCustomPlants]);

  const getAllPlants = useCallback(() => allPlants, [allPlants]);
  const getPlantById = useCallback((id: string) => allPlantsMap.get(id), [allPlantsMap]);

  const saveCorrection = useCallback((plantingId: string, speciesId: string, notes?: string, confidence?: Confidence) => {
    setUserCorrections(prev => ({
      ...prev,
      corrections: {
        ...prev.corrections,
        [plantingId]: { speciesId, confidence: confidence ?? 'high', notes, timestamp: Date.now() },
      },
    }));
  }, [setUserCorrections]);

  const resetCorrection = useCallback((plantingId: string) => {
    setUserCorrections(prev => {
      const { [plantingId]: _, ...rest } = prev.corrections;
      return { ...prev, corrections: rest };
    });
  }, [setUserCorrections]);

  const getResolvedSpeciesId = useCallback((plantingId: string, defaultId: string) => {
    return userCorrections.corrections[plantingId]?.speciesId ?? defaultId;
  }, [userCorrections]);

  const isUserCorrected = useCallback((plantingId: string) => {
    return plantingId in userCorrections.corrections;
  }, [userCorrections]);

  const toggleConfidenceFilter = useCallback((c: Confidence) => {
    setConfidenceFilter(prev =>
      prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]
    );
  }, []);

  const addPlanting = useCallback((cellId: string, planting: CellPlanting) => {
    setUserCorrections(prev => ({
      ...prev,
      addedPlantings: {
        ...prev.addedPlantings,
        [cellId]: [...(prev.addedPlantings[cellId] || []), planting],
      },
    }));
  }, [setUserCorrections]);

  const deletePlanting = useCallback((plantingId: string) => {
    setUserCorrections(prev => ({
      ...prev,
      deletedPlantingIds: [...prev.deletedPlantingIds, plantingId],
    }));
  }, [setUserCorrections]);

  const updatePlanting = useCallback((plantingId: string, updates: {
    speciesId?: string;
    abbreviation?: string;
    quantity?: number;
    confidence?: Confidence;
    notes?: string;
  }) => {
    setUserCorrections(prev => {
      const existing = prev.corrections[plantingId];
      return {
        ...prev,
        corrections: {
          ...prev.corrections,
          [plantingId]: {
            speciesId: updates.speciesId ?? existing?.speciesId ?? '',
            abbreviation: updates.abbreviation,
            quantity: updates.quantity,
            confidence: updates.confidence ?? 'high',
            notes: updates.notes,
            timestamp: Date.now(),
          },
        },
      };
    });
  }, [setUserCorrections]);

  const bulkCorrectByAbbreviation = useCallback((abbreviation: string, speciesId: string, notes?: string) => {
    const abbrLower = abbreviation.toLowerCase();
    setUserCorrections(prev => {
      const newCorrections = { ...prev.corrections };
      for (const cell of gridAssignments) {
        for (const p of cell.plantings) {
          if (p.abbreviation.toLowerCase() === abbrLower) {
            newCorrections[p.id] = { speciesId, confidence: 'high', notes, timestamp: Date.now() };
          }
        }
      }
      for (const cellPlantings of Object.values(prev.addedPlantings)) {
        for (const p of cellPlantings) {
          if (p.abbreviation.toLowerCase() === abbrLower) {
            newCorrections[p.id] = { speciesId, confidence: 'high', notes, timestamp: Date.now() };
          }
        }
      }
      return { ...prev, corrections: newCorrections };
    });
  }, [setUserCorrections]);

  const getResolvedPlantings = useCallback((cellId: string): CellPlanting[] => {
    const cell = gridCellMap.get(cellId);
    const base = cell ? cell.plantings : [];
    const added = userCorrections.addedPlantings[cellId] || [];
    const deleted = new Set(userCorrections.deletedPlantingIds);
    return [...base, ...added]
      .filter(p => !deleted.has(p.id))
      .map(p => {
        const correction = userCorrections.corrections[p.id];
        if (!correction) return p;
        return {
          ...p,
          decodedSpeciesId: correction.speciesId || p.decodedSpeciesId,
          abbreviation: correction.abbreviation ?? p.abbreviation,
          quantity: correction.quantity ?? p.quantity,
          confidence: correction.confidence ?? p.confidence,
        };
      });
  }, [userCorrections]);

  const state: GardenState = useMemo(() => ({
    selectedCellId,
    selectedTab,
    searchQuery,
    confidenceFilter,
    userCorrections,
  }), [selectedCellId, selectedTab, searchQuery, confidenceFilter, userCorrections]);

  const actions = useMemo(() => ({
    selectCell: setSelectedCellId,
    selectTab: setSelectedTab,
    setSearch: setSearchQuery,
    toggleConfidenceFilter,
    saveCorrection,
    resetCorrection,
    getResolvedSpeciesId,
    isUserCorrected,
    addPlanting,
    deletePlanting,
    updatePlanting,
    bulkCorrectByAbbreviation,
    getResolvedPlantings,
    addCustomPlant,
    getAllPlants,
    getPlantById,
  }), [toggleConfidenceFilter, saveCorrection, resetCorrection, getResolvedSpeciesId, isUserCorrected, addPlanting, deletePlanting, updatePlanting, bulkCorrectByAbbreviation, getResolvedPlantings, addCustomPlant, getAllPlants, getPlantById]);

  return (
    <GardenContext.Provider value={{ state, actions }}>
      <div className="min-h-screen bg-bg flex flex-col">
        <Header />
        <TabNav />
        <main className="flex-1 overflow-hidden">
          {selectedTab === 'map' && <GardenMap />}
          {selectedTab === 'bom' && <BillOfMaterials />}
          {selectedTab === 'companions' && <CompanionAnalysis />}
        </main>
      </div>
    </GardenContext.Provider>
  );
}
