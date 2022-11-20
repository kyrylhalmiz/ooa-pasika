import Joi from "joi-browser";
import React from 'react';
import { toast } from "react-toastify";
import authService from "../../services/authService";
import logger from "../../services/logService";
import userService from "../../services/userService";
import Logout from "../auth/logout";
import Form from "../shared/form";
import ScrollToTop from "../shared/scrollToTop";

class SettingsForm extends Form {
    state = {
        initState: null,
        username: null,
        data: {
            avatar: null,
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            dateOfBirth: '2000-01-01',
            password: ''
        },
        errors: {},
        showMessages: {}
    };

    schema = {
        firstName: Joi.string().regex(/^[a-zA-Z]*$/).max(20).required().label('First Name').options({
            language: { string: { regex: { base: 'can contain only letters' } } }
        }),
        lastName: Joi.string().regex(/^[a-zA-Z]*$/).max(20).required().label('Last Name').options({
            language: { string: { regex: { base: 'can contain only letters' } } }
        }),
        email: Joi.string().email().required().label('Email'),
        phone: Joi.string().regex(/^\+(?:[0-9] ?){6,14}[0-9]$/).required().label('Phone Number').options({
            language: { string: { regex: { base: 'should be a valid phone number' } } }
        }),
        dateOfBirth: Joi.date().allow(null),
        password: Joi.string().min(8).max(30).label('New Password'),
        avatar: Joi.any()
    };

    async populateInfo() {
        const { user_name: username } = authService.getCurrentUser();
        this.setState({ username });

        const { data: account } = await userService.getCurrentAccount();
        let { firstName, lastName, email, phoneNumber: phone, dateOfBirth, avatar } = account;
        const data = { firstName, lastName, email, phone, dateOfBirth, avatar };
        this.setState({ data, initState: { ...data } });
    }

    async componentDidMount() {
        await this.populateInfo();
    }

    doSubmit = async () => {
        try {
            const { data: user, username } = this.state;
            console.log(user);
            await userService.updateInfo(user);
            window.location = `/profile/${ username }`;
        } catch (ex) {
            logger.error(ex);
            if (ex.response)
                toast.error(ex.response.data.message.toString());
            else
                toast.error(ex.toString());
        }
    };

    discardChanges = (e) => {
        e.preventDefault();
        const initState = { ...this.state.initState };
        this.setState({ data: initState, errors: {}, showMessages: {} });
    };

    render() {
        const { avatar } = this.state.data;

        return (
            <div className="d-flex justify-content-center" style={ { marginTop: 65 } }>
                <ScrollToTop/>
                <div className="row profile">
                    <div className="avatar-section">
                        <div className="d-flex justify-content-center">
                            { !avatar && <div className="empty-avatar d-flex justify-content-center"/> }
                            { avatar && <img src={ this.state.data.avatar } alt="avatar uploaded" className="avatar"/> }
                        </div>
                        { super.renderImageInput("avatar", "Change Photo", "link") }
                    </div>
                    <div className="info-section">
                        <form onSubmit={ this.handleSubmit }>
                            <div className="mt-30 mb-3">
                                <label style={ { fontWeight: "bold", fontSize: 48 } }>{ this.state.username }</label>
                            </div>
                            { super.renderInput("firstName", "First Name", "enter first name...") }
                            { super.renderInput("lastName", "Last Name", "enter last name...") }
                            { super.renderInput("email", "Email", "enter email...") }
                            <div className="mt-30">
                                <label className="settings-label">Phone Number</label>
                                { super.renderInput("phone", "Phone Number", "enter phone number...") }
                            </div>
                            <div className="mt-30">
                                <label className="settings-label">Date of Birth</label>
                                { super.renderInput("dateOfBirth", "Date of Birth", "enter date of birth...",
                                    "date", true, { min: "1950-01-01", max: "2004-01-01" }) }
                            </div>
                            <div className="mt-30">
                                <label className="settings-label">Create Password</label>
                                { super.renderInput("password", "Create Password", "enter new password...", "password") }
                            </div>
                            <div className="mt-50">
                                { super.renderButton("Save Changes", "btn btn-primary profile-button") }
                                <div className="w-100 text-center mt-10">
                                    <button className="no-button link gray-link" onClick={ this.discardChanges }>
                                        Discard changes
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div style={ { marginTop: 40, marginBottom: 60 } }>
                            <Logout classes="no-button link red-link">Log Out</Logout>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default SettingsForm;
