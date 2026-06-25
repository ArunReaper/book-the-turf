import type { Turf } from "../types/Turf";
import turfApi from "./turfApi";

export const getAllTurfs = async () => {
    const response = await turfApi.get("/turfs");
    return response.data;
};

export const getTurfById = async (id: number) => {
    const response = await turfApi.get(`/turfs/${id}`);
    return response.data;
};

export const createTurf = async (
    turf: Turf
) => {

    const response =
        await turfApi.post(
            "/admin/turfs",
            turf
        );

    return response.data;
};

export const updateTurf = async (
    id: number,
    turf: Turf
) => {

    const response =
        await turfApi.put(
            `/admin/turfs/${id}`,
            turf
        );

    return response.data;
};

export const deleteTurf = async (
    id: number
) => {

    await turfApi.delete(
        `/admin/turfs/${id}`
    );
};
