import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import apartmentService from "../../services/apartmentService";
import authService from "../../services/authService";
import logger from "../../services/logService";
import ScrollToTop from "../shared/scrollToTop";
import Apartment from "./apartment";

class Properties extends Component {
    state = {
        apartments: [],
        showLoader: true
    };

    loadApartments = async () => {
        try {
            const { user_name } = authService.getCurrentUser();
            const { data: newApartments } = await apartmentService.getByUsername(user_name);
            if (newApartments.length) {
                const apartments = [...this.state.apartments, ...newApartments];
                this.setState({ apartments, showLoader: false });
            } else {
                this.setState({ showLoader: false });
            }
        } catch (ex) {
            logger.error(ex);
            if (ex.response)
                toast.error(ex.response.data.toString());
            else
                toast.error(ex.toString());
        }
    };


    async componentDidMount() {
        await this.loadApartments();
    }

    render() {
        const { apartments, showLoader } = this.state;
        return (
            <div style={ { marginTop: 80, marginBottom: 80 } }>
                <ScrollToTop/>
                { showLoader &&
                <div className="d-flex justify-content-center" style={ { paddingTop: 300 } }>
                    <div className="loader"/>
                </div>
                }
                { !showLoader &&
                <div className="text-center" style={ { fontSize: 34, fontWeight: "bold", marginBottom: 10 } }>My
                    Properties</div> }
                { !showLoader &&
                <Link className="no-style" to={ `/add-apartment` }>
                    <div className="d-inline-flex " style={ { width: 370, height: 340, padding: 10, marginRight: 0 } }>
                        <div className="card apartment-card" style={ { width: 350, height: 320 } }>
                            <div style={ { height: 200 } }>
                                <div className="plus-button">
                                    <div className="plus" style={ { paddingTop: 70, marginLeft: 20 } }/>
                                </div>
                            </div>
                            <div style={ { height: 200 } }>
                                <div className="plus-label">
                                    Add Property
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
                }
                { !showLoader &&
                apartments.map(apartment =>
                    <Apartment id={ apartment.id }
                               title={ apartment.name }
                               address={ apartment.address }
                               amenties={ apartment.amenities }
                               beds={ apartment.beds }
                               bath={ apartment.bath }
                               squareMeters={ apartment.squareMeters }
                               price={ apartment.price }
                               photo={ apartment.photos[0] }
                               applicationCount={ apartment.applicationsCount }
                               showEdit/>)
                }
            </div>
        );
    }
}

export default Properties;
