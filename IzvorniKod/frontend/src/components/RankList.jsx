import React, { Component } from 'react';
import Rank from './Rank';
import rankListData from "./.ranklist.json";
import "../cssFiles/rank.css";


class RankList extends Component {
    state = {
        rankList: []
    };

    handleRankList = () => {
        // fetch rang
        this.setState({ rankList: rankListData });
    }

    render() { 
        return (
            <React.Fragment>
                <h1>Rank List</h1>
                <div className="rank-list-container">
                    {this.state.rankList.length > 0 ? 
                        this.state.rankList.map(user =>
                            <Rank id={user.korisnickoIme} rank={this.state.rankList.indexOf(user) + 1} user={user} />
                        ) : 
                        <h4>Nema rangiranih studenata</h4>}
                    <button onClick={this.handleRankList}>Ažuriraj Rank Listu (temp)</button>
                </div>
            </React.Fragment>
        );
    }
}


export default RankList;