import React from "react";
import { useNavigate } from "react-router-dom";
import "../../cssFiles/profile/Profile.css";
import Navbar from "../home/Navbar";
import ProfileInfo from "./ProfileInfo";
import UserAds from "./UserAds";
import UserQueries from "./UserQueries";
import { getPersonInfo } from "../../scripts/util";

export default function Profile() {
  const personInfo = getPersonInfo();

  const navigate = useNavigate();

  React.useEffect(() => {
    if (personInfo === null) {
      navigate("/login");
    }
  });

  return (
    <div className="profile-container">
      <Navbar getPersonInfo={getPersonInfo}></Navbar>
      <div className="profile-elements">
        <ProfileInfo key="profileInfo"></ProfileInfo>
        <UserAds key="userAds"></UserAds>
        <UserQueries key="userQueries"></UserQueries>
      </div>
    </div>
  );
}
