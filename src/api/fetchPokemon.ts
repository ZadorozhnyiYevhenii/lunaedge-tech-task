import axios from 'axios';

const POKEMON_API = 'https://pokeapi.co/api/v2/pokemon';

export const fetchPokemons = async () => {
  try {
    const response = await axios.get(`${POKEMON_API}?limit=100`);
    console.log(response);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    throw error;
  }
};

export const fetchPokemonDetails = async (name: string) => {
  try {
    const response = await axios.get(`${POKEMON_API}/${name}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokémon details data:', error);
    throw error;
  }
}