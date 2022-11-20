import Joi from 'joi-browser';
import React from 'react';
import { Link } from "react-router-dom";
import Form from "../shared/form";
import AuthPage from "./authPage";

class ResetPassword extends Form {
    state = {
        data: {
            email: ''
        },
        errors: {},
        showMessages: {}
    };

    schema = {
        email: Joi.string().email().required().label('Email')
    };

    doSubmit = () => {
        console.log('submitted');
        console.log(this.state.data);

    };

    render() {
        return (
            <AuthPage
                title={ "Reset Password" }
                footer={ <span>Back to <Link to={ "/signup" } className="text-purple">Log in</Link></span> }
                { ...this.props }
            >
                <form onSubmit={ this.handleSubmit }>
                    <div className="card-body" style={ { padding: 40 } }>
                        <div className="auth-label">
                            We’ll send you new password
                        </div>
                        { super.renderInput("email", "Email", "enter email...", "email") }
                    </div>
                    { super.renderButton("Send Password", "btn btn-primary auth-button") }
                </form>
            </AuthPage>
        );
    }
}

export default ResetPassword;

