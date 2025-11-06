// src/types/Food.ts

export interface Food {
  id: number; // <-- Penting: JSON Anda menggunakan number, bukan string
  name: string;
  origin: string;
  mainIngredient: string;
  spiceLevel: string;
  category: string;
  description: string;
  image: string;
  ingredients: string[];
}