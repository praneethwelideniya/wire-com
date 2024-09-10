import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "@/types/Product";
import { CartItem } from "@/types/Cart";

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, selectedSize?: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateItemQuantity: (productId: string, newQuantity: number) => void;
  updateItem: (productId: string, updates: Partial<CartItem>) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => string;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, selectedSize, quantity = 1) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.id === product.id && item.selectedSize === selectedSize
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id && item.selectedSize === selectedSize
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          } else {
            return {
              items: [...state.items, { ...product, quantity, selectedSize }],
            };
          }
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),
      updateItemQuantity: (productId, newQuantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId
              ? { ...item, quantity: Math.max(1, newQuantity) }
              : item
          ),
        })),
      updateItem: (productId, updates) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId ? { ...item, ...updates } : item
          ),
        })),
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },
      getTotalPrice: () => {
        const { items } = get();
        const total = items.reduce(
          (sum, item) => sum + parseFloat(item.price.amount) * item.quantity,
          0
        );
        return total.toFixed(2);
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
