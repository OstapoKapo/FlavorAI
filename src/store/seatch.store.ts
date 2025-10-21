// src/stores/searchStore.ts
import {create} from "zustand";
import {produce} from "immer";

interface SearchStore {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchTerm: "",

  setSearchTerm: (term) =>
    set(produce((state: SearchStore) => {
      state.searchTerm = term;
    })),

  clearSearch: () =>
    set(produce((state: SearchStore) => {
      state.searchTerm = "";
    })),
}));
