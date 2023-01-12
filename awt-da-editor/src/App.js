import React from 'react';
import './App.css';
import CreateInstance from './pages/CreateInstance'
import CreateTemplate from './pages/CreateTemplate';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom"


function App() {
  
  return(

    <BrowserRouter>
    <div className="App">
      <nav className ="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul className='navbar-nav'>
          <li>
            <Link style={{textDecoration: 'none'}} to ="/" className='nav-Link'>
              Home
            </Link>
          </li>
          <li>
            <Link style={{textDecoration: 'none'}} to ="/CreateTemplate" className='nav-Link'>
              Create Template
            </Link>
          </li>
          <li>
            <Link style={{textDecoration: 'none'}} to ="/CreateInstance" className='nav-Link'>
              Create Instance
            </Link>
          </li>
        </ul>
      </nav>

      <Routes>
         {/* <Route  path="/" element = {Home()}/> */}
        <Route  path="/CreateTemplate" element = {CreateTemplate()}/>
        <Route  path="/CreateInstance" element = {CreateInstance()}/>
      </Routes>

    </div>
    </BrowserRouter>
    
  );
  
  
}

export default App;
