import React, { Component } from 'react';
import { toast } from "react-toastify";
import apartmentService from "../../services/apartmentService";
import logger from "../../services/logService";
import ScrollToTop from "../shared/scrollToTop";
import Apartment from "./apartment";

class ApartmentsList extends Component {
    state = {
        apartments: [],
        showBottomLoader: false,
        pageable: {
            page: 0,
            size: 9
        }
    };

    loadApartments = async () => {
        try {
            const { page, size } = this.state.pageable;
            const { data: newApartments } = await apartmentService.getApartments(page, size);
            if (newApartments.length) {
                const apartments = [...this.state.apartments, ...newApartments];
                this.setState({ apartments, showBottomLoader: false, pageable: { page: page + 1, size } });
            } else {
                this.setState({ showBottomLoader: false });
            }
        } catch (ex) {
            logger.error(ex);
            if (ex.response)
                toast.error(ex.response.data.toString());
            else
                toast.error(ex.toString());
        }
    };

    loadMore = async () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {
            this.setState({ showBottomLoader: true });
            await this.loadApartments();
        }
    };

    async componentWillMount() {
        window.addEventListener('scroll', this.loadMore);
        await this.loadApartments();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.loadMore);
    }

    render() {
        const { apartments, showBottomLoader } = this.state;
        const showLoader = apartments.length === 0;
        return (
            <div style={ { marginTop: 130 } }>
                <ScrollToTop/>
                { showLoader &&
                <div className="d-flex justify-content-center" style={ { paddingTop: 300 } }>
                    <div className="loader"/>
                </div>
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
                               photo={ apartment.photos[0] }/>)
                }

                { showBottomLoader &&
                <div className="d-flex justify-content-center">
                    <div className="loader"/>
                </div>
                }
            </div>
        );
    }
}

export default ApartmentsList;
