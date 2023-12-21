import React from 'react';
import 'tailwindcss/tailwind.css';
import { PokemonTeam, PropsPokemonTeam } from './PokemonTeam';

export default {
  title: 'PokemonTeam',
  component: PokemonTeam,
  argTypes: {
    teamBackgroundColor: { control: 'color', description: 'Background color of the Pokemon team.' },
    teamTextColor: { control: 'color', description: 'Text color of the Pokemon team.' },
    buttonBackgroundColor: { control: 'color', description: 'Background color of the buttons.' },
    buttonHoverColor: { control: 'color', description: 'Background color of the buttons on hover.' },
    buttonSize: { control: 'text', description: 'Size of the buttons in the Pokemon team.' },
  },
};

export const TemplatePokemonTeam = (args: PropsPokemonTeam) => (
  <div className="bg-white p-4">
    <PokemonTeam {...args} />
  </div>
);

TemplatePokemonTeam.args = {
  selectedPokemons: ['Pikachu', 'Bulbasaur', 'Charmander', 'Ivysaur'],
  isPrimaryButton: true,
  buttonSize: 'py-2 px-4',
  buttonBackgroundColor: 'blue-500',
  teamTextColor: 'black',
  teamBackgroundColor: 'white',
  buttonHoverColor: 'blue-700',
};
