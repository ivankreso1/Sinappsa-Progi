import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import "../cssFiles/Filter.css"


export default function Filter() {



    //Napraviti da se ne moze odabrati kolegij dok se ne odabere smjer
    const [kolegiji, setKolegiji] = useState([])

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
        console.log(e.target)       //target je cijela forma koja se submita
    }

    function changeDropdownInfo(e) {

    }

    function changeFormInfo(e) {

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
                        required
                        label="R"
                        name="smjer"
                        value="R"
                        isValid = {formInfo.smjer === "R" ? true : false}
                        onClick={changeFormInfo}
                    /*feedback="You must agree before submitting."
                    feedbackType="invalid"*/
                    />
                    <Form.Check
                        type="radio"
                        required
                        label="E"
                        name="smjer"
                        value="E"
                        isValid={formInfo.smjer === "E" ? true : false}
                        onClick={changeFormInfo}
                    /*feedback="You must agree before submitting."
                    feedbackType="invalid"*/
                    />
                </Form.Group>
                <DropdownButton
                    className="filter-kolegij-dropdown"
                    title="Kolegiji"
                    variant={!formInfo.kolegij ? "danger" : "success"}
                    onClick={dohvatiKolegije}
                    >
                    <DropdownItem>Prvi kolegij</DropdownItem>
                    <DropdownItem>Drugi kolegij</DropdownItem>
                    <DropdownItem>Treci kolegij</DropdownItem>
                    <DropdownItem>Cetvrti kolegij</DropdownItem>
                </DropdownButton>

                <DropdownButton
                    className="filter-kategorije-dropdown"
                    title="Kategorije"
                    variant={!formInfo.kategorija ? "danger" : "success"}
                    onSelect={changeDropdownInfo}>
                    <DropdownItem>Laboratorijska vježba</DropdownItem>
                    <DropdownItem>Blic</DropdownItem>
                    <DropdownItem>Gradivo</DropdownItem>
                    <DropdownItem>Kontinuirani ispit</DropdownItem>
                    <DropdownItem>Ispitni rok</DropdownItem>
                </DropdownButton>
                <Button
                    type="submit"
                    className="filter-submit-button"
                    variant={!formInfo.kategorija || !formInfo.kolegij
                        || !formInfo.smjer ? "danger" : "success"}
                    disabled={!formInfo.kategorija || !formInfo.kolegij
                        || !formInfo.smjer}>Filtriraj</Button>
            </Form>
        </div>
    );
}
