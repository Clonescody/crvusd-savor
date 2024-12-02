import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AddressState {
  userAddress: string;
  setUserAddress: (address: string) => void;
  clearUserAddress: () => void;
}

export const useAddressStore = create(
  persist<AddressState>(
    (set) => ({
      userAddress: "",
      setUserAddress: (address) => set({ userAddress: address }),
      clearUserAddress: () => set({ userAddress: "" }),
    }),
    {
      name: "user-address-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
