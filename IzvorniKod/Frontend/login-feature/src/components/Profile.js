import React from "react";
import avatars from "../avatars";
import "../cssFiles/Profile.css"

export default function Profile() {

    const personInfo = JSON.parse(localStorage.getItem("personInfo"))
    console.log(personInfo)
    return (
        <div className="profile-container">
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
        </div>
    )
}