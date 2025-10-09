var inputPokemonName: HTMLInputElement | null;
var searchBtn: HTMLElement | null;
var filterBtn: HTMLElement | null;
var steelTypeBtn: HTMLElement | null;
var waterTypeBtn: HTMLElement | null;
var bugTypeBtn: HTMLElement | null;
var dragonTypeBtn: HTMLElement | null;
var electricTypeBtn: HTMLElement | null;
var ghostTypeBtn: HTMLElement | null;
var fireTypeBtn: HTMLElement | null;
var fairyTypeBtn: HTMLElement | null;
var iceTypeBtn: HTMLElement | null;
var fightingTypeBtn: HTMLElement | null;
var normalTypeBtn: HTMLElement | null;
var grassTypeBtn: HTMLElement | null;
var psychicTypeBtn: HTMLElement | null;
var rockTypeBtn: HTMLElement | null;
var darkTypeBtn: HTMLElement | null;
var groundTypeBtn: HTMLElement | null;
var poisonTypeBtn: HTMLElement | null;
var flyingTypeBtn: HTMLElement | null;

var filteringTypes: string[] = [];


document.addEventListener('DOMContentLoaded', onLoad);

function onLoad(): void {

    getAllPokemonPaginated();

    inputPokemonName = document.getElementById('input-pokemon-name') as HTMLInputElement;

    searchBtn = document.getElementById('search-btn');

    filterBtn = document.getElementById('filter-btn');

    searchBtn?.addEventListener('click', () => {

        let pokemonSearchName: string | undefined = inputPokemonName?.value;

        if (pokemonSearchName) {

            searchPokemon(pokemonSearchName);

        }

    })

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


function openFilterMenu(): void {

    let filterMenu: HTMLElement | null = document.getElementById('filter-menu');

    if (filterMenu?.classList.contains('hidden')) {
        filterMenu.classList.remove('hidden');
        filterBtn?.classList.add('flex');
    } else {
        filterMenu?.classList.add('hidden');
        filterBtn?.classList.remove('flex');
    }

    let allTypesBtn: NodeListOf<HTMLElement> = document.querySelectorAll('.type-btn');

    allTypesBtn.forEach(typeBtn => {

        typeBtn.addEventListener('click', (): void => {

            let getType:string = typeBtn.id;
            
            if (getType == 'delete') {

                filteringTypes = [];

            } else {

                typeBtn.classList.add('active-type');

                filteringTypes.push(getType);
            }
            
        })

    });



}

async function searchPokemon(pokemon_name: string): Promise<void> {

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon_name}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
    } catch (error) {
    }
}



async function getAllPokemonPaginated(): Promise<void> {
    // para paginar, poner: ?limit=60
    const url = "https://pokeapi.co/api/v2/pokemon/";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
    } catch (error) {
    }
}