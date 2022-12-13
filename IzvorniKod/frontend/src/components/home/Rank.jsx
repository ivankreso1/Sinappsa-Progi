import React, { Component } from 'react';
import "../../cssFiles/rank.css";


class Rank extends Component {

    render() { 
        return (
            <div className="rank-container">
                <h2 className="rank-item rank-mark">{this.props.rank}#</h2>
                <h3 className="rank-item">{this.props.user.korisnickoIme}</h3>
                <p className="rank-item">{this.props.user.prosjek}</p>
            </div>
        );
    }
}
 

export default Rank;