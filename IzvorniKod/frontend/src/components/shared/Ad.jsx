import React, { Component } from "react";
import CreateQuery from "../home/CreateQuery";
import "../../cssFiles/home/oglas.css";
import UserTag from "./UserTag";
import DeleteAd from "../home/DeleteAd";
import EditActiveAd from "../profile/EditActiveAd";
import { getPersonInfo } from "../../scripts/util";

class Ad extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const ad = this.props.ad;
    const personInfo = getPersonInfo();

    return (
      <div className="card mb-3">
        <div className="oglas-korisnik-info-container">
          <div>
            <UserTag key={`user${ad.kreator.id}`} user={ad.kreator} />
            <div className="oglas-info-container">
              <div className="oglas-naslov">
                <h2>{ad.naslov}</h2>
              </div>
              <div className="oglas-text-opis">{ad.opis}</div>
            </div>
          </div>

          <div
            className="container"
            style={{
              "border-left": "1px solid gray",
              height: "100%",
              "padding-left": "5%",
            }}
          >
            <div className="row d-flex align-content-between h-100">
              <div>
                <p style={{ fontSize: "20px", fontWeight: "600" }}>
                  {ad.kolegij.ime}
                </p>
                <p style={{ color: "gray", fontSize: "20px" }}>
                  {ad.trazimPomoc ? "Tražim pomoć" : "Nudim pomoć"}
                </p>
              </div>
              <div>
                {this.props.isModerator ? (
                  <DeleteAd props={this.props}></DeleteAd>
                ) : this.props.forProfile ? (
                  this.props.ad.aktivan &&
                  this.props.ad.kreator.id === personInfo.id ? (
                    <EditActiveAd props={this.props} />
                  ) : (
                    ""
                  )
                ) : (
                  <CreateQuery props={this.props} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Ad;
