import React from "react";
import avatars from "../avatars";
import "../cssFiles/Oglas.css"

export default function Oglas() {


    return (
        <div className="oglas-container">
            <div className="oglas-korisnik-info-container">
                {avatars.map(avatar => {
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
                        korisničko ime</div>
                })}
            </div>
            <div className="oglas-info-container">
                <div className="oglas-naslov">
                    <h2>Naslov</h2>
                </div>
                <div className="oglas-text-opis">
                    Ovo je opis oglasa. Tu se navodi koja se usluga traži/pruža (davanje instrukcija, primanje instrukcija ...)
                </div>
            </div>
        </div>
    )
}