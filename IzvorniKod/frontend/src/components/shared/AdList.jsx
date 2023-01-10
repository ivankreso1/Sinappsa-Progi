import React, { Component } from "react";
import AdCard from "./AdCard";
import { getPersonInfo } from "../../scripts/util";

class AdList extends Component {
	constructor(props) {
		super(props);

		this.isModerator = getPersonInfo()?.isModerator ? true : false;
	}

	render() {
		return (
			<React.Fragment>
				{this.props.data.length > 0
					? this.props.data.map((dataElement) => (
							<AdCard
								key={`adCard${this.props.data.indexOf(
									dataElement
								)}`}
								isModerator={this.isModerator}
								ad={dataElement.oglas}
								queries={dataElement.listaUpita}
								forProfile={this.props.forProfile}
								forOwnAds={this.props.forOwnAds}
								onAdDelete={this.props.onAdDelete}
							/>
					  ))
					: "Nema oglasa za prikaz"}
			</React.Fragment>
		);
	}
}

export default AdList;
