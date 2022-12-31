import React, { Component } from 'react';
// import { Form, Button } from "react-bootstrap";
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import "../../cssFiles/home/filter.css";
import "bootstrap";


class Filter extends Component {
    
    state = {
        categories: [
            "Labos", 
            "Blic", 
            "Gradivo", 
            "Kontinuirani ispit", 
            "Ispitni rok"
        ]
    };

    render() { 
        const formInfo = this.props.formInfo;

        return (
            <div className="row">
                <div className="col-lg-15 mb-3">
                    <div className="row text-left mb-2">
                        <div className="col-lg-3 mb-3 mb-sm-0">
                            <div className="dropdown bootstrap-select form-control form-control-lg bg-white bg-op-9 text-sm w-lg-50" style={{width: "100%"}}>
                                <select name="smjer" className="form-control form-control-lg bg-white bg-op-9 text-sm w-lg-50" data-toggle="select" tabindex="-98" onChange={this.props.onDropDownClick}>
                                    <option value="">Svi smjerovi</option>
                                    <option value="R">R smjer</option>
                                    <option value="E">E smjer</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-5 mb-3 mb-sm-0">
                            <div className="dropdown bootstrap-select form-control form-control-lg bg-white bg-op-9 text-sm w-lg-50" style={{width: "100%"}}>
                                <select name="kolegij" className="form-control form-control-lg bg-white bg-op-9 text-sm w-lg-50" data-toggle="select" tabindex="-98" onChange={this.props.onDropDownClick}>
                                    <option value="">Svi kolegiji</option>
                                    {this.props.kolegiji.map(kolegij => {
                                        return <option value={kolegij.ime}>{kolegij.ime}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-3 mb-sm-0">
                            <div className="dropdown bootstrap-select form-control form-control-lg bg-white bg-op-9 text-sm w-lg-50" style={{width: "100%"}}>
                                <select name="kategorija" className="form-control form-control-lg bg-white bg-op-9 text-sm w-lg-50" data-toggle="select" tabindex="-98" onChange={this.props.onDropDownClick}>
                                    <option value="">Sve kategorije</option>
                                    {this.state.categories.map(category => {
                                        return <option value={category.toUpperCase().replace(" ", "_")}>{category}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Filter;