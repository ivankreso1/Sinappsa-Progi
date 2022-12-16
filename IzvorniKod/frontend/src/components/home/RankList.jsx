import React, { Component } from 'react';
import Rank from './Rank';
import { getData } from '../../scripts/util';
import "../../cssFiles/home/rank.css";
import "../../cssFiles/shared/shared.css";


class RankList extends Component {
    state = {
        rankList: []
    };

    componentDidMount() {   
        // lifecycle hook, kad se stvori komponenta (dakle mora se renderirati prvo), pozovemo handleRankList da fetcha i displaya podatke
        this.handleRankList();
    }

    handleRankList = () => {
        getData("korisnik/rang").then(data => this.setState({ rankList: data }));
    }

    render() { 
        return (
            <React.Fragment>
                <h1 className='section-title section-title-secondary-color'>Rank List</h1>
                <div className="rank-list-container">
                    {this.state.rankList.length > 0 ? 
                        this.state.rankList.map(user =>
                            <Rank key={user.korisnickoIme} id={user.korisnickoIme} rank={this.state.rankList.indexOf(user) + 1} user={user} />
                        ) : 
                        <h4>Nema rangiranih studenata</h4>}
                </div>
            </React.Fragment>
        );
    }
}


export default RankList;