import React, { Component } from 'react';
import "../../cssFiles/home/rank.css";


class Rank extends Component {

    render() { 
        return (
            <div className="rank-container">
                <h5 className="rank-item rank-mark">{this.props.rank}#</h5>
                <h6 className="rank-item">{this.props.user.korisnickoIme}</h6>
                <h5 className="rank-item">{this.props.user.prosjek}</h5>
            </div>
        );
    }
}
 

export default Rank;