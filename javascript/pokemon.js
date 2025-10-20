document.addEventListener('DOMContentLoaded', onLoad);
function onLoad() {
    const params = new URLSearchParams(window.location.search);
    const pokemon = params.get("name");
    if (pokemon) {
        searchPokemon(pokemon);
    }
    ;
}
async function searchPokemon(pokemon_name) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon_name}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const thisPokemon = await response.json();
        console.log(thisPokemon);
        let pokemonId = document.getElementById('pokemon-id');
        let pokemonName = document.getElementById('pokemon-name');
        let pokemonHeight = document.getElementById('pokemon-height');
        let pokemonWeight = document.getElementById('pokemon-weight');
        let pokemonTypes = document.getElementById('pokemon-types');
        let pokemonImg = document.getElementById('pokemon-img');
        if (pokemonId && pokemonName && pokemonHeight && pokemonWeight && pokemonTypes && pokemonImg) {
            pokemonImg.src = thisPokemon.sprites.other['official-artwork'].front_default;
            pokemonId.textContent = thisPokemon.id;
            pokemonName.textContent = capitalizeFirstLetter(thisPokemon.name);
            pokemonHeight.textContent = thisPokemon.height;
            pokemonWeight.textContent = thisPokemon.weight;
            pokemonTypes.textContent = thisPokemon.types.map((t) => capitalizeFirstLetter(t.type.name)).join(' - ');
        }
    }
    catch (error) {
    }
}
// function getThisPokemon()
function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
export {};
//# sourceMappingURL=pokemon.js.map