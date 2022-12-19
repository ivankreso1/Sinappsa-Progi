import { Button, ButtonGroup, Card, Form } from "react-bootstrap";
import React, { useState } from "react";
import Navbar from "./home/Navbar";
import { getData, getPersonInfo, postDataAuth } from "../scripts/util";
import { useNavigate } from "react-router-dom";

export default function CreateAd() {
  function optionCreateAd() {
    let currentInfo = JSON.parse(localStorage.getItem("personInfo")); // za onemogucavanje neulogiranog odlaska na /create-ad
    console.log(currentInfo.userName);
    if (!currentInfo.userName) {
      navigate("/login");
    } else {
      navigate("/create-ad");
    }
  }

  const [count, setCount] = React.useState(0);

  const navigate = useNavigate();
  const [error, setError] = useState("");

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

  function handleCount(event) {
    setCount(event.target.value.length);
  }

  function handleMultipleFun(event) {
    handleCount(event);
    handleAdChange(event);
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
      //  console.log(res);
      if (res.error) {
        console.log(res.message);
        setError(res.message);
      } else {
        navigate("/");
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
          <Form className="form" onSubmit={onSubmit} required="true">
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
                required="true"
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
                required="true"
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
                required="true"
                maxLength={255}
                minLength={5}
                onChange={handleAdChange}
              ></Form.Control>
            </div>

            <div className="mb-3">
              <Form.Label>Opis problema/ponude</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="opis"
                onChange={handleMultipleFun}
                maxLength={255}
                minLength={20}
                required="true"
              ></Form.Control>
              <div>
                <p>
                  {count}/{255}
                </p>
              </div>
            </div>
            <ButtonGroup className="mb-3 d-flex ">
              <Button variant="danger" href="/">
                Cancel
              </Button>
              <Button variant="secondary" type="reset">
                Clear
              </Button>
              <Button
                variant="success"
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
                Submit
              </Button>
            </ButtonGroup>
          </Form>
          <div className="error-message">{error}</div>
        </Card>
      </div>
    </div>
  );
}
