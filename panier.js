document.addEventListener('DOMContentLoaded', () => {
    displayPanier();
});

function displayPanier() {
    const panierContainer = document.getElementById('panier');
    const storedPanier = localStorage.getItem('panier');
    
    panierContainer.innerHTML = '';

    if (storedPanier) {
        const panierItems = JSON.parse(storedPanier);

        panierItems.forEach((pokemon) => {
            const panierItem = document.createElement('div');
            
            const name = document.createElement('h2');
            name.textContent = pokemon.name;

            const image = document.createElement('img');
            image.src = pokemon.sprites.front_shiny;
            image.alt = pokemon.name;

            panierItem.appendChild(name);
            panierItem.appendChild(image);

            panierContainer.appendChild(panierItem);
        });
    } else {
        panierContainer.textContent = 'Le panier est vide.';
    }
}
