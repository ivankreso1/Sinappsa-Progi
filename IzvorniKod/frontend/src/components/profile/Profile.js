import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Card } from "react-bootstrap";
import avatars from "../../avatars";
import "../../cssFiles/Profile.css";
import Navbar from "../home/Navbar";
import ProfileInfo from "./ProfileInfo";
import UserAds from "./UserAds";
import { getPersonInfo } from "../../scripts/util";

export default function Profile() {
  const personInfo = JSON.parse(localStorage.getItem("personInfo"));

  const navigate = useNavigate();

  function goToEdit() {
    navigate("/editProfile");
  }

  React.useEffect(() => {
    if (personInfo.userName.length === 0) {
      navigate("/login"); // za onemogucavanje neulogiranog odlaska na /editProfile
    }
  }, []);

  console.log(personInfo);
  return (
    <div className="profile-container">
        <Navbar getPersonInfo={getPersonInfo}></Navbar>
        <div className="profile-elements">
            <ProfileInfo key="profileInfo"></ProfileInfo>
            <UserAds key="userAds"></UserAds>
        </div>
    </div>
  );
}
