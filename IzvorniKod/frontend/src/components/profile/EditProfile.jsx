import React, { useState } from "react";
import { Button, Form, Card, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import avatars from "../../avatars";
import {
  PERSON_INFO_TEMPLATE,
  putDataAuth,
  getPersonInfo,
  updatePersonInfo,
} from "../../scripts/util";
import Navbar from "../home/Navbar";
import "../../cssFiles/profile/editProfile.css";

export default function EditProfile() {
  let currentInfo = getPersonInfo();

  React.useEffect(() => {
    if (currentInfo === null || currentInfo?.isModerator) {
      navigate("/login");
    }
  });

  const [editInfo, setEditInfo] = useState({ ...PERSON_INFO_TEMPLATE });

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [chosenAvatar, setChosenAvatar] = useState("");

  function handleInfoChange(e) {
    setEditInfo((prevInfo) => {
      return { ...prevInfo, [e.target.name]: e.target.value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    let data = {};

    if (editInfo.korisnickoIme) data.korisnickoIme = editInfo.korisnickoIme;
    if (editInfo.avatar) data.avatar = editInfo.avatar;
    if (editInfo.lozinka) data.lozinka = editInfo.lozinka;

    putDataAuth("korisnik/uredi/" + currentInfo.id, data).then((data) => {
      if (data.error) {
        setError(data.message);
      } else {
        updatePersonInfo(
          currentInfo.id,
          !editInfo.korisnickoIme
            ? currentInfo.userName
            : editInfo.korisnickoIme,
          !editInfo.lozinka ? currentInfo.password : editInfo.lozinka
        );
        navigate("/profile");
      }
    });
  }

  function handleAvatarOnclick(id) {
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
              Odustani
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
              Spremi
            </Button>
          </ButtonGroup>
        </Form>
        <div className="error-message">{error}</div>
      </Card>
    </div>
  );
}
