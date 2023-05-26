import { AxiosAdmin } from "../AxiosInstance";

export const notificationReqApi = async (token) => {
    try {
        const response = AxiosAdmin.get("/notification", {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        return error?.response;
    }
};

export const clientListReqApi = async (token) => {
    try {
        const response = AxiosAdmin.get("/client-list", {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        return error?.response;
    }
};

export const turfAdminApproveReq = async (data, token) => {
    try {
        const response = AxiosAdmin.post("/approve-turf-admin", data, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        return error?.response;
    }
};

export const turfAdminCancelReqApi = async (data, token) => {
    try {
        const response = AxiosAdmin.post("/cancel-turf-admin", data, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        return error?.response;
    }
};

export const addCityReqApi = async (data, token) => {
    try {
        const response = AxiosAdmin.post("/add-city", data, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        return error?.response;
    }
};

export const findCityReqApi = async (token) => {
    try {
        const response = AxiosAdmin.get("/find-city", {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        return error?.response;
    }
};

export const groundListAdminReqApi = async (token) => {
    try {
        const response = AxiosAdmin.get("/ground-list", {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        return error?.response;
    }
};

export const ChatRequestReqApi = async (token) => {
    try {
        const response = AxiosAdmin.get("/chat-request", {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        return error?.response;
    }
};

export const BlockGroundReqApi = async (data, token) => {
    try {
        const response = AxiosAdmin.patch(
            "/block-ground",
            { data: data },
            {
                headers: { Authorization: "Bearer " + token },
            }
        );
        return response;
    } catch (error) {
        return error?.response;
    }
};

export const UnblockGroundReqApi = async (data, token) => {
    try {
        const response = AxiosAdmin.patch(
            "/unblock-ground",
            { data: data },
            {
                headers: { Authorization: "Bearer " + token },
            }
        );
        return response;
    } catch (error) {
        return error?.response;
    }
};

export const OwnerListReqApi = async (token) => {
    try {
        const response = AxiosAdmin.get("/owner-list", {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        return error?.response;
    }
};

export const TimeSaveReqApi = async (data, token) => {
    try {
        const response = AxiosAdmin.post("/time-save", data, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        return error?.response;
    }
};

export const GroundViewReqApi = async (data, token) => {
    try {
        const response = AxiosAdmin.get(`/ground-view?id=${data}`, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const EventDetailFetchReqApi = async (data, token) => {
    try {
        const response = AxiosAdmin.get(`/event-detail?id=${data}`, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
    }
};

export const FetchAllBookingsReqApi = async (token) => {
    try {
        const response = AxiosAdmin.get("/fetch-all-booking", {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
    }
};

export const EventBookingDetailViewReqApi = async (data, token) => {
    try {
        const response = AxiosAdmin.get(`/event-booking-detail-view?id=${data}`, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const AdminHomePageReqApi = async (token) => {
    try {
        const response = AxiosAdmin.get("/admin-home-page", {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};
