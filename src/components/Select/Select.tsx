// SelectPokemon.tsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { fetchPokemons } from '../../api/fetchPokemon';
import { PokemonInfo } from '../Modal/Modal';

interface SelectPokemonProps {
  label: string;
  register: any;
}

export const SelectPokemon: React.FC<SelectPokemonProps> = ({ label, register }) => {
  const { control } = useForm();
  const [pokemonList, setPokemonList] = useState<string[]>([]);
  const [selectedPokemons, setSelectedPokemons] = useState<string[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPokemons();
      setPokemonList(data);
    };

    fetchData();
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPokemon = e.target.value;

    if (!selectedPokemons.includes(selectedPokemon)) {
      if (selectedPokemons.length < 4) {
        setSelectedPokemons([...selectedPokemons, selectedPokemon]);
      }
    }
  };

  const handleRemovePokemon = (pokemon: string) => {
    const updatedPokemons = selectedPokemons.filter((p) => p !== pokemon);
    setSelectedPokemons(updatedPokemons);
  };

  const handleInfoButtonClick = (pokemonName: string) => {
    setSelectedPokemon(pokemonName);
  };

  const handleCloseInfo = () => {
    setSelectedPokemon(null);
  };

  return (
    <div className="relative">
      <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded">
        <label className="block mb-2 font-bold text-lg">{label}</label>
        <select
          {...register(label)}
          onChange={handleSelectChange}
          multiple={true}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        >
          {pokemonList.map((pokemon: any) => (
            <option key={pokemon.name} value={pokemon.name}>
              {pokemon.name}
            </option>
          ))}
        </select>
        {selectedPokemons.length === 4 && (
          <p className="text-red-500">You can only select 4 Pokémon.</p>
        )}
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-2">Selected Pokémon Team:</h2>
          <ul>
            {selectedPokemons.map((pokemon) => (
              <li key={pokemon} className="flex items-center justify-between mb-2">
                <span
                  onClick={() => handleInfoButtonClick(pokemon)}
                  className="cursor-pointer text-blue-500"
                >
                  {pokemon}{' '}
                  <span className="rounded-full text-blue px-3 ml-2 border border-blue">
                    info
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => handleRemovePokemon(pokemon)}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {selectedPokemon && (
        <PokemonInfo name={selectedPokemon} onClose={handleCloseInfo} />
      )}
    </div>
  );
};
