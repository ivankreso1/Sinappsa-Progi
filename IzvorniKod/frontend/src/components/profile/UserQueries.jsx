import React, { Component } from "react";
import { getDataAuth, getPersonInfo } from "../../scripts/util";
import Ad from "../shared/Ad"
import Query from "./Query";
import "../../cssFiles/Profile.css";
import "../../cssFiles/shared/shared.css";

class UserQueries extends Component {
	state = {
		userQueries: []
	};

	componentDidMount() {
		this.handleUserQueries()

	};

	handleUserQueries = () => {
		const personInfo = getPersonInfo();

		getDataAuth("upiti/autorUpita/" + personInfo.id).then((data) =>
			this.setState({ userQueries: data })
		);
		console.log(this.state.userQueries ? "Pun" : "Prazan");
	}

	render() {
		return (
			<React.Fragment>
				<div className="profile-section">
					<h2 className="section-title section-title-secondary-color"> Moji upiti </h2>
					{
					this.state.userQueries.map(query =>
                        	<Query 
                            	key={`query${this.state.userQueries.indexOf(query)}`} 
                            	query={query}
								enableResponse={false}
                        	/>
                    )
					}
				</div>
			</React.Fragment>
		);
	}
}

export default UserQueries;