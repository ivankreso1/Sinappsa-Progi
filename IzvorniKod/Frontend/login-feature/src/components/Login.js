import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Card } from "react-bootstrap";
import tests from "../tests"


export default function Login() {


    const [info, setInfo] = useState({
        email: "",
        password: ""
    })      //pocetne informacije 
    
    const [loggedIn, setLoggedIn] = useState(false)
    const navigate = useNavigate()

    function handleInfoChange(e) {      
        setInfo(prevInfo => {
            return { ...prevInfo, [e.target.name]: e.target.value }     //posto ima vise inputova, treba ih se razlikovati po name-u => to je jedan od parametara koji je sacuvan u 
        })   
    }

    function handleSubmit(e) {  //poziva se kada se forma submita (pritiskom na submit gumb)
        e.preventDefault()  //zaustavlja se defaultno ponasanje weba da se stranica refresha - ja sam htio ispisati podatke i ostaviti podatke u input poljima
        //setSubmited(false)      //cim se nesto mijenjalo (lozinka ili e-mail adresa), mice se poruka o uspjesnom loginu - inace bi stalno bilo true i 
                                //stalno bi se ispisivala poruka o uspjesnoj prijavi
        for (let test of tests) {
            if (test.email === info.email
                &&
                test.password === info.password) {
                console.log("USAO")
                setLoggedIn(true)
            }
            console.log("Logged in: " + loggedIn)
        }

        //console.log("Submited prije navigate: " + loggedIn)
        if (loggedIn) navigate("/profile")      //ukoliko se korisnik ispravno ulogirao, odvedi ga na profile
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
                    onSubmit={handleSubmit}>
                    <Form.Group
                        className="info-input"
                    >
                        <Form.Control type="email"
                            placeholder="Email address"
                            name="email"
                            value={info.email}
                            required
                            onChange={handleInfoChange}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group
                        className="info-input"
                    >
                        <Form.Control type="password"
                            placeholder="Password"
                            name="password"
                            required
                            value={info.password}
                            onChange={handleInfoChange}>
                        </Form.Control>
                    </Form.Group>

                    <Button
                        type="submit"
                        disabled={!info.email || !info.password ? true : false}> Submit </Button>
                </Form>
                <div className="register-link">
                    Not a member? <a href="/profile">Register here</a>
                </div>
            </Card>

        </div>
    )
}