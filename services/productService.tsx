import { Product } from "@/types/Product";
import axios from "axios";

const apiUrl = process.env.EXPO_PUBLIC_BASE_API;
export const productService = {
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await axios.get<{ data: Product[] }>(
        `${apiUrl}/products.json`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },
};
