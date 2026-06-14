import turfApi from "./turfApi";

export const createLead = async (lead: unknown) => {
    const response = await turfApi.post("/leads", lead);
    return response.data;
};

export const getAllLeads = async () => {
    const response = await turfApi.get("/leads");
    return response.data;
};

export const updateLeadStatus = async (
    leadId: number,
    status: string
) => {

    const response = await turfApi.put(
        `/leads/${leadId}/status`,
        {
            status
        }
    );

    return response.data;
};