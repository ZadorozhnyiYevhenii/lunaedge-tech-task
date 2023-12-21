import React from 'react';
import 'tailwindcss/tailwind.css';
import { PropsSelect, SelectPokemon } from './SelectPokemon';

export default {
  title: 'SelectPokemon',
  component: SelectPokemon,
  parameters: {
    docs: {
      description: {
        component: 'A Pokemon selection component.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    backgroundColor: { control: 'color' },
    border: { control: 'color' },
    fontSize: { control: 'text' },
    fontColor: { control: 'color' },
    padding: { control: 'text' },
  },
};

export const TemplateSelect = (args: PropsSelect) => (
  <div className={`bg-${args.backgroundColor} border-${args.border} ${args.padding}`}>
    <SelectPokemon {...args} />
  </div>
);

TemplateSelect.args = {
  label: 'Select Pokemon',
  backgroundColor: 'white',
  border: 'gray-300',
  fontSize: 'text-base',
  fontColor: 'text-black',
  padding: 'p-4',
};
