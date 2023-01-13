import React, { Component } from "react";
import { getDataAuth, getPersonInfo } from "../../scripts/util";
import AdList from "../shared/AdList";
import "../../cssFiles/profile/Profile.css";
import "../../cssFiles/shared/shared.css";

class UserAds extends Component {
  state = {
    activeUserAds: [],
    activeUserAdsQueries: [],
    inactiveUserAds: [],
  };

  componentDidMount() {
    this.handleUserAds();
  }

  handleUserAds = () => {
    const personInfo = getPersonInfo();
    if (personInfo === null) return;

    getDataAuth("oglasi/aktivni/" + personInfo.id).then((data) =>
      this.setState({ activeUserAds: data })
    );

    getDataAuth("oglasi/neaktivni/" + personInfo.id).then((data) =>
      this.setState({ inactiveUserAds: data })
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className="profile-section">
          <h2 className="section-title section-title-secondary-color">
            {" "}
            Moji aktivni oglasi
          </h2>
          <AdList
            key="adList"
            data={this.state.activeUserAds ?? []}
            forProfile={true}
            forOwnAds={true}
          />
        </div>
        <div className="profile-section">
          <h2 className="section-title section-title-secondary-color">
            {" "}
            Moji neaktivni oglasi
          </h2>
          <AdList
            key="adList"
            data={this.state.inactiveUserAds ?? []}
            forProfile={true}
            forOwnAds={true}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default UserAds;
