import React from 'react';
import '../cssFiles/App.css';
import { useNavigate } from 'react-router-dom';
import Filter from "./Filter"

/**/

function App() {

  const navigate = useNavigate()
  function goToLogin() {
    navigate("/login")
  }
  return (
    <div className= "home-page">
      <h1>Home page</h1>
      <Filter />
      <button onClick={goToLogin}> Login </button>
    </div>
  );
}

export default App;
