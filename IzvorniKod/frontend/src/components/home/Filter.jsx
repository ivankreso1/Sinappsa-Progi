import React, { Component } from 'react';
import { Form, Button } from "react-bootstrap";
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import "../../cssFiles/home/filter.css";


class Filter extends Component {
    
    state = {
        categories: [
            "LABOS", "BLIC", "GRADIVO", "KONTINUIRANI_ISPIT", "ISPITNI_ROK"
        ]
    };

    render() { 
        const formInfo = this.props.formInfo;

        return (
            <div className="filter-container">
                <Form className="form-filter" onSubmit={this.props.onFormSubmit}>
                    <div className='form-filter-item'>
                        <Form.Group className="filter-smjer-radio">Smjer:
                            <Form.Check type="radio" label="R" name="smjer" value="R" isValid={formInfo.smjer === "R" ? true : false} onClick={this.props.onFormInfo}/>
                            <Form.Check type="radio" label="E" name="smjer" value="E" isValid={formInfo.smjer === "E" ? true : false} onClick={this.props.onFormInfo}/>
                        </Form.Group>
                        {/* {formInfo.smjer === "" ? "" : <h6 className='selected-filter'>{formInfo.smjer}</h6>} */}
                    </div>
                    <div className="form-filter-item">
                        <DropdownButton title="Kolegiji" variant={!formInfo.kolegij ? "danger" : "success"} /*onSelect={dohvatiKolegije}*/>
                            {this.props.kolegiji.map(kolegij => {
                                return <DropdownItem onClick={this.props.onDropDownClick} name="kolegij">{kolegij.ime}</DropdownItem>
                            })}
                        </DropdownButton>
                        {formInfo.kolegij === "" ? "" : <h6 className='selected-filter'>{formInfo.kolegij}</h6>}
                    </div>
                    <div className="form-filter-item">
                        <DropdownButton title="Kategorije" variant={!formInfo.kategorija ? "danger" : "success"} /*onClick={menuDropDownClick}*/>
                            {this.state.categories.map(category => 
                                <DropdownItem onClick={this.props.onDropDownClick} name="kategorija">{category}</DropdownItem>                    
                            )}
                        </DropdownButton>
                        {formInfo.kategorija === "" ? "" : <h6 className='selected-filter'>{formInfo.kategorija}</h6>}
                    </div>
                    <div className="form-filter-item">
                        <Button 
                            type="submit" 
                            variant={
                                !formInfo.kategorija && !formInfo.kolegij && !formInfo.smjer ? "danger" : "success"
                            } 
                            disabled={
                                !formInfo.kategorija && !formInfo.kolegij && !formInfo.smjer
                            }
                        >Filtriraj</Button>
                    </div>
                </Form>
            </div>
        );
    }
}
 
export default Filter;