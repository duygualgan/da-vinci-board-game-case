import { create } from "zustand";
import type { Post } from "../types";

interface FavoriteState {
  favorites: Post[];
  toggleFavorite: (post: Post) => void;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoriteState>((set) => ({
  favorites: [],
  toggleFavorite: (post) =>
    set((state: FavoriteState) => {
      const exists = state.favorites.some((f) => f.id === post.id);
      return {
        favorites: exists
          ? state.favorites.filter((f) => f.id !== post.id)
          : [...state.favorites, post],
      };
    }),
    clearFavorites: () => set({ favorites: [] }),
}));
