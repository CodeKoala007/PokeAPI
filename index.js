//pokeapi.co
// https://pokeapi.co/api/v2/pokemon/pikachu

fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
.then((response))
.catch(error => console.error('Error:', error));

async function fetchPokemon() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}