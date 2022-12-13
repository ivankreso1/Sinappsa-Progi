import React, { Component } from 'react';
import Rank from './Rank';
import rankListData from "./.ranklist.json";


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
                {this.state.rankList.length > 0 ? 
                    this.state.rankList.map(user =>
                        <Rank id={user.korisnickoIme} user={user} />
                    ) : 
                    <h4>Nema rangiranih studenata</h4>}
                <button onClick={this.handleRankList}>Ažuriraj Rank Listu (temp)</button>
            </React.Fragment>
        );
    }
}


export default RankList;