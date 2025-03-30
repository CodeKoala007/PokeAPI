//pokeapi.co
// https://pokeapi.co/api/v2/pokemon/pikachu

let party = []; // Array to store party Pokémon

async function fetchPokemon() {
  try {
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (!response.ok) {
      throw new Error('No se pudo encontrar el Pokémon. Por favor, verifica el nombre e intenta nuevamente.');
    }
    const data = await response.json();
    const pokemonSprite = data.sprites.front_default;
    const imgElement = document.getElementById('pokemonSprite');
    imgElement.src = pokemonSprite;
    imgElement.style.display = 'block';
    imgElement.alt = pokemonName;

    const pokemonHeight = data.height;
    const pokemonWeight = data.weight;
    const pokemonTypes = data.types.map((typeInfo) => typeInfo.type.name).join(', ');
    const pokemonAbilities = data.abilities.map((abilityInfo) => abilityInfo.ability.name).join(', ');

    const detailsElement = document.getElementById('pokemonDetails');
    detailsElement.innerHTML = `
            <strong>Height:</strong> ${pokemonHeight} decimetres<br>
            <strong>Weight:</strong> ${pokemonWeight} hectograms<br>
            <strong>Types:</strong> ${pokemonTypes}<br>
            <strong>Abilities:</strong> ${pokemonAbilities}
        `;

    // Show the "Add to Party" button
    const addToPartyButton = document.getElementById('addToPartyButton');
    addToPartyButton.style.display = 'block';
    addToPartyButton.dataset.name = pokemonName;
    addToPartyButton.dataset.sprite = pokemonSprite;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Add Pokémon to the party from the search
function addToPartyFromSearch() {
  const addToPartyButton = document.getElementById('addToPartyButton');
  const name = addToPartyButton.dataset.name;
  const sprite = addToPartyButton.dataset.sprite;

  addToParty(name, sprite);
}

function addToParty(name, sprite) {
  if (party.length >= 6) {
    alert('Your party is full! You can only have up to 6 Pokémon.');
    return;
  }

  // Add Pokémon to the party array
  party.push({ name, sprite });

  // Update the party display
  updatePartyDisplay();
}

function updatePartyDisplay() {
  const partyContainer = document.getElementById('party');
  partyContainer.innerHTML = ''; // Clear the current party display

  party.forEach((pokemon, index) => {
    const pokemonDiv = document.createElement('div');
    pokemonDiv.classList.add('party-member');

    const img = document.createElement('img');
    img.src = pokemon.sprite;
    img.alt = pokemon.name;
    img.classList.add('party-sprite');

    const name = document.createElement('p');
    name.textContent = pokemon.name;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-button');
    removeButton.onclick = () => removeFromParty(index);

    pokemonDiv.appendChild(img);
    pokemonDiv.appendChild(name);
    pokemonDiv.appendChild(removeButton);
    partyContainer.appendChild(pokemonDiv);
  });
}

// Remove Pokémon from the party
function removeFromParty(index) {
  party.splice(index, 1); // Remove the Pokémon at the specified index
  updatePartyDisplay(); // Update the party display
}
