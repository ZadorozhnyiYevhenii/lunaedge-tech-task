import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PokemonForm } from './components/PokemonForm/PokemonForm';
import { SelectPokemon } from './components/Select/SelectPokemon';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<PokemonForm />} />
        
        <Route path="/select" element={<SelectPokemon label="Choose your hero😎" />} />
      </Routes>
    </Router>
  );
};

export default App;
