const urlParams = new URLSearchParams(window.location.search);
const number = urlParams.get('pokemonNumber');

let currentPokemonId = null;

document.addEventListener("DOMContentLoaded", () => {
  const MAX_POKEMONS = 151;
  const pokemonID = new URLSearchParams(window.location.search).get("pokemonNumber");
  const id = parseInt(pokemonID, 10);

  if (id < 1 || id > MAX_POKEMONS) {
    return (window.location.href = "./index.html");
  }

  currentPokemonId = id;
  loadPokemon(id);
});

