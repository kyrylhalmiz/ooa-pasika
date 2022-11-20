import Joi from "joi-browser";
import moment from "moment";
import React from 'react';
import { toast } from "react-toastify";
import apartmentService from "../../services/apartmentService";
import logger from "../../services/logService";
import Form from "../shared/form";

class AddApplication extends Form {
    state = {
        data: {
            price: ''
        },
        applications: [],
        errors: {},
        showMessages: {},
        showApplications: false
    };

    schema = {
        price: Joi.number()
    };

    populateApplications = async () => {
        try {
            const { data: applications } = await apartmentService.getApplications(this.props.apartmentId);
            this.setState({ applications });
        } catch (ex) {
            logger.error(ex);
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data.message.toString());
            } else
                toast.error(ex.message.toString());
        }
    };

    populatePrice = () => {
        const data = this.state.data;
        data.price = this.props.price;
        this.setState({ data });
    };

    async componentDidMount() {
        this.props.hideNavbar();
        this.props.hideFooter();
        await this.populateApplications();
        this.populatePrice();
    }

    componentWillUnmount() {
        this.props.showNavbar();
        this.props.showFooter();
    }

    formatPrice(price) {
        return price && price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    changePrice = (num) => {
        const data = this.state.data;
        data.price += num;
        this.setState({ data });
    };

    matchHighest = () => {
        const data = this.state.data;
        if (this.props.highestPrice)
            data.price = this.props.highestPrice;
        this.setState({ data });
    };

    beatHighest = () => {
        this.matchHighest();
        this.changePrice(50);
    };

    doSubmit = async () => {
        const application = { apartmentId: this.props.apartmentId, price: this.state.data.price };
        try {
            this.props.close();
            await apartmentService.addApplication(application);
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data.message.toString());
            } else
                toast.error(ex.message.toString());
        }
    };

    toggleShowApplications = () => {
        this.setState({ showApplications: !this.state.showApplications });
    };

    render() {
        const { showApplications } = this.state;

        return (
            <div className='add-apl d-flex justify-content-center'>
                <button className="close shadow-sm" onClick={ () => this.props.close() }/>

                { showApplications &&
                <div className='add-apl-card' style={ { backgroundColor: '#f2f2f2' } }>
                    <div className="add-apl-all d-flex align-items-center justify-content-between border-bottom">
                        <div className="row text-purple" style={ { cursor: "pointer" } }
                             onClick={ this.toggleShowApplications }>
                            <div className="apl-back d-inline-flex">
                                <i className="arrow-back" style={ { marginLeft: 20, marginTop: 16 } }/>
                            </div>
                            <div className="d-flex align-items-center ml-3" style={ { fontSize: 14 } }>
                                Back To Offer
                            </div>
                        </div>
                        <div className='row'>
                            <div className="font-weight-bold border-right" style={ { paddingRight: 40 } }>
                                Your Offer
                            </div>
                            <div style={ { paddingLeft: 40 } }>
                                ${ this.formatPrice(this.state.data.price) }
                            </div>
                        </div>
                    </div>
                    <div style={ { paddingTop: 50, paddingBottom: 70, paddingLeft: 80, paddingRight: 80 } }>
                        <div className="text-center font-weight-bold" style={ { fontSize: 24 } }>All Applications</div>
                        <div className="text-gray text-center">Hurry up and submit your application.</div>
                        <div style={ { marginTop: 50, marginLeft: 15 } }>
                            <div className="row text-gray" style={ { fontSize: 14 } }>
                                <div className="text-center" style={ { width: 150 } }/>
                                <div className="text-center" style={ { width: 170 } }>Name</div>
                                <div className="text-center" style={ { width: 170 } }>Date</div>
                                <div className="text-center" style={ { width: 150 } }>Rent Offer</div>
                            </div>

                            { this.state.applications
                                .sort((a, b) => (new Date(a.creationDate)).getTime() > (new Date(b.creationDate)) ? -1 : 1)
                                .map((a, indx) => {
                                    return (
                                        <div className="row apl-item">
                                            <div
                                                className="d-flex justify-content-center align-items-center font-weight-bold"
                                                style={ { width: 150, backgroundColor: '#e9eaef' } }>
                                                Application #{ indx + 1 }</div>
                                            <div className="d-flex justify-content-center align-items-center"
                                                 style={ { width: 170 } }>{ a.owner }
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center"
                                                 style={ { width: 170 } }>{ moment(a.creationDate).format("MMMM DD") }
                                            </div>
                                            <div
                                                className="d-flex justify-content-center align-items-center font-weight-bold"
                                                style={ { width: 145 } }>${ this.formatPrice(a.price) }
                                            </div>
                                            { a.price === this.props.highestPrice &&
                                            <div style={ { width: 5, backgroundColor: "#f7a31d" } }/> }
                                        </div>
                                    );
                                }) }
                        </div>
                    </div>
                </div> }

                { !showApplications &&
                <div className='add-apl-card'>
                    <div className="add-apl-title d-flex justify-content-center align-items-center">
                        <span>Your Offer</span>
                    </div>
                    <div className="row" style={ { height: 390 } }>
                        <div className="col text-center"
                             style={ {
                                 height: 310,
                                 margin: 40,
                                 padding: 0,
                                 backgroundColor: '#f6f6f6',
                                 borderRadius: 6
                             } }>
                            <div className="my-4 font-weight-bold">
                                <div className="" style={ { fontSize: 70, lineHeight: '70px' } }>
                                    { this.state.applications.length }
                                </div>
                                <div className="text-gray" style={ { fontSize: 22 } }>Applications</div>
                            </div>
                            <div className="row mt-3" style={ { height: 80, margin: 20 } }>
                                <div className="col">
                                    <div className="text-gray">Asking Price</div>
                                    <div style={ { fontSize: 26, fontWeight: 'bold' } }>
                                        ${ this.formatPrice(this.props.price) }
                                    </div>
                                </div>
                                { this.props.highestPrice && <div className="col">
                                    <div className="text-gray">Highest Offer</div>
                                    <div style={ { fontSize: 26, fontWeight: 'bold' } }>
                                        ${ this.formatPrice(this.props.highestPrice) }
                                    </div>
                                </div> }
                            </div>
                            <button className="btn btn-primary auth-button green-button"
                                    disabled={ !this.state.applications.length }
                                    onClick={ this.toggleShowApplications }>
                                See All Applications
                            </button>
                        </div>

                        <div className="col d-flex justify-content-center align-items-center text-center">
                            <div style={ { width: 240, height: 100, marginRight: 60, marginBottom: 20 } }>
                                <div className="mb-2">choose your price</div>
                                <div className="row"
                                     style={ { border: '2px solid #6446b4', height: 50, borderRadius: '200px' } }>
                                    <div className="col-3 text-purple"
                                         style={ { fontSize: 28, padding: 0, cursor: "pointer" } }
                                         onClick={ () => this.changePrice(-25) }>-
                                    </div>
                                    <input id="price" name="price" type="number"
                                           className="col d-inline-flex add-apl-input"
                                           value={ this.state.data.price }
                                           onChange={ this.handleChange }/>
                                    <div className="col-3 text-purple"
                                         style={ { fontSize: 28, padding: 0, cursor: "pointer" } }
                                         onClick={ () => this.changePrice(25) }>+
                                    </div>
                                </div>
                                <div className="row mt-2" style={ { fontSize: 15 } }>
                                    <div className="col" style={ { cursor: "pointer" } }>
                                        <button className="no-button link" onClick={ this.matchHighest }>
                                            Match Highest
                                        </button>
                                    </div>
                                    <div className="col" style={ { cursor: "pointer" } }>
                                        <button className="no-button link" onClick={ this.beatHighest }>
                                            Beat Highest
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <form onSubmit={ this.doSubmit }>
                        <button type="submit"
                                className="btn btn-primary auth-button"
                                disabled={ this.state.applications.length && this.validate() }>
                            Apply
                        </button>
                    </form>
                </div> }
            </div>
        );
    }
}

export default AddApplication;
