import React, { Component } from 'react';
import "../../cssFiles/home/filter.css";
import "bootstrap";
import { getCategoriesPretty, getCategoryToEnumValue, getData } from '../../scripts/util';

class Filter extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            direction: "",
            course: "",
            category: "",
            courses: [],
            categories: getCategoriesPretty()
        };
    }

    componentDidMount() {
        this.fetchCourses();
        this.fetchAds();
    }

    handleDropDownClick = (e) => {
        this.setState(
            { [e.target.name]: e.target.value },
            () => this.afterDropDownClick(),
        );
    }

    afterDropDownClick = () => {
        if (this.state.direction !== "") {
            if (!this.state.courses
                .filter(course => course.smjer === this.state.direction)
                .map(course => course.ime)
                .includes(this.state.course)) {
                this.state.course = "";
            }
        }

        this.fetchAds();
    }

    fetchAds = () => {
        getData(`oglasi/filter?smjer=${this.state.direction}&kategorija=${this.state.category}&kolegij=${this.state.course.replace(/ /g, "+")}`)
        .then(data => this.props.onFilter(data));
    }

    fetchCourses = () => {
        let path = this.state.direction === "" ? "" : `/smjer/${this.state.direction}`;

        getData(`kolegiji${path}`)
        .then(data => this.setState({ courses: data }));
    }

    render() { 
        return (
            <div className="row">
                <div className="col-lg-15 mb-3">
                    <div className="row text-left mb-2">
                        <div className="col-lg-3 mb-3 mb-sm-0">
                            <div className="dropdown bootstrap-select form-control form-control-lg bg-white bg-op-9 text-sm w-lg-50" style={{width: "100%"}}>
                                <select name="direction" className="form-control form-control-lg bg-white bg-op-9 text-sm w-lg-50" data-toggle="select" tabIndex="-98" onChange={this.handleDropDownClick}>
                                    <option key="allDirections" value="">Svi smjerovi</option>
                                    <option key="rDirection" value="R">R smjer</option>
                                    <option key="eDirection" value="E">E smjer</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-5 mb-3 mb-sm-0">
                            <div className="dropdown bootstrap-select form-control form-control-lg bg-white bg-op-9 text-sm w-lg-50" style={{width: "100%"}}>
                                <select name="course" className="form-control form-control-lg bg-white bg-op-9 text-sm w-lg-50" data-toggle="select" tabIndex="-98" onChange={this.handleDropDownClick}>
                                    <option key="allCourses" value="">Svi kolegiji</option>
                                    {this.state.courses.map(course => {
                                        if (this.state.direction === "" || course.smjer === this.state.direction)
                                            return <option key={`courseOption${course.ime}`} value={course.ime}>{course.ime}</option>
                                        return "";
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-3 mb-sm-0">
                            <div className="dropdown bootstrap-select form-control form-control-lg bg-white bg-op-9 text-sm w-lg-50" style={{width: "100%"}}>
                                <select name="category" className="form-control form-control-lg bg-white bg-op-9 text-sm w-lg-50" data-toggle="select" tabIndex="-98" onChange={this.handleDropDownClick}>
                                    <option key="allCategories" value="">Sve kategorije</option>
                                    {this.state.categories.map(category => {
                                        return <option key={`categoryOption${category}`} value={getCategoryToEnumValue(category)}>{category}</option>
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