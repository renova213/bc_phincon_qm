var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Pokemon from "./models/Pokemon.js";
import PokeAPI from "./services/PokeAPI.js";
// DOM Elements
const elements = {
    pokemonGrid: document.getElementById("pokemonGrid"),
    searchInput: document.getElementById("searchInput"),
    searchButton: document.getElementById("searchButton"),
    pagination: document.getElementById("pagination"),
    prevPage: document.getElementById("prevPage"),
    nextPage: document.getElementById("nextPage"),
    pageNumbers: document.getElementById("pageNumbers"),
    pokemonModal: document.getElementById("pokemonModal"),
    closeModal: document.getElementById("closeModal"),
    modalImage: document.getElementById("modalImage"),
    modalName: document.getElementById("modalName"),
    modalNumber: document.getElementById("modalNumber"),
    modalTypes: document.getElementById("modalTypes"),
    modalHeight: document.getElementById("modalHeight"),
    modalWeight: document.getElementById("modalWeight"),
    modalAbilities: document.getElementById("modalAbilities"),
    modalStats: document.getElementById("modalStats"),
};
// App State
const state = {
    currentPage: 1,
    itemsPerPage: 20,
    totalPokemon: 0,
    allPokemon: [],
    displayedPokemon: [],
    searchTerm: "",
};
// Initialize the app
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Load initial Pokemon
            yield loadPokemon();
            // Set up event listeners
            setupEventListeners();
        }
        catch (error) {
            console.error("Initialization error:", error);
            alert("Failed to initialize the app. Please try again later.");
        }
    });
}
// Load Pokemon for current page
function loadPokemon() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const offset = (state.currentPage - 1) * state.itemsPerPage;
            const response = yield PokeAPI.getPokemonList(state.itemsPerPage, offset);
            state.totalPokemon = response.count;
            // Fetch details for each Pokemon in parallel
            const pokemonDetails = yield Promise.all(response.results.map((pokemon) => PokeAPI.getPokemon(pokemon.name)));
            state.allPokemon = pokemonDetails.map((data) => new Pokemon(data));
            filterPokemon();
            renderPokemon();
            renderPagination();
        }
        catch (error) {
            console.error("Error loading Pokemon:", error);
            alert("Failed to load Pokemon. Please try again.");
        }
    });
}
// Filter Pokemon based on current state
function filterPokemon() {
    let filtered = [...state.allPokemon];
    // Apply search filter
    if (state.searchTerm) {
        const term = state.searchTerm.toLowerCase();
        filtered = filtered.filter((pokemon) => {
            var _a;
            return (_a = pokemon.name.toLowerCase().includes(term)) !== null && _a !== void 0 ? _a : pokemon.number.toString().includes(term);
        });
    }
    state.displayedPokemon = filtered;
}
// Render Pokemon to the grid
function renderPokemon() {
    if (elements.pokemonGrid) {
        elements.pokemonGrid.innerHTML = "";
    }
    if ((state.displayedPokemon.length === 0) && (elements.pokemonGrid)) {
        elements.pokemonGrid.innerHTML = `
            <div class="col-span-full text-center py-8 text-gray-500">
                No Pokemon found matching your criteria.
            </div>
        `;
        return;
    }
    state.displayedPokemon.forEach((pokemon) => {
        var _a;
        const card = document.createElement("div");
        card.className =
            "bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer";
        card.innerHTML = `
            <div class="bg-gray-100 p-4 flex justify-center">
                <img 
                    src="${pokemon.image}" 
                    alt="${pokemon.name}" 
                    class="h-32 w-32"
                    loading="lazy"
                >
            </div>
            <div class="p-4">
                <p class="text-gray-500 text-sm">#${pokemon.number
            .toString()}</p>
                <h3 class="font-bold text-lg capitalize">${pokemon.name}</h3>
                <div class="flex gap-2 mt-2">
                    ${pokemon.types
            .map((type) => `
                        <span class="px-2 py-1 text-xs rounded-full type-${type}">${type.charAt(0).toUpperCase() + type.slice(1)}</span>
                    `)
            .join("")}
                </div>
            </div>
        `;
        card.addEventListener("click", () => showPokemonDetails(pokemon));
        (_a = elements === null || elements === void 0 ? void 0 : elements.pokemonGrid) === null || _a === void 0 ? void 0 : _a.appendChild(card);
    });
}
// Render pagination controls
function renderPagination() {
    const totalPages = Math.ceil(state.totalPokemon / state.itemsPerPage);
    const maxVisiblePages = 5;
    let startPage, endPage;
    if (totalPages <= maxVisiblePages) {
        startPage = 1;
        endPage = totalPages;
    }
    else {
        const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2);
        const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;
        if (state.currentPage <= maxPagesBeforeCurrent) {
            startPage = 1;
            endPage = maxVisiblePages;
        }
        else if (state.currentPage + maxPagesAfterCurrent >= totalPages) {
            startPage = totalPages - maxVisiblePages + 1;
            endPage = totalPages;
        }
        else {
            startPage = state.currentPage - maxPagesBeforeCurrent;
            endPage = state.currentPage + maxPagesAfterCurrent;
        }
    }
    elements.prevPage.disabled = (state.currentPage === 1);
    const pageNumbersContainer = elements.pageNumbers;
    if (pageNumbersContainer) {
        pageNumbersContainer.innerHTML = "";
        if (startPage > 1) {
            pageNumbersContainer.appendChild(createPageButton(1));
            if (startPage > 2) {
                pageNumbersContainer.appendChild(createEllipsis());
            }
        }
        for (let page = startPage; page <= endPage; page++) {
            pageNumbersContainer.appendChild(createPageButton(page));
        }
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageNumbersContainer.appendChild(createEllipsis());
            }
            pageNumbersContainer.appendChild(createPageButton(totalPages));
        }
    }
    elements.nextPage.disabled = (state.currentPage === totalPages);
}
function createPageButton(pageNumber) {
    const button = document.createElement("button");
    button.className = `w-10 h-10 rounded-full ${pageNumber === state.currentPage
        ? "bg-yellow-400 text-white font-bold"
        : "bg-gray-200 hover:bg-gray-300"}`;
    button.textContent = pageNumber.toString();
    button.addEventListener("click", () => goToPage(pageNumber));
    return button;
}
function createEllipsis() {
    const ellipsis = document.createElement("span");
    ellipsis.className = "flex items-center";
    ellipsis.textContent = "...";
    return ellipsis;
}
// Show Pokemon details in modal
function showPokemonDetails(pokemon) {
    var _a, _b;
    elements.modalImage.src = (_a = pokemon.image) !== null && _a !== void 0 ? _a : "";
    elements.modalImage.alt = pokemon.name;
    if (elements.modalName) {
        elements.modalName.textContent = pokemon.name;
    }
    if (elements.modalNumber) {
        elements.modalNumber.textContent = `#${pokemon.number
            .toString()}`;
    }
    if (elements.modalTypes) {
        elements.modalTypes.innerHTML = "";
    }
    pokemon.types.forEach((type) => {
        var _a;
        const typeBadge = document.createElement("span");
        typeBadge.className = `px-3 py-1 text-sm rounded-full capitalize type-${type}`;
        typeBadge.textContent = type;
        (_a = elements === null || elements === void 0 ? void 0 : elements.modalTypes) === null || _a === void 0 ? void 0 : _a.appendChild(typeBadge);
    });
    if (elements.modalHeight) {
        elements.modalHeight.textContent = `${pokemon.height}m`;
    }
    if (elements.modalWeight) {
        elements.modalWeight.textContent = `${pokemon.weight}kg`;
    }
    if (elements.modalAbilities) {
        elements.modalAbilities.innerHTML = "";
    }
    pokemon.abilities.forEach((ability) => {
        var _a;
        const li = document.createElement("li");
        li.className = `py-1 ${ability.isHidden ? "text-gray-500" : ""}`;
        li.textContent = ability.name + (ability.isHidden ? " (hidden)" : "");
        (_a = elements === null || elements === void 0 ? void 0 : elements.modalAbilities) === null || _a === void 0 ? void 0 : _a.appendChild(li);
    });
    if (elements.modalStats) {
        elements.modalStats.innerHTML = "";
    }
    pokemon.stats.forEach((stat) => {
        var _a;
        const statDiv = document.createElement("div");
        statDiv.innerHTML = `
            <div class="flex justify-between text-sm mb-1">
                <span>${stat.name}</span>
                <span>${stat.value}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-green-500 h-2 rounded-full" style="width: ${Math.min(100, stat.value)}%"></div>
            </div>
        `;
        (_a = elements === null || elements === void 0 ? void 0 : elements.modalStats) === null || _a === void 0 ? void 0 : _a.appendChild(statDiv);
    });
    (_b = elements === null || elements === void 0 ? void 0 : elements.pokemonModal) === null || _b === void 0 ? void 0 : _b.classList.remove("hidden");
}
// Navigate to specific page
function goToPage(page) {
    if (page === state.currentPage)
        return;
    state.currentPage = page;
    loadPokemon();
    window.scrollTo({ top: 0, behavior: "smooth" });
}
// Set up event listeners
function setupEventListeners() {
    // Search
    elements.searchButton.addEventListener("click", handleSearch);
    elements.searchInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter")
            handleSearch();
    });
    // Pagination
    elements.prevPage.addEventListener("click", () => goToPage(state.currentPage - 1));
    elements.nextPage.addEventListener("click", () => goToPage(state.currentPage + 1));
    // Modal
    elements.closeModal.addEventListener("click", () => {
        var _a;
        (_a = elements === null || elements === void 0 ? void 0 : elements.pokemonModal) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
    });
    window.addEventListener("click", (e) => {
        var _a;
        if (e.target === elements.pokemonModal) {
            (_a = elements === null || elements === void 0 ? void 0 : elements.pokemonModal) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
        }
    });
}
// Handle search
function handleSearch() {
    state.searchTerm = elements.searchInput.value.trim();
    state.currentPage = 1;
    filterPokemon();
    renderPokemon();
    renderPagination();
}
// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", init);
