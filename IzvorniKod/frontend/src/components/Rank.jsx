import React, { Component } from 'react';


class Rank extends Component {

    render() { 
        return (
            <span>
                <h3>{this.props.user.korisnickoIme}</h3>
                <p>{this.props.user.prosjek}</p>
            </span>
        );
    }
}
 

export default Rank;