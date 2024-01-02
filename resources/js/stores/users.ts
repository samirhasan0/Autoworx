import { User } from "@/types";
import { create } from "zustand";

interface UsersStore {
  users: User[];
  setUsers: (users: User[]) => void;
}

export const useUsersStore = create<UsersStore>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
}));
