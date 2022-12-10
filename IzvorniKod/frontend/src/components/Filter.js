import React from 'react';
import { Form, Button } from "react-bootstrap";
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

export default function Filter() {


    function dohvatiKolegije() {
        console.log("U funkciji")
    }
    //kada se klikne na dropdown, na backend ce se poslati zahtjev za dohvacanjem kolegija koji ce se nakon toga prikazati kao opcije u dropdownovima
    //rezultate (kolegije) spremiti u useState varijablu
    //treba napraviti dropdown komponentu Kolegij, mapirati nad useState i stvarati kolegij komponente koje su zapravo samo dropDownItem

    return (
        <div className="filter-container">
            <Form
                className="form-filter"
            /*onSubmit={handleFormSubmit}*/
            >
                <Form.Group
                    className="filter-smjer-radio"
                >
                    <h3>Smjer</h3>
                    <Form.Check
                        type="radio"
                        required
                        label="R"
                        name="smjer"
                        value="R"
                        feedback="You must agree before submitting."
                        feedbackType="invalid"
                    />
                    <Form.Check
                        type="radio"
                        required
                        label="E"
                        name="smjer"
                        value="E"
                        feedback="You must agree before submitting."
                        feedbackType="invalid"
                    />
                </Form.Group>
                <DropdownButton
                    className="filter-kolegij-dropdown"
                    title = "Kolegiji"
                    onClick={dohvatiKolegije}>
                    <DropdownItem>Prvi kolegij</DropdownItem>
                    <DropdownItem>Drugi kolegij</DropdownItem>
                    <DropdownItem>Treci kolegij</DropdownItem>
                    <DropdownItem>Cetvrti kolegij</DropdownItem>
                </DropdownButton>
                <DropdownButton
                    className="filter-kategorije-dropdown"
                    title="Kategorije">
                    <DropdownItem>Laboratorijska vježba</DropdownItem>
                    <DropdownItem>Blic</DropdownItem>
                    <DropdownItem>Gradivo</DropdownItem>
                    <DropdownItem>Kontinuirani ispit</DropdownItem>
                    <DropdownItem>Ispitni rok</DropdownItem>
                </DropdownButton>
            </Form>
        </div>
    );
}
