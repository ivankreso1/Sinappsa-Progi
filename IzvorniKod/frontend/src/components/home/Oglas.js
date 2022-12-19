import avatars from "../../avatars";
import "../../cssFiles/home/oglas.css";
import CreateQuery from "./CreateQuery";

export default function Oglas({ naslov, opis, kreator, trazimPomoc, kolegij }) {
  return (
    <div className="oglas-container">
      <div className="oglas-korisnik-info-container">
        {avatars.map((avatar) => {
          if (avatar.id === kreator.avatar) {
            return (
              <div className="oglas-korisnik-info">
                <img id={avatar.id} src={avatar.src} alt="alt"></img>
                {kreator.korisnickoIme}
              </div>
            );
          }
        })}
        <div className="oglas-kolegij-i-pomoc">
          <p style={{ fontSize: "20px", fontWeight: "600" }}>{kolegij.ime}</p>
          {trazimPomoc ? (
            <p style={{ color: "red", fontSize: "20px" }}>Tražim pomoć</p>
          ) : (
            <p style={{ color: "green", fontSize: "20px" }}>Nudim pomoć</p>
          )}
          <p>
            <CreateQuery />
          </p>
        </div>
      </div>
      <div className="oglas-info-container">
        <div className="oglas-naslov">
          <h2>{naslov}</h2>
        </div>
        <div className="oglas-text-opis">{opis}</div>
      </div>
    </div>
  );
}
