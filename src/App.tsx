import './App.css';
import Navbar from './components/Navbar/Navbar';
import {TiptapEditor} from './components/TiptapEditor/index';

function App() {
  return (
    <div className="app-container">
       <Navbar />
       <TiptapEditor/>
  </div>
  );
}

export default App;