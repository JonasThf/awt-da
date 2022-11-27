import './App.css';


function App() {
  return (
    
    <div className="App">
      <button onClick={createJson}>
      ExportJson
    </button>
    <button onClick={sayHello}>
      Say Hello
    </button>
    </div>
    
  );
  function createJson(){
    const value = {
      name: document.getElementById('name').value,
      typeOfAd: document.getElementById('da-type').value,
      imageResize: document.getElementById('image_resize').value,
      interactions: document.getElementById('interactions').value,
    }
    alert(value.name)
  
  }
  function sayHello(){
    alert("Hello")
  }
}

export default App;
