import { z } from "zod";

export const categorySchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  image_url: z.string().url().nullish(),
  image: z.string().url().nullish(),
});

export const productSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  title: z.string().optional(),
  category: z.union([z.string(), z.object({ name: z.string().optional() })]).optional(),
  unit: z.string().optional(),
  weight: z.string().optional(),
  base_price: z.number().optional(),
  price: z.number().optional(),
  mrp: z.number().optional(),
  old_price: z.number().nullish(),
  image_url: z.string().url().nullish(),
  image: z.string().url().nullish(),
});

export const cartItemSchema = z.object({
  product_id: z.number(),
  name: z.string(),
  image: z.string().nullish(),
  quantity: z.number().int().positive(),
  weight: z.string().optional(),
  unit_price: z.number(),
  line_total: z.number(),
});

export const cartSchema = z.object({
  items: z.array(cartItemSchema).default([]),
  subtotal: z.number(),
  delivery_fee: z.number(),
  total: z.number(),
});
