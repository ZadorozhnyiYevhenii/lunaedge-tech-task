import React from "react";

type PropsDropdown = {
  pokemonList: { name: string }[],
  onSelectChange: (selectedPokemon: string) => void,
}

export const Dropdown: React.FC<PropsDropdown> = ({
  pokemonList,
  onSelectChange,
}) => (
  <div className="absolute inset-x-0 top-full z-10 bg-white border border-gray-300 rounded mt-1 py-2 overflow-auto max-h-40">
    {pokemonList.map((pokemon) => (
      <div
        key={pokemon.name}
        onClick={() => onSelectChange(pokemon.name)}
        className="p-2 cursor-pointer hover:bg-gray-100"
      >
        {pokemon.name}
      </div>
    ))}
  </div>
);
