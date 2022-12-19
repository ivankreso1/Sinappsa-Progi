import React from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Form, Card } from "react-bootstrap";
import avatars from "../../avatars";
import "../../cssFiles/Profile.css";
import Navbar from "../home/Navbar";
import ProfileInfo from './ProfileInfo'
import UserAds from './UserAds'
import { getPersonInfo } from "../../scripts/util";

export default function Profile() {

    const navigate = useNavigate()

    function goToEdit() {
      navigate("/editProfile")
    }

    

    const personInfo = JSON.parse(localStorage.getItem("personInfo"))
    console.log(personInfo)
    return (
        <div className="profile-container">
            <Navbar getPersonInfo={getPersonInfo}></Navbar>
            <ProfileInfo key="profileInfo"></ProfileInfo>
            <UserAds key="userAds"></UserAds>
        </div>
    )
}