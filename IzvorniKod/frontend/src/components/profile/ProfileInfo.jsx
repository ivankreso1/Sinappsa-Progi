import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import avatars from '../../avatars';
import { PERSON_INFO_KEY, PERSON_INFO_TEMPLATE, getDataAuth, getPersonInfo } from "../../scripts/util";
import { Button, Form, Card } from "react-bootstrap";
import "../../cssFiles/profile.css";
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
        console.log(this.state);
    }

    render() { 
        return (
            <React.Fragment>
                <div className="profile-info-container">
                    <h1>Moj profil</h1>
                    {avatars.map(avatar => {
                        if (avatar.id === this.state.profileInfo.avatar) {
                            return <img id={avatar.id} src={avatar.src} alt="alt"></img>
                        }
                    })}
                    <span>Ime i prezime: {this.state.profileInfo.ime} {this.state.profileInfo.prezime}</span>
                    <span>E-mail adresa: {this.state.profileInfo.email}</span>
                    <span>Korisničko ime: {this.state.profileInfo.korisnickoIme}</span>
                    <span>Prosjek ocjena: {(this.state.profileInfo.sumaPrimljenihRecenzija / this.state.profileInfo.brojPrimljenihRecenzija)}</span>
                    <Button style={{marginBottom: "10px"}}>Uredi profil</Button>
                </div>
            </React.Fragment>
        );
    }
}


export default ProfileInfo;