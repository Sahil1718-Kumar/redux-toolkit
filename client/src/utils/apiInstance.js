import axios from 'axios';

const imageBaseUrl = "http://localhost:4321";

// const imageBaseUrl = 'http://122.176.141.23:4321';  //live server


const apiInstance = axios.create({
    baseURL: 'http://localhost:4321/admin',

    // baseURL: 'http://122.176.141.23:4321/admin', //live server

});


apiInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                if (error.response.data.message && error.response.data.message === 'token expired') {
                    localStorage.setItem('sessionexpired', 'true')
                    localStorage.removeItem('token');
                    window.location.href = '/';
                }
            }
        }
        return Promise.reject(error);
    }
);


export default apiInstance;
export { imageBaseUrl };
