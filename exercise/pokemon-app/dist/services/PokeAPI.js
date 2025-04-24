var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class PokeAPI {
    static getPokemon(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${this.BASE_URL}/pokemon/${id}`);
                if (!response.ok)
                    throw new Error("Pokemon not found");
                const data = yield response.json();
                return data; // You can replace 'any' with a proper interface
            }
            catch (error) {
                console.error("Error fetching Pokemon:", error);
                throw error;
            }
        });
    }
    static getPokemonList() {
        return __awaiter(this, arguments, void 0, function* (limit = 20, offset = 0) {
            try {
                const response = yield fetch(`${this.BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
                if (!response.ok)
                    throw new Error("Failed to fetch Pokemon list");
                return yield response.json();
            }
            catch (error) {
                console.error("Error fetching Pokemon list:", error);
                throw error;
            }
        });
    }
    static getAllTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${this.BASE_URL}/type`);
                if (!response.ok)
                    throw new Error("Failed to fetch types");
                const data = yield response.json();
                return data.results.map((type) => type.name);
            }
            catch (error) {
                console.error("Error fetching types:", error);
                throw error;
            }
        });
    }
}
PokeAPI.BASE_URL = "https://pokeapi.co/api/v2";
export default PokeAPI;
