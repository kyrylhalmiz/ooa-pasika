import React, { Component } from 'react';
import ApartmentsFilter from "./apartmentsFilter";
import ApartmentsList from "./apartmentsList";

class Apartments extends Component {
    state = {
        showFilter: false
    };

    componentDidMount() {
        this.props.hideFooter();
    }

    componentWillUnmount() {
        this.props.showFooter();
    }

    handleFilterClick = () => {
        const { showFilter } = this.state;
        this.setState({ showFilter: !showFilter });
    };

    render() {
        const { showFilter } = this.state;
        return (
            <div>
                <div className="bg-light border-bottom filter-bar row d-flex justify-content-between align-items-center"
                     style={ { height: 50 } }>
                    <div className="d-flex align-items-center">
                        <button className="filter-icon no-button" onClick={ this.handleFilterClick }/>
                        <button className="no-button text-purple" onClick={ this.handleFilterClick }>
                            Lviv, Galutskiy
                        </button>
                    </div>
                    <div style={ { marginRight: 50 } } className="dropdown">
                        { showFilter &&
                        <div className="d-flex align-items-center" style={ { marginRight: 28 } }>
                            <button className="hide-filter-icon no-button" onClick={ this.handleFilterClick }/>
                            <button className="no-button text-purple"
                                    style={ { padding: 0 } }
                                    onClick={ this.handleFilterClick }>
                                Hide Filters
                            </button>
                        </div>
                        }
                        { !showFilter &&
                        <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Best Match
                        </button> }
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                    </div>
                </div>
                <div style={ { marginTop: 50 } }>
                    { showFilter && <ApartmentsFilter afterSubmit={ this.handleFilterClick }/> }
                    { !showFilter && <ApartmentsList/> }
                </div>
            </div>
        );
    }
}

export default Apartments;
