import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Card, ButtonGroup } from "react-bootstrap";
import {
  PERSON_INFO_KEY,
  PERSON_INFO_TEMPLATE,
  postData,
  getPersonInfo,
} from "../scripts/util";
import "../cssFiles/login.css";
import Navbar from "./home/Navbar";

export default function Login() {
  let personInfo = getPersonInfo();

  const [info, setInfo] = useState({
    userName: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (personInfo.userName.length !== 0) {
      navigate("/"); // za onemogucavanje ulogiranog odlaska na /login
    }
  }, []);

  function handleInfoChange(e) {
    if (error) setError("");
    setInfo((prevInfo) => {
      return { ...prevInfo, [e.target.name]: e.target.value }; //posto ima vise inputova, treba ih se razlikovati po name-u => to je jedan od parametara koji je sacuvan u
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      korisnickoIme: info.userName,
      lozinka: info.password,
    };

    postData("korisnik/prijava", data) // Dakle ovdje nejde postDataAuth jer onda baca Unauthorized
      .then((data) => {
        // console.log(data)   //ne smije pisati console.log("Data: " + data) jer se onda ne ispise data kak se spada
        if (data.error) {
          //console.log("U error")
          // console.log(data.message)
          setError(data.message);
        } else {
          console.log("data");
          console.log(data);
          const personInfo = PERSON_INFO_TEMPLATE;

          personInfo.userName = info.userName;
          personInfo.password = info.password;
          personInfo.id = data.id;
          personInfo.isModerator = data.moderator;

          localStorage.setItem(PERSON_INFO_KEY, JSON.stringify(personInfo));

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
          <h1> Prijava </h1>
          <Form className="form" onSubmit={handleSubmit}>
            <Form.Group className="info-input">
              <Form.Control
                type="text"
                placeholder="Korisničko ime"
                name="userName"
                value={info.userName}
                required
                onChange={handleInfoChange}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="info-input">
              <Form.Control
                type="password"
                placeholder="Lozinka"
                name="password"
                required
                value={info.password}
                onChange={handleInfoChange}
              ></Form.Control>
            </Form.Group>
            <ButtonGroup className="mb-3 d-flex ">
              <Button variant="danger" href="/">
                Odustani
              </Button>
              <Button
                type="submit"
                disabled={!info.userName || !info.password ? true : false}
              >
                Prijavi se
              </Button>
            </ButtonGroup>
          </Form>
          <div className="register-link">
            Nemaš korisnički račun? <a href="/register">Registriraj se ovdje</a>
          </div>
          <div className="error-message">{error}</div>
        </Card>
      </div>
    </div>
  );
}
