import React, { Component } from "react";
import UserTag from "../shared/UserTag";
import QueryResponse from "../grading/QueryResponse";

class Query extends Component {
  render() {
    // console.log("Query: ");
    // console.log(this.props.query);

    return (
      <div className="oglas-container query">
        <UserTag
          key={`queryUserTag${this.props.query.autorUpita.id}`}
          user={this.props.query.autorUpita}
        />
        <p>{this.props.query.poruka}</p>
        <p>{this.props.query.stanjeUpita}</p>
        <QueryResponse />
      </div>
    );
  }
}

export default Query;
