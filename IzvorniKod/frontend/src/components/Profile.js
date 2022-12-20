import React from "react";
import { useNavigate } from 'react-router-dom';
import avatars from "../avatars";
import "../cssFiles/home/Profile.css";
import Navbar from "./home/Navbar";
import { getPersonInfo } from "../scripts/util";

export default function Profile() {

    const navigate = useNavigate()

    function goToEdit() {
      navigate("/editProfile")
    }

    const personInfo = JSON.parse(localStorage.getItem("personInfo"))
    console.log(personInfo)
    return (
        <div className="profile-container">
            <Navbar getPersonInfo={getPersonInfo}></Navbar>
            <div className="info">
                {avatars.map(
                    avatar => {
                    console.log(avatar)
                    console.log("AVATAR.ID: " + avatar.id + " " + "personInfo.avatar: " + personInfo.avatar)
                    console.log("JEDNAKO?: " + (avatar.id === personInfo.avatar))
                    console.log("AVATAR SRC: " + avatar.src)
                    if (avatar.id === personInfo.avatar) {
                        return <img key={avatar.id}
                            src={avatar.src}
                            alt=""
                        ></img> //ne smije biti razmak: > </img> - vraca gresku i nista ne prikazuje
                    }
                })}
                {personInfo.ime + " " + personInfo.prezime + " " + personInfo.korisnickoIme}
            </div>
            <button onClick={goToEdit}>Uredi profil</button>
        </div>
    )
}