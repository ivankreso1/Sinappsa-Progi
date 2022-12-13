import React, { Component } from 'react';
import Oglas from './Oglas';


class AdList extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <h3>Oglasi</h3>
                {this.props.oglasi.length > 0 ? this.props.oglasi.map(oglas => {
                    return <Oglas naslov={oglas.naslov} opis={oglas.opis} kreator={oglas.kreator}/>
                }) : "Nema oglasa za prikaz"}
            </React.Fragment>
        );
    }
}
 
export default AdList;