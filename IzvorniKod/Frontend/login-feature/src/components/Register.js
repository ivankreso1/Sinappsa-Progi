import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";

/*
Treba postojati nekakva procedura nakon sto se s backenda dohvate podaci - treba se pratiti je li forma dobro ispunjena => ako je, onda se preusmjerava na home page i cuvaju se upisani podaci
Ukoliko je forma krivo ispunjena, ispisuje se odgovarajuca poruka
onSubmit se salju upisani podaci na backend
*/

export default function Register() {


    const [registerInfo, setRegisterInfo] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        avatar: "",
        password: "",
    })

    function handleInfoChange(e) {
        setRegisterInfo(prevInfo => {
            return { ...prevInfo, [e.target.name]: e.target.value }     
        })
    }

    function handleSubmit(e) {      //ovdje ide post zahtjev
        e.preventDefault()
        console.log(registerInfo)

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
                            name="firstName"
                            value={registerInfo.firstName}
                            required
                            onChange={handleInfoChange}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group
                        className="info-input"
                    >
                        <Form.Control type="text"
                            placeholder="Prezime"
                            name="lastName"
                            required
                            value={registerInfo.lastName}
                            onChange={handleInfoChange}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group
                        className="info-input"
                    >
                        <Form.Control type="text"
                            placeholder="Korisničko ime"
                            name="userName"
                            value={registerInfo.userName}
                            required
                            onChange={handleInfoChange}>
                        </Form.Control>
                    </Form.Group>
                    <div className="avatar-placeholder">
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
                    <Form.Control type="text"
                        placeholder="Lozinka"
                        name="password"
                        required
                        value={registerInfo.password}
                        onChange={handleInfoChange}>
                    </Form.Control>
                </Form.Group>
                <Button
                    style={{
                        marginBottom: "10px"
                    }}
                    type="submit"
                    disabled={(!registerInfo.firstName ||
                        !registerInfo.lastName ||
                        !registerInfo.userName ||
                        !registerInfo.password ||
                        !registerInfo.email) ? true : false}> Submit </Button>
            </Form>
        </Card>

        </div >
    )
}