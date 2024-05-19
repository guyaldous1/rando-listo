import './App.css';
import CurrentList from './components/CurrentList.js';

function App() {

const existingList = [{name:"blonk"},{name:"donk"}]
  
  return (
    <div className="App">
      <CurrentList existingList={existingList}/>
    </div>
  );
}

export default App;
