import React, { Component } from "react";
import UserTag from "../shared/UserTag";
import QueryResponse from "../grading/QueryResponse";
import { putDataAuth } from "../../scripts/util";
import GradeStudent from "../grading/GradeStudent";

class Query extends Component {
  render() {
    // console.log("Query: ");
    //console.log(this.props.query);

    return (
      <div className="oglas-container query">
        <UserTag
          key={`queryUserTag${this.props.query.autorUpita.id}`}
          user={this.props.query.autorUpita}
        />
        <p>{this.props.query.poruka}</p>
        <p>{this.props.query.stanjeUpita}</p>
        {this.props.query.stanjeUpita === "U_TIJEKU" ? (
          <QueryResponse id={this.props.query.id} />
        ) : (
          ""
        )}
        {this.props.query.stanjeUpita === "CEKA_OCJENJIVANJE" &&
        this.props.query.oglas.trazimPomoc ? (
          <GradeStudent id={this.props.query.id} />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Query;
