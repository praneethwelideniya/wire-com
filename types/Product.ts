export interface Product {
  id: string;
  SKU: string;
  name: string;
  brandName: string;
  mainImage: string;
  price: {
    amount: string;
    currency: string;
  };
  sizes: string[];
  stockStatus: string;
  colour: string;
  description: string;
}
