import React, { useState } from "react";
import { Button, Form, Card, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import avatars from "../../avatars";
import {
  PERSON_INFO_KEY,
  PERSON_INFO_TEMPLATE,
  putDataAuth,
  getPersonInfo,
} from "../../scripts/util";
import Navbar from "../home/Navbar";
import "../../cssFiles/editProfile.css";

export default function EditProfile() {
  let currentInfo = getPersonInfo();

  React.useEffect(() => {
    if (currentInfo.userName.length === 0) {
      navigate("/login"); // za onemogucavanje neulogiranog odlaska na /editProfile
    }
  }, []);

  const [editInfo, setEditInfo] = useState({
    korisnickoIme: "",
    lozinka: "",
    avatar: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [chosenAvatar, setChosenAvatar] = useState("");

  function handleInfoChange(e) {
    setEditInfo((prevInfo) => {
      return { ...prevInfo, [e.target.name]: e.target.value }; //posto ima vise inputova, treba ih se razlikovati po name-u => to je jedan od parametara koji je sacuvan u event.target
    });
    //console.log(editInfo)
  }

  function handleSubmit(e) {
    //ovdje ide put zahtjev
    e.preventDefault();
    let data = {};

    if (editInfo.korisnickoIme) data.korisnickoIme = editInfo.korisnickoIme;
    if (editInfo.avatar) data.avatar = editInfo.avatar;
    if (editInfo.lozinka) data.lozinka = editInfo.lozinka;

    putDataAuth("korisnik/uredi/" + currentInfo.id, data).then((data) => {
      console.log(data); //ne smije pisati console.log("Data: " + data) jer se onda ne ispise data kak se spada
      if (data.error) {
        //console.log("U error")
        console.log(data.message);
        setError(data.message);
      } else {
        const personInfo = PERSON_INFO_TEMPLATE;

        personInfo.userName = !editInfo.korisnickoIme
          ? currentInfo.userName
          : editInfo.korisnickoIme;
        personInfo.password = !editInfo.lozinka
          ? currentInfo.password
          : editInfo.lozinka; //sprema se nehashana vrijednost
        personInfo.id = currentInfo.id;

        localStorage.setItem(PERSON_INFO_KEY, JSON.stringify(personInfo));
        //console.log("ovdje")
        navigate("/profile");
      }
    });
  }

  function handleAvatarOnclick(id) {
    // console.log("Clicked on avatar number: " + id)
    setChosenAvatar(id);
    setEditInfo((prevInfo) => {
      return { ...prevInfo, avatar: id };
    });
  }

  return (
    <div className="editContainer">
      <Navbar getPersonInfo={getPersonInfo}></Navbar>
      <Card
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
          minWidth: "400px",
          maxWidth: "480px",
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          alignSelf: "center",
          borderRadius: "10px",
        }}
      >
        <h1> Uredi profil </h1>
        <span>
          {" "}
          Unesite novo korisničko ime, lozinku i/ili avatar. Podaci koje ne
          upišete ostaju nepromijenjeni.
        </span>
        <Form className="form" onSubmit={handleSubmit}>
          <Form.Group className="info-input">
            <Form.Control
              type="text"
              placeholder="Novo korisničko ime"
              name="korisnickoIme"
              value={editInfo.korisnickoIme}
              onChange={handleInfoChange}
            ></Form.Control>
          </Form.Group>

          <div className="avatar-placeholder">
            {avatars.map((avatar) => (
              <img
                key={avatar.id}
                src={avatar.src}
                alt=""
                style={{
                  border:
                    chosenAvatar === avatar.id
                      ? "7.5px solid #5495E3"
                      : "2px solid black",
                }}
                onClick={() => handleAvatarOnclick(avatar.id)}
              ></img>
            ))}
          </div>

          <Form.Group className="info-input">
            <Form.Control
              type="password"
              placeholder="Nova lozinka"
              name="lozinka"
              value={editInfo.lozinka}
              onChange={handleInfoChange}
            ></Form.Control>
          </Form.Group>
          <ButtonGroup>
            <Button
              style={{
                marginBottom: "10px",
              }}
              variant="danger"
              href="/profile"
            >
              {" "}
              Odustani{" "}
            </Button>
            <Button
              style={{
                marginBottom: "10px",
              }}
              type="submit"
              variant="success"
              disabled={
                !editInfo.korisnickoIme && !editInfo.avatar && !editInfo.lozinka
                  ? true
                  : false
              }
            >
              {" "}
              Spremi{" "}
            </Button>
          </ButtonGroup>
        </Form>
        <div className="error-message">{error}</div>
      </Card>
    </div>
  );
}
