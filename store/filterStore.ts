import { create } from 'zustand';

export type GenderType = 'male' | 'female' | 'everyone';
export type BestMatchType = 'best_match' | 'top_rated' | 'nearest';

interface FilterStore {
  categories: string[];       // selected category IDs
  location: string | null;
  priceRange: [number, number] | null;
  isVerified: boolean;
  type: GenderType;
  bestMatch: BestMatchType;

  // Actions
  toggleCategory: (id: string) => void;
  setLocation: (loc: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setVerified: (verified: boolean) => void;
  setType: (type: GenderType) => void;
  setBestMatch: (match: BestMatchType) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  categories: [],
  location: null,
  priceRange: null,
  isVerified: false,
  type: 'everyone',
  bestMatch: 'best_match',

  toggleCategory: (id) =>
    set((state) => ({
      categories: state.categories.includes(id)
        ? state.categories.filter((c) => c !== id)
        : [...state.categories, id],
    })),

  setLocation: (loc) => set({ location: loc }),
  setPriceRange: (range) => set({ priceRange: range }),
  setVerified: (verified) => set({ isVerified: verified }),
  setType: (type) => set({ type }),
  setBestMatch: (match) => set({ bestMatch: match }),
  resetFilters: () =>
    set({
      categories: [],
      location: null,
      priceRange: null,
      isVerified: false,
      type: 'everyone',
      bestMatch: 'best_match',
    }),
}));
