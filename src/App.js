import React from 'react';
import './App.css';
import createTemplate from './pages/createTemplate'
import createInstance from './pages/createInstance'
import create_template from './pages/createTemplate';


const LoadingText = () => {
  const isLoading = false;
  return <div>{isLoading ? <p>Loading...</p> : <h2>Fertig geladen</h2>}</div>;
};
const Einfach = () => {
  return <div>ahdhdsahdsa</div>
}

function App() {
  
  return(
  
    <div className="App">
      <LoadingText></LoadingText>
      <Einfach></Einfach>
    </div>
  );
  
  
}

export default App;
