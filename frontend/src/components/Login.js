import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Card } from "react-bootstrap";
import "../cssFiles/login.css"
import configData from "./config.json";

export default function Login() {

    const [info, setInfo] = useState({
        userName: "",
        password: ""
    })       
    
    const [error, setError] = useState("")
    const navigate = useNavigate()

    function handleInfoChange(e) {      
        setInfo(prevInfo => {
            return { ...prevInfo, [e.target.name]: e.target.value }     //posto ima vise inputova, treba ih se razlikovati po name-u => to je jedan od parametara koji je sacuvan u 
        })   
    }

    function handleSubmit(e) {
        e.preventDefault()
        const data = {
            korisnickoIme: info.userName,
            lozinka: info.password
        }
        const banana = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        fetch(`${configData.hostname}/korisnik/prijava`, banana)
        .then(res => res.json())
        .then(data => {
            console.log(data)   //ne smije pisati console.log("Data: " + data) jer se onda ne ispise data kak se spada
            if (data.error) {
                //console.log("U error")
                console.log(data.message)
                setError(data.message)
            }
            else {
                const personInfo = {
                    avatar: data.avatar,
                    brojPrimljenihRecenzija: data.brojPrimljenihRecenzija,
                    email: data.email,
                    ime: data.ime,
                    korisnickoIme: data.korisnickoIme,
                    prezime: data.prezime,
                    sumaPrimljenihRecenzija: data.sumaPrimljenihRecenzija
                }
                localStorage.setItem("personInfo", JSON.stringify(personInfo))
                //console.log("ovdje")
                navigate("/profile")
            }
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
                <h1> Login </h1>
                <Form
                    className="form"
                    onSubmit={handleSubmit}
                    >
                    <Form.Group
                        className="info-input"
                    >
                        <Form.Control type="text"
                            placeholder="Korisničko ime"
                            name="userName"
                            value={info.userName}
                            required
                            onChange={handleInfoChange}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group
                        className="info-input"
                    >
                        <Form.Control type="password"
                            placeholder="Lozinka"
                            name="password"
                            required
                            value={info.password}
                            onChange={handleInfoChange}>
                        </Form.Control>
                    </Form.Group>

                    <Button
                        type="submit"
                        disabled={!info.userName || !info.password ? true : false}> Submit </Button>
                </Form>
                <div className="register-link">
                    Nemaš korisnički račun? <a href="/register">Registriraj se ovdje</a>
                </div>
                <div className="error-message">
                    {error}
                </div>
            </Card>
        </div>
    )
}