import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { fetchPokemons, fetchPokemonDetails } from '../../api/fetchPokemon';
import { PokemonInfo } from '../Modal/Modal';
import { TeamDetails } from '../SelectedTeam/SelectedTeam';
import { Dropdown } from '../DropDown/DropDown';
import { PokemonTeam } from '../PokemonTeam/PokemonTeam';

type Props = {
  label: string;
  register: any;
}

export const SelectPokemon: React.FC<Props> = ({ label, register }) => {
  const { control, handleSubmit } = useForm();
  const [pokemonList, setPokemonList] = useState<{ name: string }[]>([]);
  const [selectedPokemons, setSelectedPokemons] = useState<string[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [teamDetails, setTeamDetails] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPokemons();
      setPokemonList(data);
    };

    fetchData();
  }, []);

  const handleSelectChange = (selectedPokemon: string) => {
    if (!selectedPokemons.includes(selectedPokemon)) {
      if (selectedPokemons.length < 4) {
        setSelectedPokemons([...selectedPokemons, selectedPokemon]);
      }
    }
  };

  const handleRemovePokemon = (pokemon: string) => {
    setSelectedPokemons((prevPokemons) => {
      const updatedPokemons = prevPokemons.filter((p) => p !== pokemon);
      console.log(updatedPokemons);
      return updatedPokemons;
    });
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

  const onSubmit = async () => {
    if (selectedPokemons.length === 4) {
      const detailsPromises = selectedPokemons.map((pokemon) => fetchPokemonDetails(pokemon));
      const details = await Promise.all(detailsPromises);
      const validDetails = details.filter((detail) => detail);

      setTeamDetails(validDetails);
    } else {
      setTeamDetails([]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-3/4 h-3/4 max-w-screen-xl mx-auto p-4 bg-white shadow-md rounded relative">
        <div className="relative">
          <div
            className="cursor-pointer w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 flex justify-between"
            onClick={handleDropdownClick}
          >
            <label className="block mb-2 font-bold text-lg">{label}</label>
            <div className="flex items-center justify-between">
              <span>▼</span>
            </div>
          </div>
          {isDropdownOpen && <Dropdown pokemonList={pokemonList} onSelectChange={handleSelectChange} />}
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
      {selectedPokemon && (
        <PokemonInfo name={selectedPokemon} onClose={handleCloseInfo} />
      )}
    </div>
  );
};
