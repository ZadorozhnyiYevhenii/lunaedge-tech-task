import React from 'react';
import { useForm } from 'react-hook-form';
import { rules } from '../../utils/rules';
import { useNavigate } from 'react-router-dom';

export const PokemonForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmitForm = (data: any) => {
    console.log('Form data submitted:', data);
    navigate('/select');
  };

  return (<div className="flex items-center justify-center h-screen flex-col">
    <h1 className="text-3xl font-semibold mb-6 text-center">Pokémon Trainer Form</h1>

    <form onSubmit={handleSubmit(onSubmitForm)} className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded">
      <label className="block mb-2">
        First Name:
        <input
          {...register('firstName', rules)}
          className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none"
        />
        {errors.firstName && <span className="text-red-500">First name is required (2-12 characters, only letters).</span>}
      </label>

      <label className="block mb-2">
        Last Name:
        <input
          {...register('lastName', rules)}
          className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none"
        />
        {errors.lastName && <span className="text-red-500">Last name is required (2-12 characters, only letters).</span>}
      </label>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
      >
        Submit
      </button>
    </form>
  </div>
  );
};