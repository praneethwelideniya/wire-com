import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Address {
  name: string;
  street1: string;
  street2?: string;
  suburb: string;
  state: string;
  postCode: string;
}

interface CheckoutStore {
  savedAddress: Address | null;
  saveAddress: (address: Address) => void;
}

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set) => ({
      savedAddress: null,
      saveAddress: (address) => set({ savedAddress: address }),
    }),
    {
      name: "checkout-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
