import React, {useEffect} from 'react';
import '../cssFiles/App.css';
import { useNavigate } from 'react-router-dom';
import Filter from "./Filter"
import Oglas from './Oglas';

/**/

function App() {

  
  const oglasiHelp = localStorage.getItem("oglasi")
  const oglasi = oglasiHelp.length > 0 ? JSON.parse(oglasiHelp) : ""
  useEffect(() => { }, [oglasi])
  
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
        {oglasi.length > 0 ? oglasi.map(oglas => {
          return <Oglas
            naslov={oglas.naslov}
            opis={oglas.opis}
            kreator={oglas.kreator}
          />
        }) : "Nema oglasa za prikaz"} 
        <button onClick={goToLogin}> Login </button>
      </div>
    </div>
  );
}

export default App;
