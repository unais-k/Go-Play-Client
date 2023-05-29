import { AxiosTurfAdmin } from "../AxiosInstance";
import AddEvent from "./../../Pages/Turf-Admin/AddEvent";

export const addGroundReqApi = async (data, token) => {
    try {
        const response = AxiosTurfAdmin.post("/ground-add", data, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const findCityReqApi = async (token) => {
    try {
        const response = AxiosTurfAdmin.get("/find-city", {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        return error?.response;
    }
};

export const GroundListReqApi = async (token) => {
    try {
        const response = AxiosTurfAdmin.get("/ground-list", {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const GroundViewReqApi = async (data, token) => {
    try {
        const response = AxiosTurfAdmin.get(`/ground-view?id=${data}`, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const TimeSlotReqApi = async (data, token) => {
    try {
        const response = AxiosTurfAdmin.get(`/find-city?id=${data}`, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const AvailableStatusChangeReqApi = (data, id, token) => {
    try {
        const response = AxiosTurfAdmin.patch(`/available-status?id=${id}`, data, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const TimeSettingReqApi = (data, token) => {
    try {
        const response = AxiosTurfAdmin.post("/time-setting", data, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const FindRuleReqApi = (data, token) => {
    try {
        const response = AxiosTurfAdmin.get(`/rule-fetch?id=${data.id}`, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const RuleAddReqApi = (data, token) => {
    try {
        const response = AxiosTurfAdmin.post(
            "/rule-add",
            { data: data },
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

export const RuleDeleteReqApi = (data, token) => {
    try {
        const response = AxiosTurfAdmin.delete(`/rule-delete?index=${data.deleteId}&id=${data.id}`, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const RuleUpdateFindReqApi = (data, token) => {
    try {
        const response = AxiosTurfAdmin.get(`/rule-update-find?id=${data.id}&index=${data.index}`, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const RuleUpdateReqApi = (data, token) => {
    try {
        const response = AxiosTurfAdmin.patch("/rule-update", data, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const SelectedTimeReqApi = async (data, token) => {
    try {
        const response = AxiosTurfAdmin.post(`/selected-time-slot`, data, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const CancelTimeReqApi = async (data, token) => {
    try {
        const response = AxiosTurfAdmin.post(`/canceled-time-slot`, data, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const GroundDetailSubmitReqApi = async (data, id, token) => {
    try {
        const response = AxiosTurfAdmin.post(`/ground-detail-form-submit?id=${id}`, data, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const AddEventReqApi = async (data, token) => {
    try {
        const response = AxiosTurfAdmin.post(`/add-event`, data, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const TimeSaveOnEventReqApi = async (data, token) => {
    try {
        const response = AxiosTurfAdmin.post(`/add-time-on-event?id=${data}`, {
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
        const response = AxiosTurfAdmin.get(`/event-detail?id=${data}`, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const EditEventReqApi = async (data, token) => {
    console.log(data, "data");
    try {
        const response = AxiosTurfAdmin.post("/edit-event", data, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const OwnerDataFetchReqApi = async (token) => {
    try {
        const response = AxiosTurfAdmin.get("/owner-data", {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const AddPhotoOnGroundPostApi = async (data, token) => {
    console.log(data, "dataOnPost");
    try {
        const response = AxiosTurfAdmin.post(`/photo-add-on-ground?id=${data.groundId}`, data, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const BookingListReqApi = async (token) => {
    try {
        const response = AxiosTurfAdmin.get("/booking-list", {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const PaymentStatusSetReqApi = async (data, token) => {
    try {
        const response = AxiosTurfAdmin.patch("/payment-status-set", data, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const BookingStatusSetReqApi = async (data, token) => {
    try {
        const response = AxiosTurfAdmin.patch("/booking-status-set", data, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const FindReviewReqApi = async (token) => {
    try {
        const response = AxiosTurfAdmin.get("/review-fetch", {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const AdminEditReqApi = (data, token) => {
    try {
        const response = AxiosTurfAdmin.post("/profile-edit", data, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const EditProfilePhotoReqApi = (data, token) => {
    try {
        const response = AxiosTurfAdmin.patch("/profile-photo-edit", data, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const SelectTypeOfReqApi = async (data, token) => {
    try {
        const response = AxiosTurfAdmin.get(`/ground-sport-type?id=${data}`, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const GroundFetchOnSelectReqApi = async (data, token) => {
    try {
        const response = AxiosTurfAdmin.get(`/selected-type?id=${data.groundId}&data=${data.value}`, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const EventFetchOnSelectReqApi = async (data, token) => {
    try {
        const response = AxiosTurfAdmin.get(`/event-fetch?id=${data}`, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const OnDateBookedReqApi = async (data, token) => {
    console.log(data);
    try {
        const response = AxiosTurfAdmin.get(`/date-event-fetch?id=${data.id}&date=${data.date}`, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const SubmitBookingAdminReqApi = async (data, token) => {
    try {
        const response = AxiosTurfAdmin.post("/handle-submit-admin", data, {
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
        const response = AxiosTurfAdmin.get("/admin-home-page", {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

// this is pending ............

export const FPEmailReqApi = async (data) => {
    try {
        const response = AxiosTurfAdmin.patch(`/email-check`, data);
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const FPOtpReqApi = async (data) => {
    try {
        const response = AxiosTurfAdmin.patch(`/otp-check`, data);
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const FPSetResApi = async (data) => {
    try {
        const response = AxiosTurfAdmin.patch(`/forget-password-submit`, data);
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};
