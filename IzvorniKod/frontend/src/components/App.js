import React from 'react';
import '../cssFiles/App.css';
import { useNavigate } from 'react-router-dom';
import Filter from "./Filter"
import Oglas from './Oglas';

/**/

function App() {

  const navigate = useNavigate()
  function goToLogin() {
    navigate("/login")
  }
  return (
    <div className= "home-page">
      <h1>Home page</h1>
      <div>
        <Filter />
        <h3>Oglasi</h3>

        <button onClick={goToLogin}> Login </button>
      </div>
    </div>
  );
}

export default App;
