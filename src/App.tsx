import React from 'react';
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom';
import SectionCreator from './components/SectionCreator';
import SectionCalculator from './components/SectionCalculator';
import FinalResults from './components/FinalResults';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/sections" element={<SectionCreator></SectionCreator>}></Route>
        <Route path="/calculator" element={<SectionCalculator/>}></Route>
        <Route path="/results" element={<FinalResults/>}></Route>
    </Routes>
  );
}

export default App;
