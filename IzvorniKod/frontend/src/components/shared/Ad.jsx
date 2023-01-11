import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import CreateQuery from "../home/CreateQuery";
import "../../cssFiles/home/oglas.css";
import UserTag from "./UserTag";
import DeleteAd from "../home/DeleteAd";
import { getCategoryFromEnumValue, putDataAuth, getPersonInfo } from "../../scripts/util";
import EditActiveAd from "../profile/EditActiveAd";
import DeleteActiveAd from "../profile/DeleteActiveAd";

class Ad extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	handleActivityChange = () => {
		const ad = this.props.ad;
		console.log(ad.aktivan);
		putDataAuth("oglasi/" + ad.id + "/promijeniAktivnost").then((data) => {
			if (data.error) {
				alert(data.error.message);
			} else {
				window.location.reload();
			}
		});
	};

	render() {
		const ad = this.props.ad;
		const personInfo = getPersonInfo();

		return (
			<div className="card mb-3">
				<div className="oglas-korisnik-info-container">
					<div>
						<UserTag
							key={`userTag${ad.kreator.id}`}
							user={ad.kreator}
						/>
						<div className="oglas-info-container">
							<div className="oglas-naslov">
								<h2>{ad.naslov}</h2>
							</div>
							<div className="oglas-text-opis">{ad.opis}</div>
						</div>
					</div>

					<div
						className="container"
						style={{
							borderLeft: "1px solid gray",
							height: "100%",
							paddingLeft: "5%",
						}}
					>
						<div className="row d-flex align-content-between h-100">
							<div>
								<p
									style={{
										fontSize: "20px",
										fontWeight: "600",
									}}
								>
									{ad.kolegij.ime}
								</p>
								<p style={{ color: "gray", fontSize: "20px" }}>
									{ad.trazimPomoc
										? "Tražim pomoć"
										: "Nudim pomoć"}
								</p>
								<p style={{ color: "gray", fontSize: "20px" }}>
									{getCategoryFromEnumValue(ad.kategorija)}
								</p>
							</div>
							<div>
								{this.props.forProfile ? (
									this.props.ad.aktivan &&
									this.props.ad.kreator.id ===
										personInfo.id ? (
										<EditActiveAd props={this.props} />
									) : (
										""
									)
								) : (
									""
								)}
							</div>
							<div>
								{this.props.forProfile ? (
									this.props.ad.aktivan &&
									this.props.ad.kreator.id ===
										personInfo.id ? (
										<DeleteActiveAd props={this.props} />
									) : (
										""
									)
								) : (
									""
								)}
							</div>
							<div>
								{this.props.isModerator ? (
									<DeleteAd props={this.props}></DeleteAd>
								) : this.props.forProfile ? (
									this.props.forOwnAds ? (
										<Button
											variant="secondary"
											onClick={this.handleActivityChange}
										>
											{" "}
											Promijeni aktivnost oglasa{" "}
										</Button>
									) : (
										""
									)
								) : (
									<CreateQuery props={this.props} />
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Ad;
