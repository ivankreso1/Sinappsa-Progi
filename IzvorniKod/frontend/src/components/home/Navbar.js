import React, { useEffect, useState } from "react";
import "../../cssFiles/home/navbar.css";
import { useNavigate } from "react-router-dom";
import configData from "../../resources/config.json";


export default function Navbar({getPersonInfo }) {

    const navigate = useNavigate()

    function logout() {
       localStorage.setItem("personInfo", JSON.stringify({
            id: "",
            userName: "",
            password: ""
        }))
        
        /*stavljen timeout zbog 41.reda - onaj u kojem je ternarni operator koji odlucuje oce li se renderat
        Login ili logout: kada se updatea personInfo (useState varijabla), stranica se opet render. UseState varijabla se updatea kada se pozove funkcija
        logout (pozove se kada se klikne na link Logout). U tom trenutku se stranica ponovno rendera te link koji je do tada bio Logout, postaje Login (to je link na path /login)
        s obzirom na to da osoba ne moze toliko brzo kliknut i pustit tipku misa, trebao se staviti timeout od 50ms kako efektivno ne bi "istovremeno" kliknuli i na Logout i na Login*/ 
        setTimeout(() => {setPersonInfo({
            id: "",
            userName: "",
            password: ""
        })}, 50)

    }

    const [personInfo, setPersonInfo] = useState(
        getPersonInfo()
    )

    return (
        <div className="homepage-header">
            <div className="homepage-project-name">
                <h2>Sinnappsa</h2>
            </div>
            <div className="homepage-header-links">
                <div className="page-links">
                    <a href="/">Home</a>
                    {personInfo.id !== "" ? <a href="/profile">Profile</a> : ""}
                    {personInfo.id !== "" ? <a onClick={logout} href="/"> Logout ({personInfo.userName})</a> : <a href="/login"> Login </a>} {/*href kod Logout je nepotreban sto se tice funkcionalnosti, dodan je kako bi se stilovi primijenili */}
                </div>
            </div>
        </div>
    )
}

