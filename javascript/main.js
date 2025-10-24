var inputPokemonName;
var searchBtn;
var filterBtn;
var deleteFilterBtn;
var randomBtn;
// Tipos btn
var steelTypeBtn;
var waterTypeBtn;
var bugTypeBtn;
var dragonTypeBtn;
var electricTypeBtn;
var ghostTypeBtn;
var fireTypeBtn;
var fairyTypeBtn;
var iceTypeBtn;
var fightingTypeBtn;
var normalTypeBtn;
var grassTypeBtn;
var psychicTypeBtn;
var rockTypeBtn;
var darkTypeBtn;
var groundTypeBtn;
var poisonTypeBtn;
var flyingTypeBtn;
var previousPageBtn;
var nextPageBtn;
var filteringTypes = [];
var paginaActualSpan;
var totalPaginasSpan;
var paginaActualCount = 1;
var totalPaginasCount = 1040 / 20;
document.addEventListener('DOMContentLoaded', onLoad);
function onLoad() {
    getAllPokemonPaginated();
    inputPokemonName = document.getElementById('input-pokemon-name');
    searchBtn = document.getElementById('search-btn');
    filterBtn = document.getElementById('filter-btn');
    deleteFilterBtn = document.getElementById('delete-btn');
    randomBtn = document.getElementById('random-btn');
    previousPageBtn = document.getElementById('previous');
    nextPageBtn = document.getElementById('next');
    previousPageBtn?.addEventListener('click', previousPage);
    nextPageBtn?.addEventListener('click', nextPage);
    paginaActualSpan = document.getElementById('paginaActual');
    totalPaginasSpan = document.getElementById('totalPaginas');
    if (paginaActualSpan && totalPaginasSpan) {
        paginaActualSpan.innerHTML = '' + paginaActualCount;
        totalPaginasSpan.innerHTML = '' + totalPaginasCount;
    }
    searchBtn?.addEventListener('click', () => {
        let pokemonSearchName = inputPokemonName?.value;
        if (pokemonSearchName || pokemonSearchName == '') {
            searchPokemon(pokemonSearchName);
        }
    });
    filterBtn?.addEventListener('click', openFilterMenu);
    randomBtn?.addEventListener('click', getRandomPokemon);
    steelTypeBtn = document.getElementById('steel');
    waterTypeBtn = document.getElementById('water');
    bugTypeBtn = document.getElementById('bug');
    dragonTypeBtn = document.getElementById('dragon');
    electricTypeBtn = document.getElementById('electric');
    ghostTypeBtn = document.getElementById('ghost');
    fireTypeBtn = document.getElementById('fire');
    fairyTypeBtn = document.getElementById('fairy');
    iceTypeBtn = document.getElementById('ice');
    fightingTypeBtn = document.getElementById('fighting');
    normalTypeBtn = document.getElementById('normal');
    grassTypeBtn = document.getElementById('grass');
    psychicTypeBtn = document.getElementById('psychic');
    rockTypeBtn = document.getElementById('rock');
    darkTypeBtn = document.getElementById('dark');
    groundTypeBtn = document.getElementById('ground');
    poisonTypeBtn = document.getElementById('poison');
    flyingTypeBtn = document.getElementById('flying');
    let allTypesBtn = document.querySelectorAll('.type-btn');
    deleteFilterBtn?.addEventListener('click', () => {
        deleteFilterOptions(allTypesBtn);
    });
    allTypesBtn.forEach(typeBtn => {
        typeBtn.addEventListener('click', () => {
            let getType = typeBtn.id;
            if (typeBtn.classList.contains('active-type')) {
                const index = filteringTypes.indexOf(getType);
                if (index > -1) {
                    filteringTypes.splice(index, 1);
                }
                console.log(filteringTypes);
                typeBtn.classList.remove('active-type');
                typeBtn.classList.add('unactive-type');
                if (filteringTypes.length == 0) {
                    getAllPokemonPaginated();
                }
            }
            else {
                filteringTypes = [];
                filteringTypes.push(getType);
                allTypesBtn.forEach(element => {
                    element.classList.add('unactive-type');
                });
                typeBtn.classList.add('active-type');
                typeBtn.classList.remove('unactive-type');
                searchPokemonByType(getType);
            }
        });
    });
}
var pokemonCount = 0;
async function previousPage() {
    if (pokemonCount != 0) {
        if (paginaActualSpan) {
            paginaActualCount--;
            paginaActualSpan.innerHTML = '' + paginaActualCount;
        }
        previousPageBtn?.classList.add('block');
        pokemonCount -= 20;
        let url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${pokemonCount}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const result = await response.json();
            console.log(result);
            printPokemon(result);
            // getPages();
        }
        catch (error) {
        }
    }
}
async function nextPage() {
    if (pokemonCount <= 1040) {
        if (paginaActualSpan) {
            paginaActualCount++;
            paginaActualSpan.innerHTML = '' + paginaActualCount;
        }
        pokemonCount += 20;
        let url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${pokemonCount}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const result = await response.json();
            console.log(result);
            printPokemon(result);
            // getPages();
        }
        catch (error) {
        }
    }
}
function deleteFilterOptions(allTypesBtn) {
    filteringTypes = [];
    allTypesBtn.forEach(typeBtn => {
        typeBtn.classList.remove('unactive-type');
        typeBtn.classList.remove('active-type');
    });
}
function openFilterMenu() {
    let filterMenu = document.getElementById('filter-menu');
    if (filterMenu?.classList.contains('hidden')) {
        filterMenu.classList.remove('hidden');
        filterBtn?.classList.add('flex');
    }
    else {
        filterMenu?.classList.add('hidden');
        filterBtn?.classList.remove('flex');
    }
}
async function searchPokemon(pokemon_name) {
    console.log(pokemon_name);
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon_name}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        window.location.href = `pokemon.html?name=${pokemon_name}`;
    }
    catch (error) {
    }
}
async function searchPokemonByType(pokemon_type) {
    const url = `https://pokeapi.co/api/v2/type/${pokemon_type}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        printPokemon(result.pokemon);
        console.log(result.pokemon);
    }
    catch (error) {
    }
}
async function getAllPokemonPaginated() {
    // para paginar, poner: ?limit=60
    //&offset=20 <- els seguents 20
    const url = "https://pokeapi.co/api/v2/pokemon?limit=20";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        printPokemon(result);
        // getPages();
    }
    catch (error) {
    }
}
async function getRandomPokemon() {
    let randomPokemonId = Math.floor(Math.random() * (1302 - 1) + 1);
    const url = `https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        window.location.href = `pokemon.html?name=${result.name}`;
    }
    catch (error) {
    }
}
function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
async function printPokemon(pokemonData) {
    document.body.style.cursor = 'wait';
    let allTypesBtn = document.querySelectorAll('.type-btn');
    allTypesBtn.forEach(btn => {
        btn.disabled = true;
    });
    let pokemonContainer = document.getElementById('listaPokemon');
    if (!pokemonContainer)
        return;
    pokemonContainer.innerHTML = '';
    // Determinar si viene de getAllPokemon o searchPokemonByType
    let pokemonList;
    if (pokemonData.results) {
        // Viene de getAllPokemonPaginated
        pokemonList = pokemonData.results;
    }
    else if (Array.isArray(pokemonData)) {
        // Viene de searchPokemonByType
        pokemonList = pokemonData.map((item) => item.pokemon);
    }
    else {
        return;
    }
    // Usar for...of en lugar de forEach
    for (const pokemon of pokemonList) {
        try {
            const response = await fetch(pokemon.url);
            const pokemonDetail = await response.json();
            const pokemonId = pokemonDetail.id.toString().padStart(3, '0');
            const types = pokemonDetail.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name.toUpperCase()}</p>`).join('');
            const height = (pokemonDetail.height / 10).toFixed(1);
            const weight = (pokemonDetail.weight / 10).toFixed(1);
            const div = `
                <div class="pokemon">
                <a href="/src/pokemon.html?name=${pokemonDetail.name}">
                    <p class="pokemon-id-back">#${pokemonId}</p>
                    <div class="pokemon-imagen">
                        <img src="${pokemonDetail.sprites.other['official-artwork'].front_default}" 
                             alt="${capitalizeFirstLetter(pokemonDetail.name)}">
                    </div>
                    <div class="pokemon-info">
                        <div class="nombre-contenedor">
                            <p class="pokemon-id">#${pokemonId}</p>
                            <h2 class="pokemon-nombre">${capitalizeFirstLetter(pokemonDetail.name)}</h2>
                        </div>
                        <div class="pokemon-tipos">
                            ${types}
                        </div>
                        <div class="pokemon-stats">
                            <p class="stat">${height}m</p>
                            <p class="stat">${weight}kg</p>
                        </div>
                    </div>
                    </a>
                </div>
            `;
            pokemonContainer.innerHTML += div;
        }
        catch (error) {
            console.error(`Error al cargar pokemon ${pokemon.name}:`, error);
        }
    }
    document.body.style.cursor = 'auto';
    allTypesBtn.forEach(btn => {
        btn.disabled = false;
    });
}
export {};
//# sourceMappingURL=main.js.map