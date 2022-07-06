
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


//Pages
import { Home } from './pages/Home';

//Components
import { Header } from './components/Header';

//CSS Import
import './global.css'


function App() {
  return (
    <Router>
      
        <Header />
        <Routes>
         <Route path='/' element={<Home />} />
        </Routes>
    
 
    </Router>
  )
}

export default App
