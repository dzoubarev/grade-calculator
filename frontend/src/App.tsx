import React from 'react';
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom';
import SectionCreator from './components/SectionCreator';
import SectionCalculator from './components/SectionCalculator';
import FinalResults from './components/FinalResults';
import About from './components/About';
import Post from './components/Post';
import CourseCreator from './components/CourseCreator';
import GradingSchemeCreator from './components/GradingSchemeCreator';
import Feedback from './components/Feedback';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/sections" element={<SectionCreator></SectionCreator>}></Route>
        <Route path="/calculator" element={<SectionCalculator/>}></Route>
        <Route path="/results" element={<FinalResults/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/post" element={<Post/>}></Route>
        <Route path="/post/course" element={<CourseCreator/>}></Route>
        <Route path="/post/scheme" element={<GradingSchemeCreator/>}></Route>
        <Route path="/feedback" element={<Feedback/>}></Route>
    </Routes>
  );
}

export default App;
