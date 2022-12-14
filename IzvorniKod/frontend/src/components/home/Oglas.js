import React from "react";
import avatars from "../../avatars";
import "../../cssFiles/home/oglas.css";

export default function Oglas({ naslov, opis, kreator, trazimPomoc }) {

    //console.log(trazimPomoc)
    return (
        <div className="oglas-container">
            <div className="oglas-korisnik-info-container">
                {avatars.map(avatar => {
                    if (avatar.id === kreator.avatar) {
                        return <div className="oglas-korisnik-info">
                            <img id={avatar.id} src={avatar.src}
                                 alt="alt"></img>
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