export default class PokeAPI {
  static BASE_URL = "https://pokeapi.co/api/v2";

  static async getPokemon(id) {
    try {
      const response = await fetch(`${this.BASE_URL}/pokemon/${id}`);
      if (!response.ok) throw new Error("Pokemon not found");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
      throw error;
    }
  }

  static async getPokemonList(limit = 20, offset = 0) {
    try {
      const response = await fetch(
        `${this.BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
      );
      if (!response.ok) throw new Error("Failed to fetch Pokemon list");
      return await response.json();
    } catch (error) {
      console.error("Error fetching Pokemon list:", error);
      throw error;
    }
  }

  static async getAllTypes() {
    try {
      const response = await fetch(`${this.BASE_URL}/type`);
      if (!response.ok) throw new Error("Failed to fetch types");
      const data = await response.json();
      return data.results.map((type) => type.name);
    } catch (error) {
      console.error("Error fetching types:", error);
      throw error;
    }
  }
}
