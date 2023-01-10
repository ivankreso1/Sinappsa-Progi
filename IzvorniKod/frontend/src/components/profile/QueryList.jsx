import React, { Component } from "react";
import Query from "./Query";

class QueryList extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<React.Fragment>
				{this.props.queries.map((query) => (
					<Query
						key={`query${this.props.queries.indexOf(query)}`}
						query={query}
						forOwnQueries={false}
					/>
				))}
			</React.Fragment>
		);
	}
}

export default QueryList;
