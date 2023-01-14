import React from 'react';
import './App.css';
import CreateInstance from './pages/CreateInstance'
import CreateTemplate from './pages/CreateTemplate';
import Box from './pages/Box';


function App() {
  
  return(


    <div className="App">
      <CreateTemplate className ="createTemplate"></CreateTemplate>
      <CreateInstance className = "createInstacne"></CreateInstance>
      <Box></Box>
    </div>
    
    
  );
  
  
}

export default App;
