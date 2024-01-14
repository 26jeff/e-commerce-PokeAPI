const panier = [];

async function fetchShinyPokemons() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
        const data = await response.json();
        const ShinyPokemons = data.results;
        displayShinyPokemons(ShinyPokemons);
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}

function displayShinyPokemons(pokemons) {
    const productsContainer = document.getElementById('products');

    pokemons.forEach(async (pokemon) => {
        const pokemonDetails = await fetchPokemonDetails(pokemon.url);
        const pokemonCard = createPokemonCard(pokemonDetails);
        productsContainer.appendChild(pokemonCard);
    });
}

async function fetchPokemonDetails(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function createPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.className = 'pokemon-card';

    const name = document.createElement('h2');
    name.textContent = pokemon.name;

    const image = document.createElement('img');
    image.src = pokemon.sprites.front_shiny;
    image.alt = pokemon.name;

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Ajouter au panier';

    addToCartButton.addEventListener('click', () => {
        addToCart(pokemon);
    });

    card.appendChild(name);
    card.appendChild(image);
    card.appendChild(addToCartButton);

    return card;
}

function addToCart(pokemon) {
    panier.push(pokemon);
    alert(`${pokemon.name} a été ajouté au panier !`);
    updateCartStorage();
}

function updateCartStorage() {
    localStorage.setItem('panier', JSON.stringify(panier));
}

fetchShinyPokemons();