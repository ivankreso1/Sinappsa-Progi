import React, { useState, useEffect } from "react";
import configData from "../../resources/config.json";
import "../../cssFiles/home/home.css";
import "../../cssFiles/shared/shared.css";
import Filter from "./Filter";
import AdList from "../shared/AdList";
import RankList from "./RankList";
import Navbar from "./Navbar";
import AddCourse from "./AddCourse";
import { getPersonInfo } from "../../scripts/util";
import CreateAd from "./CreateAd";

function App() {
  const [kolegiji, setKolegiji] = useState([""]);
  const [oglasi, setOglasi] = useState([]);
  const [checkedRadioButton, setCheckedRadioButton] = useState("");
  const [formInfo, setFormInfo] = useState({
    smjer: "",
    kolegij: "",
    kategorija: "",
  });

  function fetchNotFiltered() {
    fetch(`${configData.hostname}/kolegiji`).then((res) =>
      res.json().then((data) => {
        // console.log(data)
        setKolegiji(data);
      })
    );
    fetch(`${configData.hostname}/oglasi/filter?smjer=&kategorija=&kolegij=`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setOglasi(data);
      });
  } /*ovaj dio je izdvojen u funkciju jer se koristi u useeffectu i kada se očiste opcije filtriranja (resetFilterOption)*/

  useEffect(() => {
    fetchNotFiltered();
  }, []);

  useEffect(() => {
    fetch(
      `${configData.hostname}/oglasi/filter?smjer=${
        formInfo.smjer
      }&kategorija=${formInfo.kategorija}&kolegij=${formInfo.kolegij.replace(
        / /g,
        "+"
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setOglasi(data);
      });
  }, [oglasi]); //SLUZI tome da se stranica refresha u trenutku kada se obrise neki od oglasa

  //u ovoj funkciji treba fetchati sve kolegije s backenda koji postoje u bazi podataka
  function dohvatiKolegije(smjer) {
    //console.log(smjer)
    fetch(`${configData.hostname}/kolegiji/smjer/${smjer.toLowerCase()}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setTimeout(() => {
          setKolegiji(data);
        }, 10); //riješen problem višestrukog renderanja
        // console.log(kolegiji)
      });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    // console.log(formInfo)       //target je cijela forma koja se submita
    fetch(
      `${configData.hostname}/oglasi/filter?smjer=${
        formInfo.smjer
      }&kategorija=${formInfo.kategorija}&kolegij=${formInfo.kolegij.replace(
        / /g,
        "+"
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setOglasi(data);
      });
  }

  function optionDropDownClick(e) {
    setFormInfo((prevInfo) => {
      return { ...prevInfo, [e.target.name]: e.target.value };
    });
  }

  function changeFormInfo(e) {
    /*ovdje se trebaju fetchati svi kolegiji za određen smjer*/
    console.log(e.target.value);
    dohvatiKolegije(e.target.value);
    setFormInfo((prevInfo) => {
      return { ...prevInfo, [e.target.name]: e.target.value };
    });
    setCheckedRadioButton(e.target.value);
  }

  function resetFilterOption() {
    setFormInfo({
      smjer: "",
      kolegij: "",
      kategorija: "",
    });
    //fetchNotFiltered();

    fetch(`${configData.hostname}/kolegiji`).then((res) =>
      res.json().then((data) => {
        // console.log(data)
        setKolegiji(data);
      })
    );

    setCheckedRadioButton("");
  }

  function mapAds(ads) {
    return ads.map((ad) => Object({ oglas: ad, listaUpita: [] }));
  }

  return (
    <div className="home-page">
      <Navbar getPersonInfo={getPersonInfo}></Navbar>
      <div className="body-wrapper">
        <div className="body-wrapper-child child1">
          <Filter
            key="filter"
            kolegiji={kolegiji}
            formInfo={formInfo}
            checkedRadioButton={checkedRadioButton}
            resetFilterOption={resetFilterOption}
            onFormSubmit={(e) => handleFormSubmit(e)}
            onFormInfo={(e) => changeFormInfo(e)}
            onDropDownClick={(e) => optionDropDownClick(e)}
          />
          <AdList key="adList" data={mapAds(oglasi)} forProfile={false} />
        </div>
        <div className="body-wrapper-child">
          {getPersonInfo().isModerator ? <AddCourse /> : <CreateAd />}
          <RankList key="rankList" />
        </div>
      </div>
    </div>
  );
}

export default App;
