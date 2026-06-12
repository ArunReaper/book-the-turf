import axios from "axios";

const turfApi = axios.create({
    baseURL: "http://localhost:8080/api"
});

export default turfApi;