const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const searchPokemon = document.getElementById("search-pokemon");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
        <li id="pokemon-${pokemon.number}" class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;

  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});

searchPokemon.addEventListener("input", () => {
  const searchTerm = searchPokemon.value.toLowerCase();
  const allPokemonItems = document.querySelectorAll(".pokemon");

  allPokemonItems.forEach((pokemonItem) => {
    const pokemonName = pokemonItem
      .querySelector(".name")
      .textContent.toLowerCase();

    if (pokemonName.includes(searchTerm)) {
      pokemonItem.style.display = "block";
    } else {
      pokemonItem.style.display = "none";
    }
  });
});
