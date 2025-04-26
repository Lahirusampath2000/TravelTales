import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';


function App() {
  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login/>} />
        </Routes>
      </Router>
      
     
    </div>
  );
}

export default App;
