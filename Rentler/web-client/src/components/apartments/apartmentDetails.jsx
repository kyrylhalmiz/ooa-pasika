import moment from "moment";
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import apartmentService from "../../services/apartmentService";
import logger from "../../services/logService";
import userService from "../../services/userService";
import ScrollToTop from "../shared/scrollToTop";
import AddApplication from "./addApplication";

class ApartmentDetails extends Component {
    state = {
        apartment: {},
        addressStr: '',
        user: {},
        showApplication: false
    };

    async populateApartment() {
        try {
            const { data: apartment } = await apartmentService.getById(this.props.match.params.id);
            const address = apartment.address;
            const addressStr = `${ address.houseNumber } ${ address.street }, ${ address.city }`;
            this.setState({ apartment, addressStr });
        } catch (ex) {
            logger.error(ex);
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data.message.toString());
                window.location = '/not-found';
            } else
                toast.error(ex.message.toString());
        }
    }

    async populateUserInfo(owner) {
        const { data } = await userService.getByUsername(owner);
        this.setState({ user: data });
    }

    async componentDidMount() {
        await this.populateApartment();
        await this.populateUserInfo(this.state.apartment.owner);
    }

    getAvailableLabel() {
        const { availableFrom } = this.state.apartment;
        if (new Date(availableFrom) < new Date())
            return <span className="available-from">Available: <b>Right Now</b></span>;
        return <span className="available-from">
            Available From: <b>{ moment(availableFrom).format("MMMM DD") }</b>
        </span>;
    }

    togglePopup = () => {
        this.setState({
            showApplication: !this.state.showApplication
        });
    };

    formatPrice(price) {
        return price && price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    getAmenities() {
        const { amenities } = this.state.apartment;
        return amenities ? amenities.map(
            (a, indx) => {
                return (
                    <React.Fragment>
                        <div className="col" style={ { fontSize: 14, height: 40, fontWeight: 500 } }>
                            <div className="amenitie d-inline-flex"/>
                            { a }
                        </div>
                        { indx % 2 === 1 ? <div className="w-100"/> : '' }
                    </React.Fragment>);
            }) : '';
    }

    getPetsPolicy() {
        const { petPolicy } = this.state.apartment;
        let classes = '';
        switch (petPolicy) {
            case 'Dogs Allowed':
                classes = 'dogs-icon-white d-inline-flex';
                break;
            case 'Cats Allowed':
                classes = 'cats-icon-white d-inline-flex';
                break;
            case 'No Pets':
                classes = 'no-pets-icon-white d-inline-flex';
                break;
            default:
                return '';
        }
        return (
            <React.Fragment>
                <div className={ classes + " d-inline-flex" }/>
                <span><b>{ petPolicy }</b></span>
            </React.Fragment>);
    }

    render() {
        const {
            name, type, beds, bath, squareMeters, price, description, owner, photos, amenities, highestPrice
        } = this.state.apartment;

        const { firstName, lastName, phoneNumber, avatar } = this.state.user;
        const { addressStr } = this.state;
        let mt = 100;
        if (photos && photos.length !== 0) {
            mt = 50;
        }
        let amHeight = 237;
        if (amenities)
            amHeight += 40 * Math.floor((amenities.length + 1) / 2);

        return (
            <div className="d-flex justify-content-center" style={ { marginTop: 60 } }>
                <ScrollToTop/>
                { this.state.showApplication &&
                <AddApplication
                    { ...this.props }
                    apartmentId={ this.props.match.params.id }
                    price={ price }
                    highestPrice={ highestPrice }
                    close={ this.togglePopup }
                />
                }
                { !this.state.showApplication &&
                <div style={ { width: 940 } }>
                    <div className={ !(photos && photos[0]) ? "apt-det-back" : "apt-add-back" }>
                        { photos && photos[0] && <img src={ photos[0] } className="apt-photo-back"/> }
                    </div>
                    <div className="d-flex justify-content-between" style={ { marginTop: 105 } }>
                        <span className="apt-badge">{ type }</span>
                        <span className="apt-badge">{ addressStr }</span>
                    </div>
                    <div className="row" style={ { marginLeft: 0, marginRight: 0 } }>
                        <div className="" style={ { width: 700, paddingLeft: 10, paddingRight: 10 } }>
                            <div className="d-flex align-items-center" style={ { height: 300 } }>
                                <div style={ {
                                    fontSize: 72,
                                    lineHeight: '72px',
                                    fontWeight: "bold",
                                    color: "white"
                                } }>
                                    { name }
                                </div>
                            </div>
                            <div style={ { height: 80, color: "white" } }>
                                <div className="d-flex align-items-center">
                                    <div className="beds-icon-white d-inline-flex"/>
                                    <span>Bed: <b>{ beds }</b></span>
                                    <div className="bath-icon-white d-inline-flex"/>
                                    <span>Bath: <b>{ bath }</b></span>
                                    <div className="sqft-icon-white d-inline-flex"/>
                                    <span>Sq Ft: <b>{ squareMeters }</b></span>
                                    { this.getPetsPolicy() }
                                </div>
                            </div>
                            <div className="row">
                                { photos && photos.map(p => {
                                    if (p) {
                                        return (
                                            <div className="add-photo">
                                                <img src={ p } className="apt-photo"/>
                                            </div>);
                                    } else return '';
                                }) }
                            </div>
                            <div style={ { marginTop: mt, marginBottom: 100 } }>
                                <div className="apt-h">{ type } Description</div>
                                <div style={ { fontSize: 20 } }>{ description }</div>
                            </div>
                            <div id="amenities" className="amenities">
                                <div className="amenities-back" style={ { height: amHeight } }/>
                                <div style={ { paddingTop: 70, paddingBottom: 70 } }>
                                    <div className="apt-h">Amenities
                                    </div>
                                    <div className="row">
                                        { this.getAmenities() }
                                    </div>
                                </div>
                            </div>
                            <div className="row" style={ { marginTop: 50, marginBottom: 50 } }>
                                <div className="col font-weight-bold" style={ { fontSize: 24, height: 55 } }>
                                    Contact Information
                                </div>
                                { avatar ?
                                    <div className="col-2 d-flex flex-row-reverse">
                                        <img className="apt-avatar" src={ avatar }/>
                                    </div> :
                                    <div className="col-2 apt-avatar-empty"/> }
                                <div className="col" style={ { marginLeft: 10 } }>
                                    <div className="row">
                                        <Link to={ "/profile/" + owner }
                                              className="no-button link black-link">{ firstName } { lastName }</Link>
                                    </div>
                                    <div className="row" style={ { color: '#9c99b6' } }>{ phoneNumber }</div>
                                </div>
                            </div>
                        </div>
                        <div style={ { width: 240, paddingLeft: 10, paddingRight: 10 } }>
                            <div className="apt-det-card text-center">
                                <div className="d-flex align-items-center border-bottom"
                                     style={ { height: 45 } }>
                                    <div className="save">
                                        <span style={ { fontSize: 20 } }>&#9825; </span>
                                        <span style={ { fontSize: 19, fontWeight: 300 } }>Save</span>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center"
                                     style={ { height: 105, paddingTop: 25, paddingBottom: 0 } }>
                                    <div className="w-100">
                                        <div className="w-100" style={ { color: '#9c99b6', fontSize: 16 } }>price</div>
                                        <div className="w-100 font-weight-bold"
                                             style={ { fontSize: 28 } }>${ this.formatPrice(price) }</div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center" style={ { paddingBottom: 20 } }>
                                    { highestPrice && <div className="w-100 text-gray">highest offer:
                                        ${ this.formatPrice(highestPrice) }</div> }
                                </div>
                                <div className="d-flex align-items-center"
                                     style={ { height: 40, backgroundColor: '#f4f5f7' } }>
                                    { this.getAvailableLabel() }
                                </div>
                                <div style={ { height: 60 } }>
                                    <button className="no-button green-button apply-button"
                                            onClick={ this.togglePopup }>
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
        );
    }
}

export default ApartmentDetails;
