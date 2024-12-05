import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AddressState {
  userAddress: string | null;
  setUserAddress: (address: string) => void;
  clearUserAddress: () => void;
}

export const useAddressStore = create(
  persist<AddressState>(
    (set) => ({
      userAddress: null,
      setUserAddress: (address) => set({ userAddress: address }),
      clearUserAddress: () => set({ userAddress: null }),
    }),
    {
      name: "user-address-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
