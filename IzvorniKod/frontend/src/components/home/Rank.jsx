import React, { Component } from "react";
import "../../cssFiles/home/rank.css";
import UserTag from "../shared/UserTag";
import "bootstrap";

class Rank extends Component {
	render() {
		return (
			<div className="card d-flex mb-1">
				<div className="d-flex" style={{ scale: "84%" }}>
					<h5 className="rank-mark my-auto mx-3">
						<i> #{this.props.rank}</i>
					</h5>
					<UserTag user={this.props.user} />
				</div>
				<div>
					<h6 className="text-end mx-3">
						<i>
							Prosjek: <b>{this.props.user.prosjek.toFixed(2)}</b>
						</i>
					</h6>
				</div>
			</div>
		);
	}
}

export default Rank;
