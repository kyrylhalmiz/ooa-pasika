import { apiUrl } from "../config.json";
import http from "./httpService";

const apiEndpoint = apiUrl + '/apartments/';

export function getApartments(page = 0, size = 9, sort = 'id') {
    return http.get(apiEndpoint, { params: { page, size, sort } });
}

export function getById(id) {
    return http.get(`${ apiEndpoint + id }`);
}

export function getByUsername(username) {
    return http.get(`${ apiEndpoint }search`, { params: { owner: username } });
}

export function getAmenities() {
    return http.get(`${ apiEndpoint }amenities`);
}

export function getTypes() {
    return http.get(`${ apiEndpoint }types`);
}

export function addApartment(apartment) {
    return http.post(`${ apiEndpoint }`, {
        ...apartment
    });
}

export function updateApartment(apartment) {
    return http.put(`${ apiEndpoint + apartment.id }`, {
        ...apartment
    });
}

export function getApplications(id) {
    return http.get(`${ apiEndpoint + id }/applications`);
}

export function addApplication(application) {
    return http.post(`${ apiEndpoint }applications`, {
        ...application
    });
}

export function updateApplication(application) {
    return http.put(`${ apiEndpoint }applications/${ application.id }`, {
        ...application
    });
}

export function getApplicationsByOwner() {
    return http.get(`${ apiEndpoint }applications`);
}

export function deleteApplication(id) {
    return http.delete(`${ apiEndpoint }applications/${ id }`);
}

export default {
    getApartments,
    getById,
    getByUsername,
    getAmenities,
    getTypes,
    addApartment,
    updateApartment,
    getApplications,
    addApplication,
    updateApplication,
    getApplicationsByOwner,
    deleteApplication
};
