//pokeapi.co
// https://pokeapi.co/api/v2/pokemon/pikachu
fetchPokemon();

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
  } catch (error) {
    console.error('Error:', error);
  }
}
