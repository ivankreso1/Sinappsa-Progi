import React from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Form, Card } from "react-bootstrap";
import avatars from "../../avatars";
import "../../cssFiles/profile.css";
import Navbar from "../home/Navbar";
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
            <Card style={
                {
                    boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                    maxWidth: "400px",
                    display: "flex",
                    alignContent: "center",
                    borderRadius: "10px"
                }
            }>
            <h1> Moj profil </h1>
            </Card>
        </div>
    )
}