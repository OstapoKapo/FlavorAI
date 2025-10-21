// src/stores/userStore.ts
import { create } from "zustand";
import { produce } from "immer";

interface IUser {
  id: string;
  name: string;
  email: string;
  recipes?: any[];
}

interface UserStore {
  user: IUser | null;
  setUser: (user: IUser) => void;
  updateUser: (partial: Partial<IUser>) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,

  setUser: (user) =>
    set(produce((state: UserStore) => {
      state.user = user;
    })),

  updateUser: (partial) =>
    set(produce((state: UserStore) => {
      if (state.user) {
        state.user = { ...state.user, ...partial };
      }
    })),

  clearUser: () =>
    set(produce((state: UserStore) => {
      state.user = null;
    })),
}));
