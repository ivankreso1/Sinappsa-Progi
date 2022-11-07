import React, {useState} from "react";

export default function Login() {

    const [info, setInfo] = useState({
        email: "",
        password: ""
    })      //pocetne informacije 

    function handleInfoChange(e) {      //

        console.log("User input: " + info.email + " " + info.password)  
        setInfo(prevInfo => {
            return { ...prevInfo, [e.target.name] : e.target.value}     //posto ima vise inputova, treba ih se razlikovati po name-u => to je jedan od parametara koji je sacuvan u 
                                                                        //eventu (e) - pojedinom inputu se pristupa s e.target.name
        })      //funkcija mijenja podatke koji se nalaze u "info" - info se ne smije direktno mijenjati nego se treba zadati callback funkcija
    }

    return (
        <div>
            <h1>Login</h1>
            <form>
                <div className="info-input">
                    <input
                        type="email"
                        placeholder="E-mail adresa"
                        required
                        name = "email"      //definiran je name kako bi se moglo zvati koji input je triggerao event
                        value = {info.email}
                        onChange = {handleInfoChange}
                    >
                    </input>
                    <input
                        type="password"
                        placeholder="Lozinka"
                        required
                        name="password"       //definiran je name kako bi se moglo zvati koji input je triggerao event
                        value = {info.password}
                        onChange={handleInfoChange}>

                    </input>
                    <button
                    type = "submit"> Submit </button>
                </div>
            </form>
            {(info.email && info.password) && <p> Input info: {info.email + " " + info.password}</p>} 
        </div>
    )
}