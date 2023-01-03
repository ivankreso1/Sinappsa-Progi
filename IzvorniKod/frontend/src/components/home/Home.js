import React, { Component } from 'react';
import Filter from "./Filter";
import AdList from "../shared/AdList";
import RankList from "./RankList";
import Navbar from "./Navbar";
import AddCourse from "./AddCourse";
import CreateAd from "./CreateAd";
import "../../cssFiles/home/home.css";
import "../../cssFiles/shared/shared.css";
import { getPersonInfo } from '../../scripts/util';

class Home extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      ads: []
    }
  }

  handleFilter = (ads) => {
    this.setState({ ads: ads });
  }

  handleAdDelete = (ad) => {
    console.log("On  ad  delete");
    this.setState({ ads: this.state.ads.filter(ad_ => ad_.id !== ad.id)});
  }

  mapAds = (ads) => {
    return ads.map((ad) => Object({ oglas: ad, listaUpita: [] }));
  }

  render() { 
    return (
      <div className="home-page">
        <Navbar getPersonInfo={getPersonInfo}></Navbar>
        <div className="body-wrapper">
          <div className="body-wrapper-child child1">
            <Filter
              key="filter"
              onFilter={(ads) => this.handleFilter(ads)}
            />
            <AdList key="adList" data={this.mapAds(this.state.ads)} forProfile={false} onAdDelete={this.handleAdDelete}/>
          </div>
          <div className="body-wrapper-child">
            {getPersonInfo().isModerator ? <AddCourse /> : <CreateAd />}
            <RankList key="rankList" />
          </div>
        </div>
      </div>
    );
  }
}
 
export default Home;
