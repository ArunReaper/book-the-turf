import turfApi from "./turfApi";

export const getAllTurfs = async () => {
    const response = await turfApi.get("/turfs");
    return response.data;
};

export const getTurfById = async (id: number) => {
    const response = await turfApi.get(`/turfs/${id}`);
    return response.data;
};