import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Oglas from './Oglas';
import { Form, Button } from "react-bootstrap";
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import configData from "./config.json";
import '../cssFiles/App.css';
import "../cssFiles/Filter.css";


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
        console.log(data)
        setKolegiji(data)
        console.log(kolegiji)
      })
  }

  function handleFormSubmit(e) {
    e.preventDefault()
    console.log(formInfo)       //target je cijela forma koja se submita
    fetch(`${configData.hostname}/oglasi/filter?smjer=${formInfo.smjer}&kategorija=${formInfo.kategorija}&kolegij=${formInfo.kolegij.replace(/ /g, "+")}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setOglasi(data)
      })

  }

  function optionDropDownClick(e) {
    console.log(e.target.innerHTML)
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
        <div className="filter-container">
          <Form
            className="form-filter"
            onSubmit={handleFormSubmit}
          >
            <Form.Group
              className="filter-smjer-radio"
            >
              Smjer:
              <Form.Check
                type="radio"
                label="R"
                name="smjer"
                value="R"
                isValid={formInfo.smjer === "R" ? true : false}
                onClick={changeFormInfo}
              />
              <Form.Check
                type="radio"
                label="E"
                name="smjer"
                value="E"
                isValid={formInfo.smjer === "E" ? true : false}
                onClick={changeFormInfo}
              />
            </Form.Group>
            {formInfo.smjer}
            <DropdownButton
              className="filter-kolegij-dropdown"
              title="Kolegiji"
              variant={!formInfo.kolegij ? "danger" : "success"}
            /*onSelect={dohvatiKolegije}*/
            >
              {kolegiji.map(kolegij => {
                return <DropdownItem
                  onClick={optionDropDownClick}
                  name="kolegij">{kolegij.ime}</DropdownItem>
              })}
            </DropdownButton>
            {formInfo.kolegij}
            <DropdownButton
              className="filter-kategorije-dropdown"
              title="Kategorije"
              variant={!formInfo.kategorija ? "danger" : "success"}
                    /*onClick={menuDropDownClick}*/>
              <DropdownItem
                onClick={optionDropDownClick}
                name="kategorija">LABOS</DropdownItem>
              <DropdownItem
                onClick={optionDropDownClick}
                name="kategorija">BLIC</DropdownItem>
              <DropdownItem
                onClick={optionDropDownClick}
                name="kategorija">GRADIVO</DropdownItem>
              <DropdownItem
                onClick={optionDropDownClick}
                name="kategorija">KONTINUIRANI_ISPIT</DropdownItem>
              <DropdownItem
                onClick={optionDropDownClick}
                name="kategorija">ISPITNI_ROK</DropdownItem>
            </DropdownButton>
            {formInfo.kategorija}
            <Button
              type="submit"
              className="filter-submit-button"
              variant={!formInfo.kategorija && !formInfo.kolegij
                && !formInfo.smjer ? "danger" : "success"}
              disabled={!formInfo.kategorija && !formInfo.kolegij
                && !formInfo.smjer}>Filtriraj</Button>
          </Form>
        </div>
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
