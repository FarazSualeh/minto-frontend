export type Category = {
  name: string;
  shortName: string;
  image: string;
};

export type Product = {
  name: string;
  category: string;
  weight: string;
  price: number;
  old: number | null;
  image: string;
  tag: string | null;
};

export type ApiCatalogCategory = {
  id?: number;
  name: string;
  image_url?: string | null;
  image?: string | null;
};

export type ApiCatalogProduct = {
  id?: number;
  name: string;
  title?: string;
  category?: string | { name?: string };
  unit?: string;
  weight?: string;
  base_price?: number;
  price?: number;
  mrp?: number;
  old_price?: number | null;
  image_url?: string | null;
  image?: string | null;
};

export function unwrapApiCollection<T>(
  value: T[] | { items?: T[]; data?: T[]; results?: T[] },
): T[] {
  if (Array.isArray(value)) return value;
  return value.items ?? value.data ?? value.results ?? [];
}

export function normalizeCategory(category: ApiCatalogCategory): Category {
  return {
    name: category.name,
    shortName: category.name,
    image:
      category.image_url ??
      category.image ??
      "/product-placeholder.svg",
  };
}

export function normalizeProduct(product: ApiCatalogProduct): Product {
  const price = Number(product.price ?? product.base_price ?? 0);
  const old = product.old_price ?? product.mrp ?? null;
  return {
    name: product.name ?? product.title ?? "Product",
    category:
      typeof product.category === "string"
        ? product.category
        : product.category?.name ?? "Essentials",
    weight: product.unit ?? product.weight ?? "1 unit",
    price,
    old: old == null ? null : Number(old),
    image:
      product.image_url ??
      product.image ??
      "/product-placeholder.svg",
    tag:
      old != null && Number(old) > price
        ? `${Math.round((1 - price / Number(old)) * 100)}% OFF`
        : null,
  };
}

export const categories: Category[] = [
  {
    name: "Fruits & vegetables",
    shortName: "Fruits",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=500&q=85",
  },
  {
    name: "Dairy & eggs",
    shortName: "Dairy",
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=500&q=85",
  },
  {
    name: "Bakery",
    shortName: "Bakery",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=85",
  },
  {
    name: "Snacks",
    shortName: "Snacks",
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=500&q=85",
  },
  {
    name: "Atta, rice & dal",
    shortName: "Staples",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=85",
  },
  {
    name: "Personal care",
    shortName: "Personal care",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=500&q=85",
  },
];

export const products: Product[] = [
  {
    name: "Fresh Bananas",
    category: "Fruits & vegetables",
    weight: "1 kg",
    price: 64,
    old: 72,
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=600&q=85",
    tag: "14% OFF",
  },
  {
    name: "Red Tomatoes",
    category: "Fruits & vegetables",
    weight: "500 g",
    price: 32,
    old: 38,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=85",
    tag: "12% OFF",
  },
  {
    name: "Fresh Milk",
    category: "Dairy & eggs",
    weight: "1 litre",
    price: 68,
    old: null,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=85",
    tag: null,
  },
  {
    name: "Farm Eggs",
    category: "Dairy & eggs",
    weight: "6 pcs",
    price: 54,
    old: 60,
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=600&q=85",
    tag: "10% OFF",
  },
  {
    name: "Brown Bread",
    category: "Bakery",
    weight: "400 g",
    price: 48,
    old: null,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=85",
    tag: null,
  },
];
