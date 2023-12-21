import React, { useEffect, useState } from 'react';
import { fetchPokemonDetails } from '../../api/fetchPokemon';
import { LoadingIndicator } from '../spinner/Spinner';

type Props = {
  name: string;
  onClose: () => void;
}

export const PokemonInfo: React.FC<Props> = ({ name, onClose }) => {
  const [pokemonDetails, setPokemonDetails] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const details = await fetchPokemonDetails(name);
        setPokemonDetails(details);
      } catch (error) {
        setError('Failed to fetch Pokemon details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [name]);

  if (!pokemonDetails) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {isLoading ? (
        <div><LoadingIndicator /></div>
      ) : (
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded relative w-3/4 h-3/4 flex items-center justify-center">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            Close
          </button>
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4 text-center">{pokemonDetails.name}</h2>
            <img
              src={pokemonDetails.sprites.front_default}
              alt={pokemonDetails.name}
              className="mx-auto mb-4"
            />
            <div>
              <h3 className="text-lg font-bold mb-2">Abilities:</h3>
              <ul className="list-disc ml-6">
                {pokemonDetails.abilities.map((ability: any) => (
                  <li key={ability.ability.name}>{ability.ability.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Stats:</h3>
              <ul className="list-disc ml-6">
                {pokemonDetails.stats.map((stat: any) => (
                  <li key={stat.stat.name}>
                    {stat.stat.name}: {stat.base_stat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
