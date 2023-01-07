import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import CreateQuery from "../home/CreateQuery";
import "../../cssFiles/home/oglas.css";
import UserTag from "./UserTag";
import DeleteAd from "../home/DeleteAd";
import { putDataAuth } from "../../scripts/util";

class Ad extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    // console.log(props)
  }

  handleActivityChange = () => {
    const ad = this.props.ad;
    console.log(ad.aktivan);
    putDataAuth("oglasi/" + ad.id + "/promijeniAktivnost").then((data) => {
      if (data.error) {
        alert(data.error.message);
      } else {
        window.location.reload();
      }
    })
  };

  render() {
    const ad = this.props.ad;

    return (
      <div className="card mb-3" >
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
          
          <div className="container" style={{ "border-left": "1px solid gray", height: "100%", "padding-left": "5%" }}>
            <div className="row d-flex align-content-between h-100">
              <div>
                <p style={{ fontSize: "20px", fontWeight: "600" }}>{ad.kolegij.ime}</p>
                <p style={{ color: "gray", fontSize: "20px" }}>{ad.trazimPomoc ? "Tražim pomoć" : "Nudim pomoć"}</p>
              </div>
              <div>
                {
                  this.props.isModerator ?
                    <DeleteAd props={this.props}></DeleteAd> : 
                    (
                      this.props.forProfile ? (
                          this.props.forOwnAds ? 
                            <Button variant="secondary" onClick={this.handleActivityChange}> Promijeni aktivnost oglasa </Button> : 
                            "" ) : 
                        <CreateQuery props={this.props} />
                    )
                }
              </div>
            </div>            
          </div>
        </div>
      </div>
    );
  }
}

export default Ad;
