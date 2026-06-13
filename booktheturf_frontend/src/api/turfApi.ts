import axios from "axios";

const turfApi = axios.create({
    baseURL: "https://book-the-turf-production.up.railway.app/api/"
});

export default turfApi;