import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import avatars from "../avatars";
import configData from "./config.json";



export default function EditProfile() {


    const [editInfo, setEditInfo] = useState({
        korisnickoIme: "",
        lozinka: "",
        avatar: ""
    })
   

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
                            value={editInfo.korisnickoIme}>
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
                                ></img>
                        )}
                </div>

                <Form.Group
                    className="info-input"
                >
                    <Form.Control type="password"
                        placeholder="Nova lozinka"
                        name="lozinka"
                        value={editInfo.lozinka}>
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