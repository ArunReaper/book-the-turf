import turfApi from "./turfApi";

export const createLead = async (lead: unknown) => {
    const response = await turfApi.post("/leads", lead);
    return response.data;
};