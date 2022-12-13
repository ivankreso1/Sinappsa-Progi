import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Oglas from './Oglas';
import configData from "../config.json";
import '../../cssFiles/App.css';
import "../../cssFiles/Filter.css";
import Filter from './Filter';
import RankList from './RankList';


function App() {

  const [kolegiji, setKolegiji] = useState([""])
  const [oglasi, setOglasi] = useState([])
  const [formInfo, setFormInfo] = useState({
    smjer: "",
    kolegij: "",
    kategorija: ""
  })

  useEffect(() => {
    fetch(`${configData.hostname}/kolegiji`)
      .then(res => res.json()
        .then(data => {
          console.log(data)
          setKolegiji(data)
        }))
    fetch(`${configData.hostname}/oglasi/filter?smjer=&kategorija=&kolegij=`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setOglasi(data)
      })
  }, [])

  //u ovoj funkciji treba fetchati sve kolegije s backenda koji postoje u bazi podataka
  function dohvatiKolegije(smjer) {
    fetch(`${configData.hostname}/kolegiji/smjer/${smjer.toLowerCase()}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        setKolegiji(data)
        // console.log(kolegiji)
      })
  }

  function handleFormSubmit(e) {
    e.preventDefault()
    // console.log(formInfo)       //target je cijela forma koja se submita
    fetch(`${configData.hostname}/oglasi/filter?smjer=${formInfo.smjer}&kategorija=${formInfo.kategorija}&kolegij=${formInfo.kolegij.replace(/ /g, "+")}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        setOglasi(data)
      })

  }

  function optionDropDownClick(e) {
    // console.log(e.target.innerHTML)
    setFormInfo(prevInfo => {
      return { ...prevInfo, [e.target.name]: e.target.innerHTML }
    })
  }

  function changeFormInfo(e) {

    /*ovdje se trebaju fetchati svi kolegiji za određen smjer*/
    dohvatiKolegije(e.target.value)
    setFormInfo(prevInfo => {
      return { ...prevInfo, [e.target.name]: e.target.value }
    })
  }

  const navigate = useNavigate()

  function goToLogin() {
    navigate("/login")
  }

  return (
    <div className="home-page">
      <h1>Home page</h1>
      <div>
        <Filter key="filter" kolegiji={kolegiji} formInfo={formInfo} onFormSubmit={handleFormSubmit} onFormInfo={changeFormInfo} onDropDownClick={optionDropDownClick} />
        <h3>Oglasi</h3>
        {oglasi.length > 0 ? oglasi.map(oglas => {
          return <Oglas
            naslov={oglas.naslov}
            opis={oglas.opis}
            kreator={oglas.kreator}
          />
        }) : "Nema oglasa za prikaz"}
        <button onClick={goToLogin}> Login </button>

        <RankList />

      </div>
    </div>
  );
}

export default App;
