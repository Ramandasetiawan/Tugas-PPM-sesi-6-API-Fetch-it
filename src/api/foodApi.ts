// Mengimpor tipe 'Food' dari file types Anda
import { Food } from "../types/Food";

// URL dasar untuk endpoint 'foods' di MockAPI
const API_URL = "https://690b65716ad3beba00f4c1a6.mockapi.io/food/manzz";

export const getFoods = async (): Promise<Food[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Gagal memuat data: ${response.status} ${response.statusText}`);
    }
    return await response.json() as Food[];
  } catch (error) {
    console.error("Terjadi error saat mengambil data food:", error);
    
    return [];
  }
};

