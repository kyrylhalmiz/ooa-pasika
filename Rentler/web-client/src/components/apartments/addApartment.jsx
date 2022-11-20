import Joi from "joi-browser";
import React from 'react';
import { toast } from "react-toastify";
import apartmentService from "../../services/apartmentService";
import Form from "../shared/form";
import ScrollToTop from "../shared/scrollToTop";

class AddApartment extends Form {
    state = {
        data: {
            name: '',
            street: '',
            city: '',
            houseNumber: '',
            type: '',
            beds: '',
            bath: '',
            squareMeters: '',
            description: '',
            availableFrom: new Date().toISOString().split('T')[0],
            price: ''
        },
        selectedAmenities: [],
        petPolicy: 'No Pets',
        photos: [null, null, null],
        amenities: [],
        types: [],
        errors: {},
        showMessages: {}
    };

    schema = {
        name: Joi.string(),
        street: Joi.string(),
        city: Joi.string(),
        houseNumber: Joi.string(),
        type: Joi.string(),
        beds: Joi.number(),
        bath: Joi.number(),
        squareMeters: Joi.number(),
        description: Joi.string(),
        availableFrom: Joi.date().allow(null),
        price: Joi.number()
    };

    populateAmenities = async () => {
        try {
            const { data: amenities } = await apartmentService.getAmenities();
            this.setState({ amenities });
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data.message.toString());
            } else
                toast.error(ex.message.toString());
        }
    };

    populateTypes = async () => {
        try {
            let { data: types } = await apartmentService.getTypes();
            types = types.map(t => {
                return { _id: t, name: t };
            });
            this.setState({ types });
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data.message.toString());
            } else
                toast.error(ex.message.toString());
        }
    };

    async componentDidMount() {
        await this.populateAmenities();
        await this.populateTypes();
    }

    getAmenitiesHeight() {
        const x = document.getElementById('amenities');
        return x ? x.clientHeight : 0;
    }

    onCatsClicked = () => {
        this.setState({ petPolicy: 'Cats Allowed' });
    };

    onDogsClicked = () => {
        this.setState({ petPolicy: 'Dogs Allowed' });
    };

    onNoPetsClicked = () => {
        this.setState({ petPolicy: 'No Pets' });
    };

    onAmenityClick = (amenity) => {
        const selectedAmenities = this.state.selectedAmenities;
        if (selectedAmenities.includes(amenity)) {
            const index = selectedAmenities.indexOf(amenity);
            selectedAmenities.splice(index, 1);
        } else {
            selectedAmenities.push(amenity);
        }
        this.setState({ selectedAmenities });
    };

    getAmenity = (amenity) => {
        const cl1 = "col " + (this.state.selectedAmenities.includes(amenity) ? "text-purple" : "option");
        const cl2 = "amenitie d-inline-flex " + (this.state.selectedAmenities.includes(amenity) ? "amenitie-selected" : "");
        return (
            <div key={ amenity } className={ cl1 }
                 style={ { fontSize: 14, height: 40, fontWeight: 500, cursor: "pointer" } }
                 onClick={ () => this.onAmenityClick(amenity) }>
                <div className={ cl2 }/>
                { amenity }
            </div>
        );
    };

    handleImageAdding = async ({ target }) => {
        const img = await this.convertBase64(target.files[0]);
        const photos = this.state.photos;
        for (let i = 0; i < photos.length; i++)
            if (!photos[i]) {
                photos[i] = img;
                break;
            }
        this.setState({ photos });
    };

    deletePhoto = (inx) => {
        const photos = this.state.photos;
        photos.splice(inx, 1);
        photos.push(null);
        this.setState({ photos });
    };

    doSubmit = async () => {
        const apartment = { ...this.state.data };
        apartment.amenities = this.state.selectedAmenities;
        apartment.petPolicy = this.state.petPolicy;
        apartment.address = { street: apartment.street, city: apartment.city, houseNumber: apartment.houseNumber };
        apartment.floor = -1;
        apartment.photos = this.state.photos;
        try {
            await apartmentService.addApartment(apartment);
            this.props.history.push('/properties');
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data.message.toString());
            } else
                toast.error(ex.message.toString());
        }
    };

    nextYear() {
        let nextYear = new Date();
        nextYear.setFullYear(nextYear.getFullYear() + 1);
        return nextYear
    }

    toString = (date) => {
        return date.toISOString().split('T')[0];
    };

    render() {
        const { amenities, petPolicy, photos } = this.state;
        return (
            <div className="d-flex justify-content-center" style={ { marginTop: 60 } }>
                <ScrollToTop/>
                <div style={ { width: 940 } }>
                    <div className="apt-add-back">
                        { photos[0] && <img src={ photos[0] } className="apt-photo-back"/> }
                    </div>
                    <form onSubmit={ this.handleSubmit } className="row" style={ { marginLeft: 0, marginRight: 0 } }>
                        <div style={ { width: 700, paddingLeft: 10, paddingRight: 10, fontWeight: "bold" } }>
                            <div className="d-flex align-items-center" style={ { height: 300 } }>
                                <div style={ {
                                    fontSize: 50,
                                    lineHeight: '72px',
                                    fontWeight: "bold",
                                    color: "white",
                                    width: 660
                                } }>
                                    { this.renderInput('name', "Property Name", "enter property name...", 'text', false) }
                                </div>
                            </div>
                            <div style={ { height: 100, color: "white" } }>
                                <div className="d-flex align-items-center">
                                    <div className="d-inline-flex" style={ { marginRight: 20, width: 280 } }>
                                        <div className="w-100">
                                            { this.renderInput('street', "Street", "enter street...", 'text', false) }
                                        </div>
                                    </div>
                                    <div className="d-inline-flex" style={ { marginRight: 20 } }>
                                        { this.renderInput('city', "City", "enter city...", 'text', false) }
                                    </div>
                                    <div className="d-inline-flex" style={ { width: 147 } }>
                                        { this.renderInput('houseNumber', "House Number", "enter house...", 'text', false) }
                                    </div>
                                </div>
                            </div>
                            <div style={ { height: 100, color: "white" } }>
                                <div className="d-flex align-items-center">
                                    <div className="d-inline-flex"
                                         style={ { marginRight: 20, marginBottom: 23, width: 190 } }>
                                        <div className="w-100">
                                            { this.renderSelect("type", "Type", this.state.types) }
                                        </div>
                                    </div>
                                    <div className="d-inline-flex" style={ { marginRight: 20, width: 180 } }>
                                        { this.renderInput('beds', "Beds", "enter beds...", 'number', false, { min: 0 }) }
                                    </div>
                                    <div className="d-inline-flex" style={ { marginRight: 20, width: 180 } }>
                                        { this.renderInput('bath', "Bath", "enter bath...", 'number', false, { min: 0 }) }
                                    </div>
                                    <div className="d-inline-flex" style={ { marginRight: 20, width: 180 } }>
                                        { this.renderInput('squareMeters', "Sq Ft", "enter sq ft...", 'number', false, { min: 0 }) }
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-30">
                                { photos.map((p, inx) => {
                                    return (p ?
                                        <div className="add-photo">
                                            <div className="del-icon" onClick={ () => this.deletePhoto(inx) }/>
                                            <img src={ p } className="apt-photo"/>
                                        </div>
                                        :
                                        <div
                                            className="add-photo d-flex justify-content-center align-items-center font-weight-normal">
                                            <span className="text-gray">Add Photo</span>
                                            <input type="file" accept="image/*"
                                                   style={ { width: 210, height: 210, zIndex: 10, cursor: "pointer" } }
                                                   onChange={ this.handleImageAdding }/>
                                        </div>);
                                }) }
                            </div>
                            <div style={ { marginTop: 30, fontWeight: 'normal' } }>
                                <div className="apt-h">Pets Policy</div>
                                <div>
                                    { petPolicy === 'Cats Allowed' ?
                                        <div className="d-flex align-items-center d-inline-flex">
                                            <div className="cats-icon-purple d-inline-flex"/>
                                            <span className="text-purple">Cats Allowed</span>
                                        </div> :
                                        <div id="CatsAllowed"
                                             className="option d-flex align-items-center d-inline-flex"
                                             onClick={ this.onCatsClicked }>
                                            <div className="cats-icon-black d-inline-flex"/>
                                            <span>Cats Allowed</span>
                                        </div>
                                    }
                                    { petPolicy === 'Dogs Allowed' ?
                                        <div className="d-flex align-items-center d-inline-flex">
                                            <div className="dogs-icon-purple d-inline-flex"/>
                                            <span className="text-purple">Dogs Allowed</span>
                                        </div> :
                                        <div className="option d-flex align-items-center d-inline-flex"
                                             onClick={ this.onDogsClicked }>
                                            <div className="dogs-icon-black d-inline-flex"/>
                                            <span>Dogs Allowed</span>
                                        </div>
                                    }
                                    { petPolicy === 'No Pets' ?
                                        <div className=" d-flex align-items-center d-inline-flex">
                                            <div className="no-pets-icon-purple d-inline-flex"/>
                                            <span className="text-purple">No Pets</span>
                                        </div> :
                                        <div className="option d-flex align-items-center d-inline-flex"
                                             onClick={ this.onNoPetsClicked }>
                                            <div className="no-pets-icon-black d-inline-flex"/>
                                            <span>No Pets</span>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div style={ { marginTop: 50, marginBottom: 40 } }>
                                <div className="apt-h">
                                    { this.renderInput('description', "Description", "enter description...", 'text', false) }
                                </div>
                            </div>
                            <div id="amenities" className="amenities">
                                <div className="amenities-back" style={ { height: 637 } }/>
                                <div style={ { paddingTop: 70, paddingBottom: 70 } }>
                                    <div className="apt-h">Amenities
                                    </div>
                                    <div className="row">
                                        { amenities.map((amenity, index) => {
                                            return (
                                                <React.Fragment>
                                                    { this.getAmenity(amenity) }
                                                    { index % 2 === 1 ? <div className="w-100"/> : '' }
                                                </React.Fragment>
                                            );
                                        }) }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={ { width: 240, paddingLeft: 10, paddingRight: 10, marginTop: 75 } }>
                            <div
                                className="apt-det-card text-center d-flex justify-content-center align-items-center">
                                <div style={ { width: 180, marginTop: 20, fontWeight: "bold" } }>
                                    { this.renderInput('price', "Price", "enter price...", 'number', false, { min: 0 }) }
                                    { this.renderInput("availableFrom", "Available From", "enter available from...", "date", true, {
                                        min: this.toString(new Date()),
                                        max: this.toString(this.nextYear())
                                    }) }
                                </div>
                            </div>
                        </div>
                        <div className="w-100 mt-10 d-flex justify-content-center">
                            <div style={ { width: 380, marginTop: 70 } }>
                                { super.renderButton("Save & Post", "btn btn-primary profile-button") }
                                <div className="text-center mt-3 text-gray"
                                     style={ { fontSize: 14, marginBottom: 70 } }>
                                    By clicking "Save & Post" you agree to<br/>
                                    our Listing Requirements
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddApartment;
