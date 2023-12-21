import React from "react";

export type PropsPokemonTeam = {
  selectedPokemons: string[];
  onInfoButtonClick: (pokemonName: string) => void;
  onRemovePokemon: (pokemon: string) => void;
  onSubmit: () => void;
  teamBackgroundColor?: string;
  teamTextColor?: string;
  buttonBackgroundColor?: string;
  buttonHoverColor?: string;
  buttonSize?: string;
  isPrimaryButton?: boolean;
};

export const PokemonTeam: React.FC<PropsPokemonTeam> = ({
  selectedPokemons,
  onInfoButtonClick,
  onRemovePokemon,
  onSubmit,
  teamBackgroundColor = "white",
  teamTextColor = "black",
  buttonBackgroundColor = "blue-500",
  buttonHoverColor = "blue-700",
  buttonSize = "py-2 px-4",
  isPrimaryButton = true,
}) => (
  <div className={`mt-20 bg-${teamBackgroundColor} text-${teamTextColor}`}>
    <h2 className="text-lg font-bold mb-2">Selected Pokémon Team:</h2>
    <ul>
      {selectedPokemons.map((pokemon) => (
        <li key={pokemon} className="flex items-center justify-between mb-2">
          <span
            onClick={() => onInfoButtonClick(pokemon)}
            className={`cursor-pointer text-${buttonBackgroundColor}`}
          >
            {pokemon}{" "}
            <span className={`rounded-full text-${buttonBackgroundColor} px-3 ml-2 border border-${buttonBackgroundColor}`}>
              info
            </span>
          </span>
          <button
            type="button"
            onClick={() => onRemovePokemon(pokemon)}
            className={`text-red-500 hover:text-red-700`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </li>
      ))}
    </ul>
    <button
      onClick={onSubmit}
      className={`mt-4 ${isPrimaryButton ? `bg-${buttonBackgroundColor} hover:bg-${buttonHoverColor} text-white rounded` : 'bg-white text-blue-500 border rounded border-blue-500 hover:bg-blue-100 hover:border-blue-700'} ${buttonSize}`}
    >
      Submit
    </button>
  </div>
);
