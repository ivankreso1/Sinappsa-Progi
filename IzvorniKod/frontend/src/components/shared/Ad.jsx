import React, { Component } from "react";
import CreateQuery from "../home/CreateQuery";
import DeleteQuery from "../home/DeleteQuery";
import "../../cssFiles/home/oglas.css";
import UserTag from "./UserTag";

class Ad extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    console.log(props)
  }

  render() {
    const ad = this.props.ad;

    return (
      <div className="oglas-container">
        <div className="oglas-korisnik-info-container">
          <UserTag key={`user${ad.kreator.id}`} user={ad.kreator} />
          <div className="oglas-kolegij-i-pomoc">
            <p style={{ fontSize: "20px", fontWeight: "600" }}>
              {ad.kolegij.ime}
            </p>
            {ad.trazimPomoc ? (
              <p style={{ color: "red", fontSize: "20px" }}>Tražim pomoć</p>
            ) : (
              <p style={{ color: "green", fontSize: "20px" }}>Nudim pomoć</p>
            )}
            <p>
              {this.props.forProfile ? "" : <CreateQuery props={this.props} />}
            </p>
          </div>
        </div>
        <div className="oglas-info-container">
          <div className="oglas-naslov">
            <h2>{ad.naslov}</h2>
          </div>
          <div className="oglas-text-opis">{ad.opis}</div>
        </div>
        {this.props.isModerator ? <DeleteQuery props={this.props}></DeleteQuery> : ""}
      </div>
    );
  }
}

export default Ad;
