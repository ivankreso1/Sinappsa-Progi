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

export default function Register() {


    const [registerInfo, setRegisterInfo] = useState({
        ime: "",
        prezime: "",
        korisnickoIme: "",
        email: "",
        avatar: "",
        lozinka: "",
    })

    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [chosenAvatar, setChosenAvatar] = useState("")

    function handleInfoChange(e) {
        if (error) setError("")
        setRegisterInfo(prevInfo => {
            return { ...prevInfo, [e.target.name]: e.target.value }     //posto ima vise inputova, treba ih se razlikovati po name-u => to je jedan od parametara koji je sacuvan u event.target
        })
    }

    function handleSubmit(e) {      //ovdje ide post zahtjev
        e.preventDefault()
        const data = {
            korisnickoIme: registerInfo.korisnickoIme,
            email: registerInfo.email,
            ime: registerInfo.ime,
            prezime: registerInfo.prezime,
            lozinka: registerInfo.lozinka,
            avatar: registerInfo.avatar,

        }
        const method = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        fetch(`${configData.hostname}/korisnik/registracija`, method)
        .then(res => res.json())
        .then(data => {
            console.log(data)   //ne smije pisati console.log("Data: " + data) jer se onda ne ispise data kak se spada
            if (data.error) {
                //console.log("U error")
                console.log(data.message)
                setError(data.message)
            }
            else {
                alert("Uspješna registracija, provjerite mail")
                navigate("/login")
            }
        })
    }

    function handleAvatarOnclick(id) {
        // console.log("Clicked on avatar number: " + id)
        setChosenAvatar(id)
        setRegisterInfo(prevInfo => {
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
                <h1> Register </h1>
                <Form
                    className="form"
                    onSubmit={handleSubmit}
                >
                    <Form.Group
                        className="info-input"
                    >
                        <Form.Control type="text"
                            placeholder="Ime"
                            name="ime"
                            value={registerInfo.ime}
                            required
                            onChange={handleInfoChange}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group
                        className="info-input"
                    >
                        <Form.Control type="text"
                            placeholder="Prezime"
                            name="prezime"
                            required
                            value={registerInfo.prezime}
                            onChange={handleInfoChange}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group
                        className="info-input"
                    >
                        <Form.Control type="text"
                            placeholder="Korisničko ime"
                            name="korisnickoIme"
                            value={registerInfo.korisnickoIme}
                            required
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
                    <Form.Control type="email"
                        placeholder="E-mail adresa"
                        name="email"
                        required
                        value={registerInfo.email}
                        onChange={handleInfoChange}>
                    </Form.Control>
                </Form.Group>
                <Form.Group
                    className="info-input"
                >
                    <Form.Control type="password"
                        placeholder="Lozinka"
                        name="lozinka"
                        required
                        value={registerInfo.lozinka}
                        onChange={handleInfoChange}>
                    </Form.Control>
                </Form.Group>
                <Button
                    style={{
                        marginBottom: "10px"
                    }}
                    type="submit"
                    disabled={(!registerInfo.ime ||
                        !registerInfo.prezime ||
                        !registerInfo.korisnickoIme ||
                        !registerInfo.avatar ||
                        !registerInfo.lozinka ||
                        !registerInfo.email) ? true : false}> Submit </Button>
            </Form>
            <div className="error-message">
                    {error}
            </div>
        </Card>
        </div >
    )
}