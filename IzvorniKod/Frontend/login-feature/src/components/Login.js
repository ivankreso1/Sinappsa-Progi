import React, { useState } from "react";
import tests from "../tests"

export default function Login() {


    const[database] = useState([])
    const [info, setInfo] = useState({
        email: "",
        password: ""
    })      //pocetne informacije 

    const [submited, setSubmited] = useState(false)

    function handleInfoChange(e) {      //

        //console.log("User input: " + info.email + " " + info.password)  
        setInfo(prevInfo => {
            return { ...prevInfo, [e.target.name]: e.target.value }     //posto ima vise inputova, treba ih se razlikovati po name-u => to je jedan od parametara koji je sacuvan u 
            //eventu (e) - pojedinom inputu se pristupa s e.target.name
        })      //funkcija mijenja podatke koji se nalaze u "info" - info se ne smije direktno mijenjati nego se treba zadati callback funkcija
    }

    function handleSubmit(e) {  //poziva se kada se forma submita (pritiskom na submit gumb)
        e.preventDefault()  //zaustavlja se defaultno ponasanje weba da se stranica refresha - ja sam htio ispisati podatke i ostaviti podatke u input poljima
        setSubmited(false)      //cim se nesto mijenjalo (lozinka ili e-mail adresa), mice se poruka o uspjesnom loginu - inace bi stalno bilo true i 
                                //stalno bi se ispisivala poruka o uspjesnoj prijavi
        tests.map(test => {
            if (test.email === info.email 
                &&
                test.password === info.password) {
                    setSubmited(true)
                }
        })
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="info-input">
                    <input
                        type="email"
                        placeholder="E-mail adresa"
                        required
                        name="email"      //definiran je name kako bi se moglo zvati koji input je triggerao event
                        value={info.email}
                        onChange={handleInfoChange}
                    >
                    </input>
                    <input
                        type="password"
                        placeholder="Lozinka"
                        required
                        name="password"       //definiran je name kako bi se moglo zvati koji input je triggerao event
                        value={info.password}
                        onChange={handleInfoChange}>

                    </input>
                    <button
                        type="submit"
                        disabled={!info.email || !info.password ? true : false}> Submit </button>
                </div>
            </form>
            {submited && <p> Uspješno ste se ulogirali </p>}
        </div>
    )
}