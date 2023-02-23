import './App.css';
import Gallery from './Components/Gallery/Gallery';
import Uploading from './Components/Uploading/Uploading';

function App() {
  return (
    <div>
      <h1>Say Cheese</h1>
      <p>Comienzo de la pagina</p>
      <Uploading /> 
      <Gallery /> 
    </div>
  );
}

export default App;
