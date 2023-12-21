import React from 'react';
import { Link } from 'react-router-dom';

interface TeamDetailsProps {
  teamDetails: any[];
}

export const TeamDetails: React.FC<TeamDetailsProps> = ({ teamDetails }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-white p-8 shadow-md rounded overflow-auto flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Pokémon Team is ready to train with a professional coach:</h2>
      <ul className='flex flex-wrap justify-center'>
        {teamDetails.map((details: any, index: number) => (
          <li key={index} className="mb-4 mx-4">
            <div className="flex flex-col items-center border border-gray-300 p-4 rounded">
              <img src={details.sprites.front_default} alt={details.name} className="w-32 h-32 mb-2 rounded-md" />
              <span className="block font-bold text-blue-500">{details.name}</span>
            </div>
          </li>
        ))}
      </ul>
      <Link to="/lunaedge-tech-task" className="mt-8 bg-blue-500 text-white py-2 px-4 rounded text-lg">
        Back to Pokémon Selection
      </Link>
    </div>
  </div>
);
