import React from 'react';
import '../cssFiles/App.css';
import { useNavigate } from 'react-router-dom';


/**/

function App() {

  const navigate = useNavigate()
  function goToLogin() {
    navigate("/login")
  }
  return (
    <div>
      <h1>Home page</h1>
      <button onClick={goToLogin}> Login </button>
    </div>
  );
}

export default App;
