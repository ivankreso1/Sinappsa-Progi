import React, { Component } from "react";
import avatars from "../../avatars";
import "../../cssFiles/home/oglas.css";

class UserTag extends Component {
	render() {
		return (
			<div className="oglas-korisnik-info">
				{avatars.map((avatar) => {
					if (avatar.id === this.props.user.avatar) {
						return (
							<div className="oglas-korisnik-info">
								<img
									id={avatar.id}
									src={avatar.src}
									alt="alt"
								></img>
								{this.props.user.korisnickoIme}
							</div>
						);
					} else {
						return <React.Fragment></React.Fragment>
					}
				})}
			</div>
		);
	}
}

export default UserTag;
