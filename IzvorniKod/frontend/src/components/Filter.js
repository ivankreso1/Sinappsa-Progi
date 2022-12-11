import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import "../cssFiles/Filter.css"
import configData from "./config.json";
import kolegiji from '../kolegiji';


export default function Filter() {
    
    /*Trebaju se na početku fetchati svi kolegiji
    te se trebaju ponovno fetchati jednom kada se odabere smjer (ako se odabere)*/

    const [formInfo, setFormInfo] = useState({
        smjer: "",
        kolegij: "",
        kategorija: ""
    })
    
    //u ovoj funkciji treba fetchati sve kolegije s backenda koji postoje u bazi podataka
    function dohvatiKolegije() {

        console.log("U funkciji")
    }

    function handleFormSubmit(e) {
        e.preventDefault()
        console.log(formInfo)       //target je cijela forma koja se submita
        const data = {
            smjer: formInfo.smjer,
            kolegij: formInfo.kolegij,
            kategorija: formInfo.kategorija
        }
        const method = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        //treba promijeniti putanju
        //fetch(`${configData.hostname}/korisnik/registracija`, method)
    }

    function optionDropDownClick(e) {
        console.log(e.target.innerHTML)
        //console.log("PRESSED ON DROPDOWN")
        setFormInfo(prevInfo => {
            return { ...prevInfo, [e.target.name]: e.target.innerHTML }
        })
    }

    function changeFormInfo(e) {

        /*ovdje se trebaju fetchati svi kolegiji za određen smjer*/
        setFormInfo(prevInfo => {
            return {...prevInfo, [e.target.name] : e.target.value}
        })
    }
    //kada se klikne na dropdown, na backend ce se poslati zahtjev za dohvacanjem kolegija koji ce se nakon toga prikazati kao opcije u dropdownovima
    //rezultate (kolegije) spremiti u useState varijablu
    //treba napraviti dropdown komponentu Kolegij, mapirati nad useState i stvarati kolegij komponente koje su zapravo samo dropDownItem

    return (
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
                        onClick = {optionDropDownClick}
                        name = "kolegij">{kolegij.ime}</DropdownItem>
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
    );
}
