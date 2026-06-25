import turfApi from "./turfApi";

export const createLead = async (lead: unknown) => {
    const response = await turfApi.post("/leads", lead);
    return response.data;
};

export const getAllLeads = async () => {
    const response = await turfApi.get("/admin/leads");
    return response.data;
};

export const updateLeadStatus = async (
    leadId: number,
    status: string
) => {

    const response = await turfApi.put(
        `/admin/leads/${leadId}/status`,
        {
            status
        }
    );

    return response.data;
};
