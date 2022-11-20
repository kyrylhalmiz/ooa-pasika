import React, { Component } from 'react';
import { Link } from "react-router-dom";
import authService from "../../services/authService";

class Home extends Component {
    state = {};

    render() {
        const user = authService.getCurrentUser();
        return (
            <React.Fragment>
                <div className="home-back"/>
                <div className="d-flex justify-content-center">
                    <div className="home-title d-inline-flex">Renting Done Right. Finally.</div>
                </div>
                <form className="d-flex justify-content-center"
                      onSubmit={ () => this.props.history.push('/apartments') }>
                    <input className="home-input d-flex align-items-center justify-content-center"
                           placeholder="Where do you want to live?"/>
                </form>
                <div className="row" style={ { marginTop: 50 } }>
                    <div className="w-100 text-center" style={ { color: "white", fontWeight: "bold", fontSize: 20 } }>
                        <span>Market your property to millions</span>
                    </div>
                    <div className="w-100 d-flex d-inline-flex justify-content-center mt-3">
                        { user !== null ?
                            <Link to="add-apartment" className="btn btn-primary no-button home-button">List Your
                                Rental</Link>
                            :
                            <Link to="signup" className="btn btn-primary no-button home-button">List Your Rental</Link>
                        }
                    </div>
                </div>
                <div className="text-center home-title2">
                    Listing Categories
                </div>
                <div className="row text-center" style={ { marginBottom: 100, fontSize: 14 } }>
                    <div className="col-sm">
                        <div className="w-100 mb-2">
                            <Link to="/apartments" className="link no-style">Apartments for Rent</Link>
                        </div>
                        <div className="w-100">
                            <Link to="/apartments" className="link no-style">Houses for Rent</Link>
                        </div>
                    </div>
                    <div className="col-sm bor border-right border-left">
                        <div className="w-100 mb-2">
                            <Link to="/apartments" className="link no-style">Condos for Rent</Link>
                        </div>
                        <div className="w-100">
                            <Link to="/apartments" className="link no-style">Duplexes for Rent</Link>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="w-100 mb-2">
                            <Link to="/apartments" className="link no-style">Townhouses for Rent</Link>
                        </div>
                        <div className="w-100">
                            <Link to="/apartments" className="link no-style">Rooms for Rent</Link>
                        </div>
                    </div>
                </div>
                <div className="border-top d-flex justify-content-center" style={ { marginBottom: 50 } }>
                    <div className="quotes"/>
                </div>
                <div style={ { fontSize: 18, marginBottom: 100 } }>
                    <div className="w-100 text-center">Rentler is the real estate platform that offers a digital rental
                        journey.
                    </div>
                    <div className="w-100 text-center">It automates the standardrental tasks making the whole experience
                        contact-free
                    </div>
                    <div className="w-100 text-center">All can be done in one placeand with no face-to-face contact.
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Home;
