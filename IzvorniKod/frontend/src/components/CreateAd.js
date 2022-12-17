import { Button, ButtonGroup, Card, Form } from "react-bootstrap";
import React, { useState } from "react";
import Navbar from "./home/Navbar";
import { getData, getPersonInfo, postDataAuth } from "../scripts/util";

export default function CreateAd() {
  const formStyle = {
    margin: "auto",
    marginBottom: "1%",
  };

  const [ad, setAd] = useState({
    radnja: "",
    kolegij: "",
    kategorija: "",
    naslov: "",
    opis: "",
  });

  const [kolegiji, setKolegiji] = useState([""]);
  let kategorije = [
    "LABOS",
    "BLIC",
    "GRADIVO",
    "KONTINUIRANI_ISPIT",
    "ISPITNI_ROK",
  ];

  React.useEffect(() => {
    getData("/kolegiji").then((data) => {
      setKolegiji(data);
    });
  }, []);

  function handleAdChange(event) {
    setAd((prevAd) => {
      return { ...prevAd, [event.target.name]: event.target.value }; //posto ima vise inputova, treba ih se razlikovati po name-u => to je jedan od parametara koji je sacuvan u event.target
    });
  }

  function onSubmit(event) {
    event.preventDefault();

    const data = {
      naslov: ad.naslov,
      opis: ad.opis,
      kolegij_ime: ad.kolegij,
      kategorija: ad.kategorija,
      trazimPomoc: ad.radnja,
    };

    console.log(data);

    postDataAuth("oglasi", data).then((res) => {
      console.log(res);
      if (res.error) {
        console.log(res.message);
      }
    });
  }

  return (
    <div>
      <Navbar getPersonInfo={getPersonInfo}></Navbar>

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
            <div className="mb-3">
              <Form.Check
                inline
                label="Tražim pomoć!"
                name="radnja"
                type="radio"
                value="true"
                onChange={handleAdChange}
              />
              <Form.Check
                inline
                label="Nudim pomoć!"
                name="radnja"
                type="radio"
                value="false"
                onChange={handleAdChange}
              />
            </div>

            <div className="mb-3">
              <Form.Select
                aria-label="Default select example"
                name="kolegij"
                onChange={handleAdChange}
              >
                <option value="">Kolegij</option>
                {kolegiji.map((kolegij) => {
                  return <option value={kolegij.ime}>{kolegij.ime}</option>;
                })}
              </Form.Select>
            </div>

            <div className="mb-3">
              <Form.Select
                aria-label="Default select example"
                name="kategorija"
                onChange={handleAdChange}
              >
                <option value="">Kategorija</option>
                {kategorije.map((kategorija) => {
                  return <option value={kategorija}>{kategorija}</option>;
                })}
              </Form.Select>
            </div>

            <div className="mb-3">
              <Form.Label>Naslov oglasa</Form.Label>
              <Form.Control
                type="text"
                placeholder="Naslov"
                name="naslov"
                onChange={handleAdChange}
              ></Form.Control>
            </div>

            <div className="mb-3">
              <Form.Label>Opis problema/ponude</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="opis"
                onChange={handleAdChange}
              ></Form.Control>
            </div>
            <ButtonGroup className="mb-3 d-flex flex-row">
              <Button type="reset" variant="danger">
                Očisti
              </Button>
              <Button
                style={{ marginRight: "auto" }}
                type="submit"
                disabled={
                  !ad.radnja ||
                  !ad.kolegij ||
                  !ad.kategorija ||
                  !ad.naslov ||
                  !ad.opis
                    ? true
                    : false
                }
              >
                Podnesi
              </Button>
            </ButtonGroup>
          </Form>
        </Card>
      </div>
    </div>
  );
}
