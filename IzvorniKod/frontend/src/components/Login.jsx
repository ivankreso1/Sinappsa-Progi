import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Card, ButtonGroup } from "react-bootstrap";
import { postData, getPersonInfo, login as loginUser } from "../scripts/util";
import "../cssFiles/login.css";
import Navbar from "./home/Navbar";

export default function Login() {
	let personInfo = getPersonInfo();

	const [info, setInfo] = useState({
		userName: "",
		password: "",
	});

	const [error, setError] = useState("");
	const navigate = useNavigate();

	React.useEffect(() => {
		if (personInfo !== null && personInfo.userName.length !== 0) {
			navigate("/");
		}
	});

	function handleInfoChange(e) {
		if (error) setError("");
		setInfo((prevInfo) => {
			return { ...prevInfo, [e.target.name]: e.target.value };
		});
	}

	function handleSubmit(e) {
		e.preventDefault();
		const data = {
			korisnickoIme: info.userName,
			lozinka: info.password,
		};

		postData("korisnik/prijava", data).then((data) => {
			if (data.error) {
				setError(data.message);
			} else {
				loginUser(
					data.id,
					info.userName,
					info.password,
					data.moderator
				);
				navigate("/");
			}
		});
	}

	return (
		<div>
			<Navbar />

			<div className="container">
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
					<h1> Prijava </h1>
					<Form className="form" onSubmit={handleSubmit}>
						<Form.Group className="info-input">
							<Form.Control
								type="text"
								placeholder="Korisničko ime"
								name="userName"
								value={info.userName}
								required
								onChange={handleInfoChange}
							></Form.Control>
						</Form.Group>
						<Form.Group className="info-input">
							<Form.Control
								type="password"
								placeholder="Lozinka"
								name="password"
								required
								value={info.password}
								onChange={handleInfoChange}
							></Form.Control>
						</Form.Group>
						<ButtonGroup className="mb-3 d-flex ">
							<Button variant="danger" href="/">
								Odustani
							</Button>
							<Button
								type="submit"
								disabled={
									!info.userName || !info.password
										? true
										: false
								}
							>
								Prijavi se
							</Button>
						</ButtonGroup>
					</Form>
					<div className="register-link">
						Nemaš korisnički račun?{" "}
						<a href="/register">Registriraj se ovdje</a>
					</div>
					<div className="error-message">{error}</div>
				</Card>
			</div>
		</div>
	);
}
