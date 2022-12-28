import React, { Component } from "react";
import AdCard from "./AdCard";
import { getPersonInfo } from "../../scripts/util";


class AdList extends Component {

  constructor(props) {
    super(props);

    this.state = {};
    //console.log(props)
    console.log(getPersonInfo())
    //console.log(this.props.ad.kreator)
    this.isModerator = getPersonInfo().isModerator ? true : false
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
              isModerator = {this.isModerator}
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
