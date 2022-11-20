import moment from "moment";
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import apartmentService from "../../services/apartmentService";
import logger from "../../services/logService";
import userService from "../../services/userService";
import ScrollToTop from "../shared/scrollToTop";

class ApartmentApplications extends Component {
    state = {
        apartment: {},
        addressStr: {},
        applications: []
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

    populateApplications = async () => {
        try {
            const { data: applications } = await apartmentService.getApplications(this.props.match.params.id);
            this.setState({ applications });
        } catch (ex) {
            logger.error(ex);
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data.message.toString());
            } else
                toast.error(ex.message.toString());
        }
    };

    populateUsersInfo = async () => {
        const applications = this.state.applications;
        for (let i = 0; i < applications.length; i++) {
            try {
                const { data: user } = await userService.getByUsername(applications[i].owner);
                applications[i].user = user;
            } catch (ex) {
            }
        }
        this.setState({ applications });
    };

    async componentDidMount() {
        document.body.style.backgroundColor = '#f8f9fa';
        await this.populateApartment();
        await this.populateApplications();
        await this.populateUsersInfo();
    }

    componentWillUnmount() {
        document.body.style.backgroundColor = "white";
    }

    formatPrice(price) {
        return price && price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    updateAplStatus = async (apl, status) => {
        try {
            const application = {
                id: apl.id,
                price: apl.price,
                apartmentId: apl.apartmentId,
                status: status
            };
            await apartmentService.updateApplication(application);
            await this.populateApplications();
            await this.populateUsersInfo();
        } catch (ex) {
            logger.error(ex);
            if (ex.response.data.message) {
                toast.error(ex.response.data.message.toString());
            } else
                toast.error(ex.message.toString());
        }
    };

    getAplButtons(apl) {
        if (apl.status === 'Rejected') {
            return (<button disabled className="btn btn-outline-danger apl-btn-rejected">Rejected</button>);
        } else if (apl.status === 'Approved') {
            return (<button disabled className="btn btn-outline-success apl-btn-approved">Approved</button>);
        } else {
            return (
                <React.Fragment>
                    <button className="btn btn-outline-success apl-btn-approved"
                            onClick={ () => this.updateAplStatus(apl, 'Approved') }>Approve
                    </button>
                    <div className="d-inline-flex" style={ { width: 10 } }/>
                    <button className="btn btn-outline-danger apl-btn-rejected"
                            onClick={ () => this.updateAplStatus(apl, 'Rejected') }>Reject
                    </button>
                </React.Fragment>
            );
        }
    }

    render() {
        const { addressStr, apartment, applications } = this.state;
        return (
            <div style={ { marginTop: 60, marginLeft: 130, marginRight: 130, paddingTop: 50 } }>
                <ScrollToTop/>
                <div className="card w-100 d-flex justify-content-center"
                     style={ { height: 100, paddingLeft: 60, paddingRight: 60, fontSize: 14 } }>

                    <div className="row text-gray" style={ { fontSize: 14, marginLeft: 0 } }>
                        <div className="" style={ { width: 300 } }>
                            <div className="d-inline-flex">{ addressStr.toString() }</div>
                            <div className="d-flex">
                                <Link className="link no-style" to={ `/apartments/${ apartment.id }` }>
                                    Property Details
                                </Link>
                            </div>
                        </div>
                        <div className="d-inline-flex" style={ { width: 100 } }/>
                        <div className="" style={ { width: 150 } }>
                            <span>Original Price<br/></span>
                            <span className="black-label">${ this.formatPrice(apartment.price) }</span>
                        </div>
                        <div className="border-left" style={ { width: 150, paddingLeft: 40 } }>
                            <span>Status<br/></span>
                            <span className="black-label">Active</span>
                        </div>
                    </div>
                </div>
                <div className="text-center my-5 font-weight-bold" style={ { fontSize: 26 } }>Applications</div>
                <div className="card" style={ { paddingLeft: 60, paddingRight: 60, marginBottom: 100 } }>
                    { applications
                        .sort((a, b) => (new Date(a.creationDate)).getTime() > (new Date(b.creationDate)) ? -1 : 1)
                        .map(a => {
                            return (
                                <div className="border-bottom d-flex align-items-center" style={ { height: 100 } }>
                                    <div className="d-inline-flex" style={ { width: 300 } }>
                                        { a.user ?
                                            (<React.Fragment>
                                                { a.user.avatar ?
                                                    <div className="col-2 d-flex flex-row-reverse"
                                                         style={ { padding: 0 } }>
                                                        <img className="apt-avatar" src={ a.user.avatar }/>
                                                    </div> :
                                                    <div className="col-2 apt-avatar-empty"/> }
                                                <div className="col" style={ { marginLeft: 10 } }>
                                                    <div className="row no-button" style={ { fontWeight: 500 } }>
                                                        { a.user.firstName } { a.user.lastName }
                                                    </div>
                                                    <div className='row' style={ { fontSize: 14 } }>
                                                        <Link to={ "/profile/" + a.owner } className="no-style link">
                                                            View Profile
                                                        </Link>
                                                    </div>
                                                </div>
                                            </React.Fragment>) :
                                            (<Link to={ "/profile/" + a.owner } className="no-button link black-link">
                                                { a.owner }
                                            </Link>)
                                        }
                                    </div>
                                    <div className="d-inline-flex"
                                         style={ { width: 120 } }>{ moment(a.creationDate).format("MMMM DD") }</div>
                                    <div className="d-inline-flex black-label"
                                         style={ { width: 130 } }>${ this.formatPrice(a.price) }</div>
                                    <div className="d-flex justify-content-center"
                                         style={ { width: 170 } }>
                                        { this.getAplButtons(a) }
                                    </div>
                                </div>
                            );
                        }) }
                </div>
            </div>
        );
    }
}

export default ApartmentApplications;
