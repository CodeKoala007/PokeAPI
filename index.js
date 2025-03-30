let party = [];

async function fetchPokemon() {
  try {
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (!response.ok) throw new Error('Pokémon not found');
    const data = await response.json();
    const imgElement = document.getElementById('pokemonSprite');
    imgElement.src = data.sprites.front_default;
    imgElement.style.display = 'block';
    imgElement.alt = pokemonName;
    document.getElementById('pokemonDetails').innerHTML = `
      <strong>Height:</strong> ${data.height} dm<br>
      <strong>Weight:</strong> ${data.weight} hg<br>
      <strong>Types:</strong> ${data.types.map((t) => t.type.name).join(', ')}<br>
      <strong>Abilities:</strong> ${data.abilities.map((a) => a.ability.name).join(', ')}
    `;
    const addToPartyButton = document.getElementById('addToPartyButton');
    addToPartyButton.style.display = 'block';
    addToPartyButton.dataset.name = pokemonName;
    addToPartyButton.dataset.sprite = data.sprites.front_default;
  } catch (error) {
    console.error(error);
  }
}

function addToPartyFromSearch() {
  const button = document.getElementById('addToPartyButton');
  addToParty(button.dataset.name, button.dataset.sprite);
}

function addToParty(name, sprite) {
  if (party.length >= 6) return alert('Party is full');
  party.push({ name, sprite });
  updatePartyDisplay();
}

function updatePartyDisplay() {
  const partyContainer = document.getElementById('party');
  partyContainer.innerHTML = '';
  party.forEach((pokemon, index) => {
    const div = document.createElement('div');
    div.classList.add('party-member');
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
    div.appendChild(img);
    div.appendChild(name);
    div.appendChild(removeButton);
    partyContainer.appendChild(div);
  });
}

function removeFromParty(index) {
  party.splice(index, 1);
  updatePartyDisplay();
}

async function fetchAllPokemon() {
  try {
    const allPokemonList = document.getElementById('allPokemonList');
    allPokemonList.innerHTML = '';
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
    if (!response.ok) throw new Error('Failed to fetch Pokémon');
    const data = await response.json();
    for (const pokemon of data.results) {
      const detailsResponse = await fetch(pokemon.url);
      if (!detailsResponse.ok) throw new Error(`Failed to fetch details for ${pokemon.name}`);
      const details = await detailsResponse.json();
      const div = document.createElement('div');
      div.classList.add('all-pokemon');
      const img = document.createElement('img');
      img.src = details.sprites.front_default;
      img.alt = pokemon.name;
      img.classList.add('all-pokemon-sprite');
      const name = document.createElement('p');
      name.textContent = pokemon.name;
      div.appendChild(img);
      div.appendChild(name);
      allPokemonList.appendChild(div);
    }
  } catch (error) {
    console.error(error);
  }
}

fetchAllPokemon();
