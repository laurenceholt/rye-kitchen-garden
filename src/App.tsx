import { useState, useCallback, useMemo } from 'react';
import type { GardenState, TabId, Confidence, UserCorrections } from './types';
import { GardenContext, defaultCorrections } from './hooks/useGardenState';
import { useLocalStorage } from './hooks/useLocalStorage';
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
    'garden-map-corrections-v1',
    defaultCorrections
  );

  const saveCorrection = useCallback((plantingId: string, speciesId: string, notes?: string) => {
    setUserCorrections(prev => ({
      ...prev,
      corrections: {
        ...prev.corrections,
        [plantingId]: { speciesId, notes, timestamp: Date.now() },
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
  }), [toggleConfidenceFilter, saveCorrection, resetCorrection, getResolvedSpeciesId, isUserCorrected]);

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
