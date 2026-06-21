// src/services/api.js

import axios from "axios";


// Railway backend URL from .env
const api = axios.create({

    baseURL:
        import.meta.env.VITE_API_URL + "/api",

    timeout: 8000,

    headers: {
        "Content-Type": "application/json",
    },

});




// Response interceptor
api.interceptors.response.use(

    (response) => response.data,


    (error) => {

        const message =
            error.response?.data?.message ||
            "Something went wrong. Please try again.";


        return Promise.reject(
            new Error(message)
        );

    }

);








export const getDestinations = (params = {}) =>

    api.get(
        "/destinations",
        {
            params
        }
    );



export const getDestination = (id) =>

    api.get(
        `/destinations/${id}`
    );









export const getPackages = (params = {}) =>

    api.get(
        "/packages",
        {
            params
        }
    );



export const getPackage = (id) =>

    api.get(
        `/packages/${id}`
    );









export const getTestimonials = () =>

    api.get(
        "/testimonials"
    );










export const searchTours = (data) =>

    api.post(
        "/search",
        data
    );










export const subscribeNewsletter = (email) =>

    api.post(
        "/newsletter",
        {
            email
        }
    );









export const submitContact = (data) =>

    api.post(
        "/contact",
        data
    );





export default api;