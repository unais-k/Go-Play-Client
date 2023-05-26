import { AxiosClient } from "../AxiosInstance";

export const LocationListReqApi = async () => {
    try {
        const response = AxiosClient.get("/city-list");
        return response;
    } catch (error) {
        return error?.response;
    }
};

export const GroundListReqApi = async (data) => {
    try {
        const response = AxiosClient.get(`/ground-list?place=${data}`);
        return response;
    } catch (error) {
        return error?.response;
    }
};

export const FootballListReqApi = async () => {
    try {
        const response = AxiosClient.get("/football-ground-list");
        return response;
    } catch (error) {
        return error?.response;
    }
};

export const GroundViewReqApi = async (id) => {
    try {
        const response = AxiosClient.get(`/ground-view?id=${id}`);
        return response;
    } catch (error) {
        return error?.response;
    }
};

export const TimeSlotReqApi = async () => {
    try {
        const response = AxiosClient.get("/time-slot");
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const SelectTypeOfReqApi = async (data) => {
    try {
        const response = AxiosClient.get(`/select-type?id=${data}`);
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const GroundFetchOnSelectReqApi = async (data) => {
    try {
        const response = AxiosClient.get(`/selected-type?id=${data.groundId}&data=${data.value}`);
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const EventFetchOnSelectReqApi = async (data) => {
    try {
        const response = AxiosClient.get(`/event-fetch?id=${data}`);
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const OnDateBookedReqApi = async (data) => {
    try {
        const response = AxiosClient.get(`/date-event-fetch?id=${data.id}&date=${data.date}`);
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const BookingSubmitReqApi = async (data, token) => {
    console.log(data, "data");
    try {
        const response = AxiosClient.post(`/booking-submit`, data, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const PaymentSuccessReqApi = async (data, token) => {
    console.log(data, "data");
    try {
        const response = AxiosClient.post("/booking-submit", data, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const UserDataFetchReqApi = async (token) => {
    try {
        const response = AxiosClient.get("/user-data", {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const UserEditReqApi = async (data, token) => {
    console.log(data, "data", token, "token");
    try {
        const response = AxiosClient.patch("/user-edit", data, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const UserBookingDetailFetchReqApi = async (token) => {
    try {
        const response = AxiosClient.get("/booking-data", {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const BookingDetailViewReqApi = async (data, token) => {
    try {
        const response = AxiosClient.get(`/booking-detail-view?id=${data}`, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const SubmitReviewReqApi = async (data, id, token) => {
    console.log(data, "data", id, "id", token, "--------");
    try {
        const response = AxiosClient.post(
            "/review-submit",
            { data, id },
            {
                headers: { Authorization: "Bearer " + token },
            }
        );
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const SearchGroundReqApi = async (data) => {
    console.log(data);
    try {
        const response = AxiosClient.get(`/search-turf?id=${data.id}&place=${data.place}`);
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const CancelBookingReqApi = async (data, token) => {
    console.log(data.id);
    try {
        const response = AxiosClient.patch("/cancel-booking", data, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const EventDateCheckReqApi = async (data, token) => {
    console.log(data, token);
    try {
        const response = AxiosClient.post("/event-date-check", data, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const EventSubmitReqApi = async (data, token) => {
    try {
        const response = AxiosClient.post("/event-submit", data, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const EventBookingDetailsReqApi = async (token) => {
    console.log(token);
    try {
        const response = AxiosClient.get(`/event-booking-details`, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const EventBookingDetailViewReqApi = async (data, token) => {
    try {
        const response = AxiosClient.get(`/event-booking-detail-view?id=${data}`, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const FPEmailReqApi = async (data) => {
    try {
        const response = AxiosClient.patch(`/email-check`, data);
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const FPOtpReqApi = async (data) => {
    try {
        const response = AxiosClient.patch(`/otp-check`, data);
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const FPSetResApi = async (data) => {
    try {
        const response = AxiosClient.patch(`/forget-password-submit`, data);
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const ChangePasswordReqApi = async (data, token) => {
    try {
        const response = AxiosClient.post(`/change-password`, data, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};
