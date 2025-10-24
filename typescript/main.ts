var inputPokemonName: HTMLInputElement | null;
var searchBtn: HTMLElement | null;
var filterBtn: HTMLElement | null;
var deleteFilterBtn: HTMLElement | null;
var randomBtn: HTMLElement | null;

// Tipos btn
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

var previousPageBtn: HTMLButtonElement | null;
var nextPageBtn: HTMLButtonElement | null;

var filteringTypes: string[] = [];

var paginaActualSpan: HTMLSpanElement | null;
var totalPaginasSpan: HTMLSpanElement | null;

var paginaActualCount: number = 1;
var totalPaginasCount: number = 1040 / 20;

document.addEventListener('DOMContentLoaded', onLoad);

function onLoad(): void {

    getAllPokemonPaginated();

    inputPokemonName = document.getElementById('input-pokemon-name') as HTMLInputElement;

    searchBtn = document.getElementById('search-btn');

    filterBtn = document.getElementById('filter-btn');

    deleteFilterBtn = document.getElementById('delete-btn');

    randomBtn = document.getElementById('random-btn');

    previousPageBtn = document.getElementById('previous') as HTMLButtonElement;
    nextPageBtn = document.getElementById('next') as HTMLButtonElement;

    previousPageBtn?.addEventListener('click', previousPage);
    nextPageBtn?.addEventListener('click', nextPage);

    paginaActualSpan = document.getElementById('paginaActual');
    totalPaginasSpan = document.getElementById('totalPaginas');

    if (paginaActualSpan && totalPaginasSpan) {

        paginaActualSpan.innerHTML = '' + paginaActualCount;
        totalPaginasSpan.innerHTML = '' + totalPaginasCount;

    }


    searchBtn?.addEventListener('click', () => {

        let pokemonSearchName: string | undefined | '' = inputPokemonName?.value;

        if (pokemonSearchName || pokemonSearchName == '') {

            searchPokemon(pokemonSearchName);

        }

    })

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

    let allTypesBtn: NodeListOf<HTMLElement> = document.querySelectorAll('.type-btn');

    deleteFilterBtn?.addEventListener('click', () => {

        deleteFilterOptions(allTypesBtn);

    });

    allTypesBtn.forEach(typeBtn => {

        typeBtn.addEventListener('click', (): void => {

            let getType: string = typeBtn.id;

            if (typeBtn.classList.contains('active-type')) {

                const index = filteringTypes.indexOf(getType);

                if (index > -1) {
                    filteringTypes.splice(index, 1);
                }

                console.log(filteringTypes)

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

                })

                typeBtn.classList.add('active-type');
                typeBtn.classList.remove('unactive-type');

                searchPokemonByType(getType);

            }

        })

    });


}

var pokemonCount: number = 0

async function previousPage(): Promise<void> {
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
        } catch (error) {
        }
    }

}

async function nextPage(): Promise<void> {
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
        } catch (error) {
        }
    }

}


function deleteFilterOptions(allTypesBtn: NodeListOf<HTMLElement>): void {
    filteringTypes = [];
    allTypesBtn.forEach(typeBtn => {
        typeBtn.classList.remove('unactive-type');
        typeBtn.classList.remove('active-type');
    })
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

}

async function searchPokemon(pokemon_name: string): Promise<void> {
    console.log(pokemon_name)
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon_name}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        window.location.href = `pokemon.html?name=${pokemon_name}`;

    } catch (error) {
    }
}

async function searchPokemonByType(pokemon_type: string): Promise<void> {
    const url = `https://pokeapi.co/api/v2/type/${pokemon_type}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        printPokemon(result.pokemon);
        console.log(result.pokemon)
    } catch (error) {
    }
}


async function getAllPokemonPaginated(): Promise<void> {
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
    } catch (error) {
    }
}


async function getRandomPokemon(): Promise<void> {

    let randomPokemonId: number = Math.floor(Math.random() * (1302 - 1) + 1);

    const url = `https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);

        window.location.href = `pokemon.html?name=${result.name}`;
    } catch (error) {
    }

}

function capitalizeFirstLetter(val: string): string {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}



async function printPokemon(pokemonData: any): Promise<void> {

    document.body.style.cursor = 'wait';

    let allTypesBtn: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.type-btn');

    allTypesBtn.forEach(btn => {
        btn.disabled = true;
    });

    let pokemonContainer: HTMLElement | null = document.getElementById('listaPokemon');

    if (!pokemonContainer) return;

    pokemonContainer.innerHTML = '';

    // Determinar si viene de getAllPokemon o searchPokemonByType
    let pokemonList: any[];

    if (pokemonData.results) {
        // Viene de getAllPokemonPaginated
        pokemonList = pokemonData.results;
    } else if (Array.isArray(pokemonData)) {
        // Viene de searchPokemonByType
        pokemonList = pokemonData.map((item: any) => item.pokemon);
    } else {
        return;
    }

    // Usar for...of en lugar de forEach
    for (const pokemon of pokemonList) {
        try {
            const response = await fetch(pokemon.url);
            const pokemonDetail = await response.json();

            const pokemonId = pokemonDetail.id.toString().padStart(3, '0');
            const types = pokemonDetail.types.map((type: any) =>
                `<p class="${type.type.name} tipo">${type.type.name.toUpperCase()}</p>`
            ).join('');
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

        } catch (error) {
            console.error(`Error al cargar pokemon ${pokemon.name}:`, error);
        }
    }

    document.body.style.cursor = 'auto';

    allTypesBtn.forEach(btn => {
        btn.disabled = false;
    });
}