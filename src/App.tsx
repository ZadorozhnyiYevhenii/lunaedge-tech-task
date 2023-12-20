import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PokemonForm } from './components/PokemonForm/PokemonForm';
import { SelectPokemon } from './components/Select/Select';

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <h1 className="text-3xl font-semibold mb-6 text-center">Pokémon Trainer</h1>
      <Router>
        <Routes>
          <Route path="/" element={<PokemonForm />} />
          <Route path="/select" element={<SelectPokemon label="Choose your hero 😎" register={() => {}} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
