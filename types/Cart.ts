import { Product } from "@/types/Product";

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
}
