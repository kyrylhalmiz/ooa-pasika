import React, { Component } from 'react';
import { toast } from "react-toastify";
import apartmentService from "../../services/apartmentService";
import logger from "../../services/logService";
import userService from "../../services/userService";
import Apartment from "../apartments/apartment";
import ScrollToTop from "../shared/scrollToTop";

class Profile extends Component {
    state = {
        avatar: null,
        initials: null,
        firstName: null,
        lastName: null,
        email: null,
        phoneNumber: null,
        apartments: []
    };

    populateInfo = async () => {
        const { username } = this.props.match.params;
        const { data } = await userService.getByUsername(username);
        const initials = (data.firstName[0] + data.lastName[0]).toUpperCase();
        this.setState({
            initials,
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            email: data.email,
            avatar: data.avatar
        });
    };

    populateProperties = async () => {
        const { username } = this.props.match.params;
        const { data: apartments } = await apartmentService.getByUsername(username);
        this.setState({ apartments });
    };

    async componentDidMount() {
        try {
            await this.populateInfo();
            await this.populateProperties();
        } catch (ex) {
            logger.error(ex);
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data.message.toString());
                window.location = '/not-found';
            } else
                toast.error(ex.message.toString());
        }
    }

    render() {
        const { avatar, email, initials, firstName, lastName, phoneNumber, apartments } = this.state;
        const showProperties = apartments.length !== 0;

        return (
            <div className="row d-flex justify-content-center" style={ { marginTop: 65 } }>
                <ScrollToTop/>
                { !email &&
                <div className="d-flex justify-content-center" style={ { paddingTop: 300 } }>
                    <div className="loader"/>
                </div>
                }
                { email &&
                <div className="d-flex justify-content-center" style={ { width: 600 } }>
                    <div className="font-weight-bold profile-back">{ initials }</div>
                    <div className="text-center profile-info">
                        <div style={ { marginTop: 120 } }>
                            <div className="d-flex justify-content-center">
                                { !avatar && <div className="empty-avatar d-flex justify-content-center"/> }
                                { avatar &&
                                <img src={ this.state.avatar } alt="avatar uploaded" className="avatar"/> }
                            </div>
                            <div className="font-weight-bold profile-name">{ `${ firstName } ${ lastName }` }</div>
                        </div>
                        <div style={ { fontSize: 18 } }>{ email }</div>
                        <div style={ { fontSize: 14, marginTop: 5 } }>{ phoneNumber }</div>
                    </div>
                </div>
                }
                { showProperties &&
                <div style={ { width: 540 } }>
                    <div style={ { width: 370, marginTop: 100, marginBottom: 100 } }>
                        <h4 className="font-weight-bold text-center">{ firstName }'s Properties</h4>
                        { apartments.map(apartment => <Apartment id={ apartment.id }
                                                                 title={ apartment.name }
                                                                 address={ apartment.address }
                                                                 amenties={ apartment.amenities }
                                                                 beds={ apartment.beds }
                                                                 bath={ apartment.bath }
                                                                 squareMeters={ apartment.squareMeters }
                                                                 price={ apartment.price }
                                                                 photo={ apartment.photos[0] }/>)
                        }
                    </div>
                </div>
                }
            </div>
        );
    }
}

export default Profile;
