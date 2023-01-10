import React, { useState } from "react";
import "../../cssFiles/home/navbar.css";
import { getPersonInfo, logout as logoutUser } from "../../scripts/util";

export default function Navbar() {
	function logout() {
		logoutUser();

		setTimeout(() => {
			setPersonInfo({
				id: "",
				userName: "",
				password: "",
			});
		}, 50);
	}

	const [personInfo, setPersonInfo] = useState(getPersonInfo());

	return (
		<div className="homepage-header">
			<div className="homepage-project-name mx-5">
				<a href="/" style={{ textDecoration: "none" }}>
					<h2>Sinappsa</h2>
				</a>
			</div>
			<div className="">
				<div className="page-links d-flex justify-content-end h-100">
					{personInfo !== null && !personInfo.isModerator ? (
						<a className="mx-0 align-self-center" href="/profile">
							Profil
						</a>
					) : (
						""
					)}
					{personInfo !== null ? (
						<a
							className="mx-5 align-self-center"
							onClick={logout}
							href="/"
						>
							Odjava
						</a>
					) : (
						<a className="mx-5 align-self-center" href="/login">
							Prijava
						</a>
					)}
				</div>
			</div>
		</div>
	);
}
