import React, { Component } from 'react';
import avatars from '../../avatars';
import { getDataAuth, getPersonInfo } from "../../scripts/util";
import { Button} from "react-bootstrap";
import AdList from "../home/AdList";
import "../../cssFiles/Profile.css";
import "../../cssFiles/shared/shared.css";


class UserAds extends Component {
    state = {
        activeUserAds: [],
        inactiveUserAds: []
    };

    componentDidMount() {   
        // lifecycle hook, kad se stvori komponenta (dakle mora se renderirati prvo), pozovemo handleProfileInfo da fetcha i displaya podatke
        this.handleUserAds();
    }

    handleUserAds = () => {
        const personInfo = getPersonInfo();
        console.log(personInfo);

        getDataAuth("oglasi/aktivni/" + personInfo.id)
        .then(data => this.setState({ activeUserAds: data }));

        getDataAuth("oglasi/neaktivni/" + personInfo.id)
        .then(data => this.setState({ inactiveUserAds: data }));

        console.log(this.state.inactiveUserAds);
    }

    render() { 
        return (
            <React.Fragment>
                <div className="profile-section">
                    <h2 className="section-title section-title-secondary-color"> Moji aktivni oglasi</h2>
                    <AdList key="adList" oglasi={this.state.activeUserAds} />
                </div>
                <div className="profile-section">
                    <h2 className="section-title section-title-secondary-color"> Moji neaktivni oglasi</h2>
                    <AdList key="adList" oglasi={this.state.inactiveUserAds} />
                </div>
            </React.Fragment>
        );
    }
}


export default UserAds;