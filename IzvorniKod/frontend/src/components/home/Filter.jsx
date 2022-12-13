import React, { Component } from 'react';
import { Form, Button } from "react-bootstrap";
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';


class Filter extends Component {

    render() { 
        const formInfo = this.props.formInfo;

        return (
            <div className="filter-container">
                <Form className="form-filter" onSubmit={this.props.onFormSubmit}>
                    <Form.Group className="filter-smjer-radio">Smjer:
                        <Form.Check type="radio" label="R" name="smjer" value="R" isValid={formInfo.smjer === "R" ? true : false} onClick={this.props.onChangeInfo}/>
                        <Form.Check type="radio" label="E" name="smjer" value="E" isValid={formInfo.smjer === "E" ? true : false} onClick={this.props.onChangeInfo}/>
                    </Form.Group>
                    {formInfo.smjer}
                    <DropdownButton className="filter-kolegij-dropdown" title="Kolegiji" variant={!formInfo.kolegij ? "danger" : "success"} /*onSelect={dohvatiKolegije}*/>
                        {this.props.kolegiji.map(kolegij => {
                            return <DropdownItem onClick={this.props.onDropDownClick} name="kolegij">{kolegij.ime}</DropdownItem>
                        })}
                    </DropdownButton>
                    {formInfo.kolegij}
                    <DropdownButton className="filter-kategorije-dropdown" title="Kategorije" variant={!formInfo.kategorija ? "danger" : "success"} /*onClick={menuDropDownClick}*/>
                        <DropdownItem onClick={this.props.onDropDownClick} name="kategorija">LABOS</DropdownItem>
                        <DropdownItem onClick={this.props.onDropDownClick} name="kategorija">BLIC</DropdownItem>
                        <DropdownItem onClick={this.props.onDropDownClick} name="kategorija">GRADIVO</DropdownItem>
                        <DropdownItem onClick={this.props.onDropDownClick} name="kategorija">KONTINUIRANI_ISPIT</DropdownItem>
                        <DropdownItem onClick={this.props.onDropDownClick} name="kategorija">ISPITNI_ROK</DropdownItem>
                    </DropdownButton>
                    {formInfo.kategorija}
                    <Button 
                        type="submit" 
                        className="filter-submit-button" 
                        variant={
                            !formInfo.kategorija && !formInfo.kolegij && !formInfo.smjer ? "danger" : "success"
                        } 
                        disabled={
                            !formInfo.kategorija && !formInfo.kolegij && !formInfo.smjer
                        }
                    >Filtriraj</Button>
                </Form>
            </div>
        );
    }
}
 
export default Filter;