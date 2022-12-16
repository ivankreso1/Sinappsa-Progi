import { Button, Card, DropdownButton, Form } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import React, { useState } from "react";
import configData from "../resources/config.json";

export default function CreateAd() {
  const [ad, setAd] = useState({
    radnja: "",
    kolegij: "",
    kategorija: "",
    naslov: "",
    opis: "",
  });

  const [kolegiji, setKolegiji] = useState([""]);
  let categories = [
    "LABOS",
    "BLIC",
    "GRADIVO",
    "KONTINUIRANI_ISPIT",
    "ISPITNI_ROK",
  ];

  React.useEffect(() => {
    fetch(`${configData.hostname}/kolegiji`).then((res) =>
      res.json().then((data) => {
        setKolegiji(data);
      })
    );
  }, []);

  function onSubmit(event) {
    event.preventDefault();

    setAd((prevAd) => {
      return { ...prevAd, [event.target.name]: event.target.value }; //posto ima vise inputova, treba ih se razlikovati po name-u => to je jedan od parametara koji je sacuvan u event.target
    });

    const data = {
      radnja: ad.radnja,
      kolegij: ad.kolegij,
      kategorija: ad.kategorija,
      naslov: ad.naslov,
      opis: ad.opis,
    };

    console.log(data);
  }

  return (
    <div className="container">
      <Card
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
          minWidth: "400px",
          maxWidth: "480px",
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          borderRadius: "10px",
        }}
      >
        <h1> Kreiraj novi oglas! </h1>
        <Form className="form" onSubmit={onSubmit}>
          {["radio"].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              <Form.Check
                inline
                label="Tražim pomoć!"
                name="radnja"
                type={type}
                id={`inline-${type}-1`}
              />
              <Form.Check
                inline
                label="Nudim pomoć!"
                name="radnja"
                type={type}
                id={`inline-${type}-2`}
              />
            </div>
          ))}
          <div className="mb-3">
            <DropdownButton name="kolegij" title="Kolegij">
              {kolegiji.map((kolegij) => {
                return (
                  <DropdownItem name="kolegij">{kolegij.ime}</DropdownItem>
                );
              })}
            </DropdownButton>
          </div>
          <div className="mb-3">
            <DropdownButton name="kategorija" title="Kategorija">
              {categories.map((cat) => {
                return <DropdownItem name="kategorija">{cat}</DropdownItem>;
              })}
            </DropdownButton>
          </div>

          <div className="mb-3">
            <Form.Label>Naslov oglasa</Form.Label>
            <Form.Control
              type="text"
              placeholder="Naslov"
              name="naslov"
            ></Form.Control>
          </div>

          <div className="mb-3">
            <Form.Label>Opis problema/ponude</Form.Label>
            <Form.Control as="textarea" rows="3" name="opis"></Form.Control>
          </div>
          <div className="mb-3">
            <Button type="submit">Podnesi</Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
