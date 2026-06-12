import turfApi from "./turfApi";

export const getAllTurfs = async () => {
    const response = await turfApi.get("/turfs");
    return response.data;
};