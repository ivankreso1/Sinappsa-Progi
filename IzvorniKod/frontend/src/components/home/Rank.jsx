import React, { Component } from "react";
import "../../cssFiles/home/rank.css";
import UserTag from "../shared/UserTag";
import "bootstrap";

class Rank extends Component {
  render() {
    return (
      <div className="card flex-lg-row justify-content-xxl-between align-items-center">
        <div style={{ scale: "84%" }}>
          <UserTag key="userTag" user={this.props.user}/>
        </div>
        <div className="m-3 align-items-center">
          <h5 className="d-inline">{this.props.user.prosjek.toFixed(2)}</h5>
          {/* <img className="" src="/assets/img/star-fill.svg" alt="Bootstrap"></img> */}
        </div>        
      </div>
    );
  }
}

export default Rank;
