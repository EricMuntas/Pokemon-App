var inputPokemonName;
var searchBtn;
var filterBtn;
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
    searchBtn?.addEventListener('click', () => {
        let pokemonSearchName = inputPokemonName?.value;
        if (pokemonSearchName) {
            searchPokemon(pokemonSearchName);
        }
    });
    filterBtn?.addEventListener('click', openFilterMenu);
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
    let allTypesBtn = document.querySelectorAll('.type-btn');
    allTypesBtn.forEach(typeBtn => {
        typeBtn.addEventListener('click', () => {
            let getType = typeBtn.id;
            if (getType == 'delete') {
                filteringTypes = [];
            }
            else {
                typeBtn.classList.add('active-type');
                filteringTypes.push(getType);
            }
        });
    });
}
async function searchPokemon(pokemon_name) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon_name}`;
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
export {};
//# sourceMappingURL=main.js.map