import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Card } from "react-bootstrap";
import "../cssFiles/login.css"

export default function Login() {

    const [info, setInfo] = useState({
        userName: "",
        password: ""
    })       
    
    let value = false   //ako se u useState ubaci hardcodirana vrijednost, promjene ce biti odmah vidljive, odmah ce se updateati vrijednost

    const navigate = useNavigate()

    function handleInfoChange(e) {      
        setInfo(prevInfo => {
            return { ...prevInfo, [e.target.name]: e.target.value }     //posto ima vise inputova, treba ih se razlikovati po name-u => to je jedan od parametara koji je sacuvan u 
        })   
    }

    function handleSubmit(e) {
        e.preventDefault()
        const data = {
            userName: info.userName,
            password: info.password
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `username=${info.username}&password=${info.password}`
        }
        return fetch("/login", options)
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
                    onClick={handleSubmit}
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
            </Card>

        </div>
    )
}