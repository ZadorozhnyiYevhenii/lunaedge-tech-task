import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PokemonForm } from './components/PokemonForm/PokemonForm';
import { SelectPokemon } from './components/Select/SelectPokemon';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/lunaedge-tech-task' element={<PokemonForm />} />
        
        <Route path="/lunaedge-tech-task/select" element={<SelectPokemon label="Choose your hero😎" />} />
      </Routes>
    </Router>
  );
};

export default App;
