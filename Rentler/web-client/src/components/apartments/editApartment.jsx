import React from 'react';
import { toast } from "react-toastify";
import apartmentService from "../../services/apartmentService";
import logger from "../../services/logService";
import AddApartment from "./addApartment";

class EditApartment extends AddApartment {

    populateApartment = async () => {
        try {
            const { data: apartment } = await apartmentService.getById(this.props.match.params.id);
            const data = {
                name: apartment.name,
                street: apartment.address.street,
                city: apartment.address.city,
                houseNumber: apartment.address.houseNumber,
                type: apartment.type,
                beds: apartment.beds,
                bath: apartment.bath,
                squareMeters: apartment.squareMeters,
                description: apartment.description,
                availableFrom: apartment.availableFrom,
                price: apartment.price
            };

            const photos = apartment.photos;
            for (let i = photos.length; i < 3; i++)
                photos.push(null);

            this.setState({
                data,
                selectedAmenities: apartment.amenities,
                petPolicy: apartment.petPolicy,
                photos
            });
        } catch (ex) {
            logger.error(ex);
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data.message.toString());
                window.location = '/not-found';
            } else
                toast.error(ex.message.toString());
        }
    };

    doSubmit = async () => {
        const apartment = { ...this.state.data };
        apartment.amenities = this.state.selectedAmenities;
        apartment.petPolicy = this.state.petPolicy;
        apartment.address = { street: apartment.street, city: apartment.city, houseNumber: apartment.houseNumber };
        apartment.floor = -1;
        apartment.photos = this.state.photos;
        apartment.id = this.props.match.params.id;
        try {
            await apartmentService.updateApartment(apartment);
            this.props.history.push('/properties');
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data.message.toString());
            } else
                toast.error(ex.message.toString());
        }
    };

    async componentDidMount() {
        await super.componentDidMount();
        await this.populateApartment();
    }

    render() {
        return super.render();
    }
}

export default EditApartment;
