import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import avatars from "../avatars";
import configData from "./config.json";

/*
Treba postojati nekakva procedura nakon sto se s backenda dohvate podaci - treba se pratiti je li forma dobro ispunjena => ako je, onda se preusmjerava na home page i cuvaju se upisani podaci
Ukoliko je forma krivo ispunjena, ispisuje se odgovarajuca poruka
onSubmit se salju upisani podaci na backend
*/

export default function EditProfile() {

    let currentInfo = JSON.parse(localStorage.getItem("personInfo"))

    const [editInfo, setEditInfo] = useState({
        korisnickoIme: "",
        lozinka: "",
        email: currentInfo.email,
        avatar: ""
    })
   

    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [chosenAvatar, setChosenAvatar] = useState("")


    function handleInfoChange(e) {
        setEditInfo(prevInfo => {
            return { ...prevInfo, [e.target.name]: e.target.value }     //posto ima vise inputova, treba ih se razlikovati po name-u => to je jedan od parametara koji je sacuvan u event.target
        })
        //console.log(editInfo)
    }


    function handleSubmit(e) {      //ovdje ide post zahtjev
        e.preventDefault()
        let data = {}

        if (editInfo.korisnickoIme) data.korisnickoIme = editInfo.korisnickoIme
        if (editInfo.avatar) data.avatar = editInfo.avatar
        if (editInfo.lozinka) data.lozinka = editInfo.lozinka

        const httpData = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        //console.log(editInfo.korisnickoIme)
        //console.log(editInfo.lozinka)
        console.log(data)
        console.log(httpData)
    }


    function handleAvatarOnclick(id) {
        // console.log("Clicked on avatar number: " + id)
        setChosenAvatar(id)
        setEditInfo(prevInfo => {
            return { ...prevInfo, avatar: id }
        })
    }


    return (
        <div className="container">
            <Card style={
                {
                    boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                    minWidth: "400px",
                    maxWidth: "480px",
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                    borderRadius: "10px"
                }
            }>
                <h1> Uredi profil </h1>
                <span> Unesite novo korisničko ime, lozinku i/ili avatar.
                     Polja koja ostavite prazna ostati će nepromijenjena.</span>
                <Form
                    className="form"
                    onSubmit={handleSubmit}
                >

                    <Form.Group
                        className="info-input"
                    >
                        <Form.Control type="text"
                            placeholder="Novo korisničko ime"
                            name="korisnickoIme"
                            value={editInfo.korisnickoIme}
                            onChange={handleInfoChange}>
                        </Form.Control>
                    </Form.Group>

                    <div className="avatar-placeholder">
                        {avatars.map(
                            avatar =>
                                <img
                                    key={avatar.id}
                                    src={avatar.src}
                                    alt=""
                                    style={{
                                        border: chosenAvatar === avatar.id ? "7.5px solid #5495E3" : "2px solid black"
                                    }}
                                    onClick={() => handleAvatarOnclick(avatar.id)}
                                ></img>
                        )}
                </div>

                <Form.Group
                    className="info-input"
                >
                    <Form.Control type="password"
                        placeholder="Nova lozinka"
                        name="lozinka"
                        value={editInfo.lozinka}
                        onChange={handleInfoChange}>
                    </Form.Control>
                </Form.Group>

                <Button
                    style={{
                        marginBottom: "10px"
                    }}
                    type="submit"> Submit </Button>
            </Form>
            <div className="error-message">
                    {error}
            </div>
        </Card>
        </div>
    )
}