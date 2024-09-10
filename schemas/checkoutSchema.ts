import { z } from "zod";

export const addressSchema = z.object({
  name: z.string().min(1, "Name is required"),
  street1: z.string().min(1, "Street is required"),
  street2: z.string().optional(),
  suburb: z.string().min(1, "Suburb is required"),
  state: z.string().min(1, "State is required"),
  postCode: z.string().regex(/^\d{4}$/, "Invalid postcode"),
});

export const cardSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, "Invalid card number"),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date (MM/YY)"),
  cvv: z.string().regex(/^\d{3}$/, "Invalid CVV"),
});

export const checkoutSchema = z.object({
  shippingAddress: addressSchema,
  sameAsBilling: z.boolean(),
  saveAddress: z.boolean(),
  cardDetails: cardSchema,
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
