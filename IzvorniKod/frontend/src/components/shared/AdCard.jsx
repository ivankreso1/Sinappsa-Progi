import React, { Component } from "react";
import QueryList from "../profile/QueryList";
import Ad from "./Ad";

class AdCard extends Component {
	render() {
		return (
			<React.Fragment>
				<Ad
					key={`ad${this.props.ad.id}`}
					isModerator={this.props.isModerator}
					ad={this.props.ad}
					forProfile={this.props.forProfile}
					onAdDelete={this.props.onAdDelete}
					forOwnAds={this.props.forOwnAds}
				/>
				<QueryList
					key={`queryList${this.props.ad.id}`}
					queries={this.props.queries}
				/>
			</React.Fragment>
		);
	}
}

export default AdCard;
