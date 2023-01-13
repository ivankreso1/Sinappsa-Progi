import { Component } from "react";
import UserTag from "../shared/UserTag";
import QueryResponse from "../grading/QueryResponse";
import GradeStudent from "../grading/GradeStudent";
import { getValueFromEnum } from "../../scripts/util";

class Query extends Component {
  render() {
    return (
      <div className="oglas-container query">
        <UserTag
          key={`queryUserTag${this.props.query.autorUpita.id}`}
          user={this.props.query.autorUpita}
        />
        <p className="text-center">{this.props.query.poruka}</p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ margin: "5%" }}>
            <i>
              <b>{getValueFromEnum(this.props.query.stanjeUpita)}</b>
            </i>
          </span>
          <span style={{ margin: "5%" }}>
            <i>
              <b>
                {this.props.query.stanjeUpita === "PRIHVACEN"
                  ? `Ocjena: ${this.props.query.ocjena}`
                  : ""}
              </b>
            </i>
          </span>
        </div>
        {this.props.query.stanjeUpita === "U_TIJEKU" &&
        !this.props.forOwnQueries &&
        this.props.query.oglas.aktivan ? (
          <QueryResponse id={this.props.query.id} />
        ) : (
          ""
        )}
        {this.props.query.stanjeUpita === "CEKA_OCJENJIVANJE" &&
        ((this.props.query.oglas.trazimPomoc && !this.props.forOwnQueries) ||
          (!this.props.query.oglas.trazimPomoc && this.props.forOwnQueries)) ? (
          <GradeStudent props={this.props} />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Query;
