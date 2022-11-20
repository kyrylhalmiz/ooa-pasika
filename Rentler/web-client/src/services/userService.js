import { apiUrl } from "../config.json";
import http from "./httpService";

const apiEndpoint = apiUrl + '/accounts/';

export function register(user) {
    return http.post(apiEndpoint, {
        username: user.username,
        email: user.email,
        password: user.password
    });
}

export function updateInfo(info) {
    return http.put(`${ apiEndpoint }current`, {
        email: info.email,
        password: info.password,
        firstName: info.firstName,
        lastName: info.lastName,
        phoneNumber: info.phone,
        dateOfBirth: info.dateOfBirth,
        avatar: info.avatar
    });
}

export function getCurrentAccount() {
    return http.get(`${ apiEndpoint }current`);
}

export function getByUsername(username) {
    return http.get(`${ apiEndpoint + username }`);
}

export default {
    register,
    updateInfo,
    getCurrentAccount,
    getByUsername
};
