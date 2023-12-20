import React from "react";

type Props = {
  selectedPokemons: string[];
  onInfoButtonClick: (pokemonName: string) => void;
  onRemovePokemon: (pokemon: string) => void;
  onSubmit: () => void;
}

export const PokemonTeam: React.FC<Props> = ({ selectedPokemons, onInfoButtonClick, onRemovePokemon, onSubmit }) => (
  <div className="mt-20">
    <h2 className="text-lg font-bold mb-2">Selected Pokémon Team:</h2>
    <ul>
      {selectedPokemons.map((pokemon) => (
        <li key={pokemon} className="flex items-center justify-between mb-2">
          <span
            onClick={() => onInfoButtonClick(pokemon)}
            className="cursor-pointer text-blue-500"
          >
            {pokemon}{' '}
            <span className="rounded-full text-blue px-3 ml-2 border border-blue">
              info
            </span>
          </span>
          <button
            type="button"
            onClick={() => onRemovePokemon(pokemon)}
            className="text-red-500 hover:text-red-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </li>
      ))}
    </ul>
    <button onClick={onSubmit} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
      Submit
    </button>
  </div>
);