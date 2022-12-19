import React, { Component } from "react";
import Oglas from "./Oglas";

class AdList extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        {this.props.oglasi.length > 0
          ? this.props.oglasi.map((oglas) => {
              return (
                <Oglas
                  key={this.props.oglasi.indexOf(oglas)}
                  naslov={oglas.naslov}
                  opis={oglas.opis}
                  kreator={oglas.kreator}
                  trazimPomoc={oglas.trazimPomoc}
                  kolegij={oglas.kolegij}
                  id={oglas.id}
                />
              );
            })
          : "Nema oglasa za prikaz"}
      </React.Fragment>
    );
  }
}

export default AdList;
