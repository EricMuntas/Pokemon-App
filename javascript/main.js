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
var filteringTypes = [];
document.addEventListener('DOMContentLoaded', onLoad);
function onLoad() {
    getAllPokemonPaginated();
    inputPokemonName = document.getElementById('input-pokemon-name');
    searchBtn = document.getElementById('search-btn');
    filterBtn = document.getElementById('filter-btn');
    deleteFilterBtn = document.getElementById('delete-btn');
    randomBtn = document.getElementById('random-btn');
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
            }
            else {
                typeBtn.classList.add('active-type');
                typeBtn.classList.remove('unactive-type');
                filteringTypes.push(getType);
                allTypesBtn.forEach(element => {
                    if (!element.classList.contains('active-type')) {
                        element.classList.add('unactive-type');
                    }
                });
                searchPokemonByType(getType);
            }
        });
    });
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
        console.log(result.pokemon);
    }
    catch (error) {
    }
}
async function getAllPokemonPaginated() {
    // para paginar, poner: ?limit=60
    const url = "https://pokeapi.co/api/v2/pokemon/";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
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
    }
    catch (error) {
    }
}
function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
export {};
//# sourceMappingURL=main.js.map