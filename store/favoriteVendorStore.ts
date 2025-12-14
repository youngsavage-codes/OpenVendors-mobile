// store/favoriteVendorStore.ts
import { create } from 'zustand';

interface FavoriteVendorStore {
  favoriteVendorIds: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoriteVendorStore = create<FavoriteVendorStore>((set, get) => ({
  favoriteVendorIds: [],

  addFavorite: (id: number) => 
    set((state) => ({
      favoriteVendorIds: Array.from(new Set([...state.favoriteVendorIds, id])),
    })),

  removeFavorite: (id: number) =>
    set((state) => ({
      favoriteVendorIds: state.favoriteVendorIds.filter((vendorId) => vendorId !== id),
    })),

  toggleFavorite: (id: number) => {
    if (get().favoriteVendorIds.includes(id)) {
      get().removeFavorite(id);
    } else {
      get().addFavorite(id);
    }
  },

  isFavorite: (id: number) => get().favoriteVendorIds.includes(id),
}));
