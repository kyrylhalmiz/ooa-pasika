import Joi from "joi-browser";
import React from 'react';
import Form from "../shared/form";

class ApartmentsFilter extends Form {
    state = {
        data: {
            price: '111'
        },
        errors: {},
        showMessages: {}
    };

    schema = {
        price: Joi.string()
    };

    componentDidMount() {
        document.body.style.backgroundColor = '#f8f9fa';
    }

    componentWillUnmount() {
        document.body.style.backgroundColor = "white";
    }

    doSubmit = async () => {
        console.log('submitted');
        this.props.afterSubmit();
    };

    render() {
        return (
            <form className="bg-light" onSubmit={ this.handleSubmit }>
                <h1>Filters</h1>
                { super.renderButton("Find Properties", "btn btn-primary filter-button full-width fixed-bottom") }
            </form>
        );
    }
}

export default ApartmentsFilter;
