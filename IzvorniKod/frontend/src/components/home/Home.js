import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import configData from "../config.json";
import '../../cssFiles/home/home.css';
import "../../cssFiles/shared/shared.css";
import Filter from './Filter';
import AdList from './AdList';
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
    fetch(`${configData.hostname}/oglasi/filter?smjer=&kategorija=&kolegij=`) /* fetch(`${configData.hostname}/oglasi/aktivni`)*/
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setOglasi(data)
      })
  }, [])

  //u ovoj funkciji treba fetchati sve kolegije s backenda koji postoje u bazi podataka
  function dohvatiKolegije(smjer) {
    //console.log(smjer)
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
    setFormInfo(prevInfo => {
      return { ...prevInfo, [e.target.name]: e.target.innerHTML }
    })
  }

  function changeFormInfo(e) {

    /*ovdje se trebaju fetchati svi kolegiji za određen smjer*/
    console.log(e.target.value)
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
      <h1>Home page</h1>    {/* NavBar here! i onda on može imati u tipa lijevom kutu ime stranice: Home Page, Profile, Login, Register ,... ;) */}
      <div className='body-wrapper'>
        <div className='body-wrapper-child'>
          <h2 className='section-title section-title-primary-color'>Oglasi</h2>
          <Filter key="filter" kolegiji={kolegiji} formInfo={formInfo} onFormSubmit={(e) => handleFormSubmit(e)} onFormInfo={(e) => changeFormInfo(e)} onDropDownClick={(e) => optionDropDownClick(e)} />
          <AdList key="adList" oglasi={oglasi} />
        </div>
        <div className='body-wrapper-child'>
          <RankList key="rankList" />
        </div>
      </div>
      <button onClick={goToLogin}> Login </button>    {/* Ovo će ići u NavBar */}
    </div>
  );
}

export default App;
