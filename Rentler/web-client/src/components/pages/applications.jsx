import moment from "moment";
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import apartmentService from "../../services/apartmentService";
import logger from "../../services/logService";
import AddApplication from "../apartments/addApplication";
import ScrollToTop from "../shared/scrollToTop";

class Applications extends Component {
    state = {
        applications: [],
        showApplication: false,
        editApplicationParams: {}
    };

    populateApplications = async () => {
        try {
            const { data: applications } = await apartmentService.getApplicationsByOwner();
            this.setState({ applications });
        } catch (ex) {
            logger.error(ex);
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data.message.toString());
            } else
                toast.error(ex.message.toString());
        }
    };

    populateApartment = async () => {
        try {
            const applications = this.state.applications;
            for (let i = 0; i < applications.length; i++) {
                const { data: apartment } = await apartmentService.getById(applications[i].apartmentId);
                applications[i].name = apartment.name;
                applications[i].apartmentPrice = apartment.price;
                applications[i].highestPrice = apartment.highestPrice;
            }
            this.setState({ applications });
        } catch (ex) {
        }
    };

    async componentDidMount() {
        document.body.style.backgroundColor = '#f8f9fa';
        await this.populateApplications();
        await this.populateApartment();
    }

    componentWillUnmount() {
        document.body.style.backgroundColor = "white";
    }

    getAplStatus(apl) {
        if (apl.status === 'Rejected')
            return (<button disabled className="btn btn-outline-danger apl-btn-rejected">Rejected</button>);
        else if (apl.status === 'Approved')
            return (<button disabled className="btn btn-outline-success apl-btn-approved">Approved</button>);
        else
            return (<button disabled className="btn btn-outline-secondary apl-btn-pending">Pending</button>);
    }

    formatPrice(price) {
        return price && price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    deleteApplication = async (id) => {
        try {
            await apartmentService.deleteApplication(id);
            const applications = this.state.applications.filter(a => a.id !== id);
            this.setState({ applications });
        } catch (ex) {
            logger.error(ex);
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data.message.toString());
            } else
                toast.error(ex.message.toString());
        }
    };

    showEdit = (apl) => {
        const editApplicationParams = this.state.editApplicationParams;
        editApplicationParams.id = apl.id;
        editApplicationParams.apartmentId = apl.apartmentId;
        editApplicationParams.apartmentPrice = apl.apartmentPrice;
        editApplicationParams.highestPrice = apl.highestPrice;
        this.setState({ showApplication: true, editApplicationParams });

    };

    hideEdit = async (id) => {
        await this.deleteApplication(id);
        await this.componentDidMount();
        this.setState({ showApplication: false });
    };

    render() {
        const { applications, showApplication, editApplicationParams } = this.state;
        const showApplications = applications.length === 0;
        return (
            <div>
                <ScrollToTop/>
                { showApplication &&
                <AddApplication
                    { ...this.props }
                    apartmentId={ editApplicationParams.apartmentId }
                    price={ editApplicationParams.apartmentPrice }
                    highestPrice={ editApplicationParams.highestPrice }
                    close={ async () => {
                        await this.hideEdit(editApplicationParams.id);
                    } }
                /> }

                { showApplications &&
                <div>
                    <div className="text-center font-weight-bold"
                         style={ { marginBottom: 20, marginTop: 200, fontSize: 48 } }>
                        Nothing to See Here Yet
                    </div>
                    <div className="text-center text-gray" style={ { fontSize: 20 } }>
                        Your applications will appear here
                    </div>
                </div>
                }
                { !showApplications &&
                <div style={ { marginLeft: 130, marginRight: 130, paddingTop: 50 } }>
                    <div className="text-center my-5 font-weight-bold" style={ { fontSize: 26 } }>Your Applications
                    </div>
                    <div className="card" style={ { paddingLeft: 60, paddingRight: 60, marginBottom: 100 } }>
                        { applications
                            .sort((a, b) => (new Date(a.creationDate)).getTime() > (new Date(b.creationDate)) ? -1 : 1)
                            .map(a => {
                                return (
                                    <div className="border-bottom d-flex align-items-center" style={ { height: 100 } }>
                                        <div style={ { width: 235, height: 70 } }>
                                            <div style={ {
                                                marginTop: 15,
                                                fontWeight: 600,
                                                fontSize: 18
                                            } }>{ a.name }</div>
                                            <div style={ { fontSize: 14 } }>
                                                <Link className="link no-style" to={ `/apartments/${ a.apartmentId }` }>
                                                    Property Details
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="d-inline-flex"
                                             style={ { width: 120 } }>{ moment(a.creationDate).format("MMMM DD") }</div>
                                        <div className="d-inline-flex black-label"
                                             style={ { width: 100 } }>${ this.formatPrice(a.price) }</div>
                                        <div className="d-flex justify-content-center"
                                             style={ { width: 170 } }>
                                            { this.getAplStatus(a) }
                                        </div>
                                        <div className="apl-edit-icon" onClick={ () => this.showEdit(a) }/>
                                        <div className="apl-del-icon" onClick={ () => this.deleteApplication(a.id) }/>

                                    </div>
                                );
                            }) }
                    </div>
                </div> }
            </div>
        );
    }
}

export default Applications;
