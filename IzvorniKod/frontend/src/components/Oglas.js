import React from "react";
import avatars from "../avatars";
import "../cssFiles/Oglas.css"

export default function Oglas({ naslov, opis, kreator }) {

    /*console.log("TU")
    console.log(naslov)
    console.log(kreator)*/
    return (
        <div className="oglas-container">
            <div className="oglas-korisnik-info-container">
                {avatars.map(avatar => {
                    console.log(avatar)
                    if (avatar.id === kreator.avatar) {
                        return <div className="oglas-korisnik-info">
                            <img id={avatar.id} src={avatar.src}
                                style={
                                    {
                                        width: "40px",
                                        height: "40px",
                                        margin: "10px 5px",
                                        borderRadius: "20px"
                                    }
                                }></img>
                            {kreator.korisnickoIme}</div>

                    }
                })}
            </div>
            <div className="oglas-info-container">
                <div className="oglas-naslov">
                    <h2>{naslov}</h2>
                </div>
                <div className="oglas-text-opis">
                    {opis}
                </div>
            </div>
        </div>
    )
}