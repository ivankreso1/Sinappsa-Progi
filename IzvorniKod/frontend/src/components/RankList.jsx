import React, { Component } from 'react';
import Rank from './Rank';
import "../cssFiles/rank.css";
import configData from "./config.json";


class RankList extends Component {
    state = {
        rankList: []
    };

    componentDidMount() {   
        // lifecycle hook, kad se stvori komponenta (dakle mora se renderirati prvo), pozovemo handleRankList da fetcha i displaya podatke
        this.handleRankList();
    }

    handleRankList = () => {
        this.fetchData().then(data => this.setState({ rankList: data }));
    }

    fetchData = async () => {
        // TODO: Ova metoda se može izdvojiti i postati globalna za sve uz dodatne parametre poput url i method objekta -> dodati to kasnije!
        const response = await fetch(`${configData.hostname}/korisnik/rang`, { method: "GET" });

        return response.json();
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
                </div>
            </React.Fragment>
        );
    }
}


export default RankList;