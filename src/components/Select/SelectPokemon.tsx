import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { fetchPokemons, fetchPokemonDetails } from '../../api/fetchPokemon';
import { PokemonInfo } from '../Modal/Modal';
import { TeamDetails } from '../SelectedTeam/SelectedTeam';
import { Dropdown } from '../DropDown/DropDown';
import { PokemonTeam } from '../PokemonTeam/PokemonTeam';

export type PropsSelect = {
  label: string;
  backgroundColor?: string;
  border?: string;
  fontSize?: string;
  fontColor?: string;
  padding?: string;
};

export const SelectPokemon: React.FC<PropsSelect> = ({
  label,
  border = 'gray-300',
  backgroundColor = 'white',
  fontSize = 'text-base',
  fontColor = 'text-black',
  padding = 'p-4',
}) => {
  const { handleSubmit } = useForm();
  const [pokemonList, setPokemonList] = useState<{ name: string }[]>([]);
  const [selectedPokemons, setSelectedPokemons] = useState<string[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [teamDetails, setTeamDetails] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPokemons();
      setPokemonList(data);
    };

    fetchData();
  }, []);

  const handleSelectChange = (selectedPokemon: string) => {
    if (selectedPokemons.length < 4 && !selectedPokemons.includes(selectedPokemon)) {
      setSelectedPokemons([...selectedPokemons, selectedPokemon]);
    }
  };

  const handleRemovePokemon = (pokemon: string) => {
    setSelectedPokemons((prevPokemons) => prevPokemons.filter((p) => p !== pokemon));
  };

  const handleInfoButtonClick = async (pokemonName: string) => {
    setSelectedPokemon(pokemonName);
  };

  const handleCloseInfo = () => {
    setSelectedPokemon(null);
  };

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
  };

  const onSubmit = async () => {
    if (selectedPokemons.length === 4) {
      const detailsPromises = selectedPokemons.map(fetchPokemonDetails);
      const details = await Promise.all(detailsPromises);
      const validDetails = details.filter((detail) => detail);

      setTeamDetails(validDetails);
    } else {
      setTeamDetails([]);
    }
  };

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${padding}`}>
      <div className={`w-3/4 h-3/4 max-w-screen-xl mx-auto ${padding} bg-${backgroundColor} shadow-md rounded relative`}>
        <div className="relative">
          <div
            className={`cursor-pointer w-full p-2 border border-${border} rounded focus:outline-none focus:border-blue-500 flex justify-between ${fontColor} ${fontSize}`}
            onClick={handleDropdownClick}
          >
            <label className={`block mb-2 font-bold text-lg ${fontColor}`}>{label}</label>
            <div className="flex items-center justify-between">
              <span>▼</span>
            </div>
          </div>
          {isDropdownOpen && (
            <>
              <input
                type="text"
                placeholder="Search Pokémon..."
                className={`p-2 border border-gray-300 rounded mt-2 w-full ${fontColor} ${fontSize}`}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              <Dropdown pokemonList={filteredPokemonList} onSelectChange={handleSelectChange} />
            </>
          )}
        </div>
        {selectedPokemons.length > 0 && (
          <PokemonTeam
            selectedPokemons={selectedPokemons}
            onInfoButtonClick={handleInfoButtonClick}
            onRemovePokemon={handleRemovePokemon}
            onSubmit={handleSubmit(onSubmit)}
          />
        )}
        {teamDetails.length > 0 && <TeamDetails teamDetails={teamDetails} />}
      </div>
      {selectedPokemon && <PokemonInfo name={selectedPokemon} onClose={handleCloseInfo} />}
    </div>
  );
};
