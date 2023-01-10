import React, { useState } from "react";
import { Button, Form, Card, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { postData, getPersonInfo } from "../scripts/util";
import avatars from "../avatars";
import Navbar from "./home/Navbar";

export default function Register() {
	let personInfo = getPersonInfo();

	const [registerInfo, setRegisterInfo] = useState({
		ime: "",
		prezime: "",
		korisnickoIme: "",
		email: "",
		avatar: "",
		lozinka: "",
	});

	const navigate = useNavigate();
	const [error, setError] = useState("");
	const [chosenAvatar, setChosenAvatar] = useState("");

	React.useEffect(() => {
		if (personInfo !== null) {
			navigate("/");
		}
	});

	function handleInfoChange(e) {
		if (error) setError("");
		setRegisterInfo((prevInfo) => {
			return { ...prevInfo, [e.target.name]: e.target.value };
		});
	}

	function handleSubmit(e) {
		e.preventDefault();

		const data = {
			korisnickoIme: registerInfo.korisnickoIme,
			email: registerInfo.email,
			ime: registerInfo.ime,
			prezime: registerInfo.prezime,
			lozinka: registerInfo.lozinka,
			avatar: registerInfo.avatar,
		};

		postData("korisnik/registracija", data).then((data) => {
			if (data.error) {
				setError(data.message);
			} else {
				alert("Uspješna registracija, provjerite mail");
				navigate("/login");
			}
		});
	}

	function handleAvatarOnclick(id) {
		setChosenAvatar(id);
		setRegisterInfo((prevInfo) => {
			return { ...prevInfo, avatar: id };
		});
	}

	return (
		<div>
			<Navbar getPersonInfo={getPersonInfo}></Navbar>

			<div className="d-flex justify-content-center m-0">
				<Card
					style={{
						boxShadow:
							"rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
						minWidth: "400px",
						maxWidth: "480px",
						display: "flex",
						alignContent: "center",
						alignItems: "center",
						borderRadius: "10px",
					}}
				>
					<h1> Registracija </h1>
					<Form className="form" onSubmit={handleSubmit}>
						<Form.Group className="info-input">
							<Form.Control
								type="text"
								placeholder="Ime"
								name="ime"
								value={registerInfo.ime}
								required
								maxLength={25}
								minLength={1}
								onChange={handleInfoChange}
							></Form.Control>
						</Form.Group>
						<Form.Group className="info-input">
							<Form.Control
								type="text"
								placeholder="Prezime"
								name="prezime"
								required
								maxLength={25}
								minLength={1}
								value={registerInfo.prezime}
								onChange={handleInfoChange}
							></Form.Control>
						</Form.Group>
						<Form.Group className="info-input">
							<Form.Control
								type="text"
								placeholder="Korisničko ime"
								name="korisnickoIme"
								value={registerInfo.korisnickoIme}
								required
								maxLength={15}
								minLength={3}
								onChange={handleInfoChange}
							></Form.Control>
						</Form.Group>
						<div className="avatar-placeholder">
							{avatars.map((avatar) => (
								<img
									key={avatar.id}
									src={avatar.src}
									alt=""
									style={{
										border:
											chosenAvatar === avatar.id
												? "7.5px solid #5495E3"
												: "2px solid black",
									}}
									onClick={() =>
										handleAvatarOnclick(avatar.id)
									}
								></img>
							))}
						</div>
						<Form.Group className="info-input">
							<Form.Control
								type="email"
								placeholder="E-mail adresa"
								name="email"
								required
								maxLength={25}
								value={registerInfo.email}
								onChange={handleInfoChange}
							></Form.Control>
						</Form.Group>
						<Form.Group className="info-input">
							<Form.Control
								type="password"
								placeholder="Lozinka"
								name="lozinka"
								required
								maxLength={25}
								minLength={5}
								value={registerInfo.lozinka}
								onChange={handleInfoChange}
							></Form.Control>
						</Form.Group>
						<ButtonGroup className="mb-3 d-flex ">
							<Button
								style={{
									marginBottom: "10px",
								}}
								variant="danger"
								href="/login"
							>
								Odustani
							</Button>
							<Button
								style={{
									marginBottom: "10px",
								}}
								type="submit"
								disabled={
									!registerInfo.ime ||
									!registerInfo.prezime ||
									!registerInfo.korisnickoIme ||
									!registerInfo.avatar ||
									!registerInfo.lozinka ||
									!registerInfo.email
										? true
										: false
								}
							>
								Registriraj se
							</Button>
						</ButtonGroup>
					</Form>
					<div className="error-message">{error}</div>
				</Card>
			</div>
		</div>
	);
}
