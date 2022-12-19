import React, { Component } from 'react';
import avatars from '../../avatars';
import { getDataAuth, getPersonInfo } from "../../scripts/util";
import { Button} from "react-bootstrap";
import "../../cssFiles/Profile.css";
import "../../cssFiles/shared/shared.css";


class ProfileInfo extends Component {
    state = {
        profileInfo: {}
    };

    componentDidMount() {   
        // lifecycle hook, kad se stvori komponenta (dakle mora se renderirati prvo), pozovemo handleProfileInfo da fetcha i displaya podatke
        this.handleProfileInfo();
    }

    handleProfileInfo = () => {
        const personInfo = getPersonInfo();
        console.log(personInfo);
        getDataAuth("korisnik/podaci/" + personInfo.id)
        .then(data => this.setState({ profileInfo: data }));
        //console.log("4" / "2");
        console.log(this.state.profileInfo);
    }

    render() { 
        return (
            <React.Fragment>
                <div className="profile-section">
                <h2 className="section-title section-title-primary-color"> Moji korisnički podaci</h2>
                <div className="profile-info-container">
                    {avatars.map(avatar => {
                        if (avatar.id === this.state.profileInfo.avatar) {
                            return <img id={avatar.id} src={avatar.src} alt="alt"></img>
                        }
                    })}
                    <span>Ime i prezime: {this.state.profileInfo.ime} {this.state.profileInfo.prezime}</span>
                    <span>E-mail adresa: {this.state.profileInfo.email}</span>
                    <span>Korisničko ime: {this.state.profileInfo.korisnickoIme}</span>
                    <span>Broj primljenih ocjena: {this.state.profileInfo.brojPrimljenihRecenzija}</span>
                    <span>Prosjek ocjena: {
                        this.state.profileInfo.brojPrimljenihRecenzija == 0 ? 0 : this.state.profileInfo.sumaPrimljenihRecenzija / this.state.profileInfo.brojPrimljenihRecenzija
                    }</span>
                    <Button style={{marginBottom: "10px"}} href="/editProfile">Uredi profil</Button>
                </div>
                </div>
            </React.Fragment>
        );
    }
}


export default ProfileInfo;