import React, { Component } from "react";
import avatars from "../../avatars";
import { getDataAuth, getPersonInfo } from "../../scripts/util";
import { Button } from "react-bootstrap";
import "../../cssFiles/profile/Profile.css";
import "../../cssFiles/shared/shared.css";

class ProfileInfo extends Component {
  state = {
    profileInfo: {},
  };

  componentDidMount() {
    this.handleProfileInfo();
  }

  handleProfileInfo = () => {
    const personInfo = getPersonInfo();
    if (personInfo === null) return;
    
    getDataAuth("korisnik/podaci/" + personInfo.id).then((data) =>
      this.setState({ profileInfo: data })
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className="profile-section">
          <h2 className="section-title section-title-secondary-color">
            {" "}
            Moji korisnički podaci
          </h2>
          <div className="profile-info-container">
            {avatars.map((avatar) => {
              if (avatar.id === this.state.profileInfo.avatar) {
                return (
                  <img
                    key={`avatarImg${avatar.id}`}
                    id={avatar.id}
                    src={avatar.src}
                    alt="alt"
                  ></img>
                );
              } else return "";
            })}
            <span>
              Ime i prezime: {this.state.profileInfo.ime}{" "}
              {this.state.profileInfo.prezime}
            </span>
            <span>E-mail adresa: {this.state.profileInfo.email}</span>
            <span>Korisničko ime: {this.state.profileInfo.korisnickoIme}</span>
            <span>
              Broj primljenih ocjena:{" "}
              {this.state.profileInfo.brojPrimljenihRecenzija}
            </span>
            <span>
              Prosjek ocjena:{" "}
              {this.state.profileInfo.brojPrimljenihRecenzija === 0
                ? 0
                : this.state.profileInfo.sumaPrimljenihRecenzija /
                  this.state.profileInfo.brojPrimljenihRecenzija}
            </span>
            <div className="mt-2">
              <Button
                style={{ marginBottom: "10px" }}
                variant="secondary"
                href="/editProfile"
              >
                Uredi
              </Button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProfileInfo;
