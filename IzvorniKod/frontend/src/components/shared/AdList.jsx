import React, { Component } from "react";
import AdCard from "./AdCard";

class AdList extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    // console.log("Data: ");
    // console.log(this.props.data);

    return (  
      <React.Fragment>
        {this.props.data.length > 0
          ? this.props.data.map((dataElement) => 
            <AdCard 
              key={`adCard${this.props.data.indexOf(dataElement)}`} 
              ad={dataElement.oglas}
              queries={dataElement.listaUpita}
              forProfile={this.props.forProfile}
            />)    
          : "Nema oglasa za prikaz"}
      </React.Fragment>
    );
  }
}

export default AdList;
