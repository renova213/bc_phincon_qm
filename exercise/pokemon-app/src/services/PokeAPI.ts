export default class PokeAPI {
  static readonly BASE_URL = "https://pokeapi.co/api/v2";

  static async getPokemon(id: number | string): Promise<any> {
    try {
      const response = await fetch(`${this.BASE_URL}/pokemon/${id}`);
      if (!response.ok) throw new Error("Pokemon not found");
      const data = await response.json();
      return data; // You can replace 'any' with a proper interface
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
      throw error;
    }
  }

  static async getPokemonList(limit: number = 20, offset: number = 0): Promise<PokemonListResponse> {
    try {
      const response = await fetch(`${this.BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
      if (!response.ok) throw new Error("Failed to fetch Pokemon list");
      return await response.json();
    } catch (error) {
      console.error("Error fetching Pokemon list:", error);
      throw error;
    }
  }

  static async getAllTypes(): Promise<string[]> {
    try {
      const response = await fetch(`${this.BASE_URL}/type`);
      if (!response.ok) throw new Error("Failed to fetch types");
      const data: TypeListResponse = await response.json();
      return data.results.map((type) => type.name);
    } catch (error) {
      console.error("Error fetching types:", error);
      throw error;
    }
  }
}

// --- Interfaces for return types (simplified) ---

interface NamedAPIResource {
  name: string;
  url: string;
}

interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
}

interface TypeListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
}
