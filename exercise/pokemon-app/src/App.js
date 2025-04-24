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
async function init() {
  try {
    // Load initial Pokemon
    await loadPokemon();

    // Set up event listeners
    setupEventListeners();
  } catch (error) {
    console.error("Initialization error:", error);
    alert("Failed to initialize the app. Please try again later.");
  }
}

// Load Pokemon for current page
async function loadPokemon() {
  try {
    const offset = (state.currentPage - 1) * state.itemsPerPage;
    const response = await PokeAPI.getPokemonList(state.itemsPerPage, offset);

    state.totalPokemon = response.count;

    // Fetch details for each Pokemon in parallel
    const pokemonDetails = await Promise.all(
      response.results.map((pokemon) => PokeAPI.getPokemon(pokemon.name))
    );

    state.allPokemon = pokemonDetails.map((data) => new Pokemon(data));
    filterAndSortPokemon();
    renderPokemon();
    renderPagination();
  } catch (error) {
    console.error("Error loading Pokemon:", error);
    alert("Failed to load Pokemon. Please try again.");
  } 
}

// Filter and sort Pokemon based on current state
function filterAndSortPokemon() {
  let filtered = [...state.allPokemon];

  // Apply search filter
  if (state.searchTerm) {
    const term = state.searchTerm.toLowerCase();
    filtered = filtered.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(term) ||
        pokemon.number.toString().includes(term)
    );
  }

  state.displayedPokemon = filtered;
}

// Render Pokemon to the grid
function renderPokemon() {
  elements.pokemonGrid.innerHTML = "";

  if (state.displayedPokemon.length === 0) {
    elements.pokemonGrid.innerHTML = `
            <div class="col-span-full text-center py-8 text-gray-500">
                No Pokemon found matching your criteria.
            </div>
        `;
    return;
  }

  state.displayedPokemon.forEach((pokemon) => {
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
                  .toString()
                  .padStart(3, "0")}</p>
                <h3 class="font-bold text-lg capitalize">${pokemon.name}</h3>
                <div class="flex gap-2 mt-2">
                    ${pokemon.types
                      .map(
                        (type) => `
                        <span class="px-2 py-1 text-xs rounded-full type-${type}">${
                          type.charAt(0).toUpperCase() + type.slice(1)
                        }</span>
                    `
                      )
                      .join("")}
                </div>
            </div>
        `;

    card.addEventListener("click", () => showPokemonDetails(pokemon));
    elements.pokemonGrid.appendChild(card);
  });
}

// Render pagination controls
function renderPagination() {
  elements.pageNumbers.innerHTML = "";

  const totalPages = Math.ceil(state.totalPokemon / state.itemsPerPage);
  const maxVisiblePages = 5;
  let startPage, endPage;

  if (totalPages <= maxVisiblePages) {
    startPage = 1;
    endPage = totalPages;
  } else {
    const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2);
    const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;

    if (state.currentPage <= maxPagesBeforeCurrent) {
      startPage = 1;
      endPage = maxVisiblePages;
    } else if (state.currentPage + maxPagesAfterCurrent >= totalPages) {
      startPage = totalPages - maxVisiblePages + 1;
      endPage = totalPages;
    } else {
      startPage = state.currentPage - maxPagesBeforeCurrent;
      endPage = state.currentPage + maxPagesAfterCurrent;
    }
  }

  // Previous button
  elements.prevPage.disabled = state.currentPage === 1;

  // Page numbers
  if (startPage > 1) {
    const firstPage = document.createElement("button");
    firstPage.className =
      "w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full";
    firstPage.textContent = "1";
    firstPage.addEventListener("click", () => goToPage(1));
    elements.pageNumbers.appendChild(firstPage);

    if (startPage > 2) {
      const ellipsis = document.createElement("span");
      ellipsis.className = "flex items-center";
      ellipsis.textContent = "...";
      elements.pageNumbers.appendChild(ellipsis);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageButton = document.createElement("button");
    pageButton.className = `w-10 h-10 rounded-full ${
      i === state.currentPage
        ? "bg-yellow-400 text-white font-bold"
        : "bg-gray-200 hover:bg-gray-300"
    }`;
    pageButton.textContent = i;
    pageButton.addEventListener("click", () => goToPage(i));
    elements.pageNumbers.appendChild(pageButton);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      const ellipsis = document.createElement("span");
      ellipsis.className = "flex items-center";
      ellipsis.textContent = "...";
      elements.pageNumbers.appendChild(ellipsis);
    }

    const lastPage = document.createElement("button");
    lastPage.className = "w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full";
    lastPage.textContent = totalPages;
    lastPage.addEventListener("click", () => goToPage(totalPages));
    elements.pageNumbers.appendChild(lastPage);
  }

  // Next button
  elements.nextPage.disabled = state.currentPage === totalPages;
}

// Show Pokemon details in modal
function showPokemonDetails(pokemon) {
  elements.modalImage.src = pokemon.image;
  elements.modalImage.alt = pokemon.name;
  elements.modalName.textContent = pokemon.name;
  elements.modalNumber.textContent = `#${pokemon.number
    .toString()
    .padStart(3, "0")}`;

  elements.modalTypes.innerHTML = "";
  pokemon.types.forEach((type) => {
    const typeBadge = document.createElement("span");
    typeBadge.className = `px-3 py-1 text-sm rounded-full capitalize type-${type}`;
    typeBadge.textContent = type;
    elements.modalTypes.appendChild(typeBadge);
  });

  elements.modalHeight.textContent = `${pokemon.height}m`;
  elements.modalWeight.textContent = `${pokemon.weight}kg`;

  elements.modalAbilities.innerHTML = "";
  pokemon.abilities.forEach((ability) => {
    const li = document.createElement("li");
    li.className = `py-1 ${ability.isHidden ? "text-gray-500" : ""}`;
    li.textContent = ability.name + (ability.isHidden ? " (hidden)" : "");
    elements.modalAbilities.appendChild(li);
  });

  elements.modalStats.innerHTML = "";
  pokemon.stats.forEach((stat) => {
    const statDiv = document.createElement("div");
    statDiv.innerHTML = `
            <div class="flex justify-between text-sm mb-1">
                <span>${stat.name}</span>
                <span>${stat.value}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-green-500 h-2 rounded-full" style="width: ${Math.min(
                  100,
                  stat.value
                )}%"></div>
            </div>
        `;
    elements.modalStats.appendChild(statDiv);
  });

  elements.pokemonModal.classList.remove("hidden");
}

// Navigate to specific page
function goToPage(page) {
  if (page === state.currentPage) return;

  state.currentPage = page;
  loadPokemon();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Set up event listeners
function setupEventListeners() {
  // Search
  elements.searchButton.addEventListener("click", handleSearch);
  elements.searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") handleSearch();
  });

  // Pagination
  elements.prevPage.addEventListener("click", () =>
    goToPage(state.currentPage - 1)
  );
  elements.nextPage.addEventListener("click", () =>
    goToPage(state.currentPage + 1)
  );

  // Modal
  elements.closeModal.addEventListener("click", () => {
    elements.pokemonModal.classList.add("hidden");
  });

  window.addEventListener("click", (e) => {
    if (e.target === elements.pokemonModal) {
      elements.pokemonModal.classList.add("hidden");
    }
  });
}

// Handle search
function handleSearch() {
  state.searchTerm = elements.searchInput.value.trim();
  state.currentPage = 1;
  filterAndSortPokemon();
  renderPokemon();
  renderPagination();
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", init);
