import React from "react";
import "../../cssFiles/home/navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar({ getPersonInfo }) {

    const navigate = useNavigate()

    function logout() {
        localStorage.removeItem("personInfo")
        navigate("/login")
    }

    const personInfo = getPersonInfo()
    console.log(personInfo)

    return (
        <div className="homepage-header">
            <div className="homepage-project-name">
                <h2>Sinnappsa</h2>
            </div>
            <div className="homepage-header-links">
                <div className="page-links">
                    <a href="/">Home</a>
                    {personInfo.id !== undefined ? <a href="/profile">Profile</a> : ""}
                    {personInfo.id !== undefined ? <a onClick={logout}> Logout ({personInfo.userName})</a> : <a href="/login"> Login </a>}
                </div>
            </div>
        </div>
    )
}

