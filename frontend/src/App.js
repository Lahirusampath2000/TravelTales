import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import Home from './Components/Home';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
