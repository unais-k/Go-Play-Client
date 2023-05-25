import { AxiosAdmin, AxiosClient, AxiosTurfAdmin } from "../AxiosInstance";

export const userLogin = async (data) => {
    try {
        const response = AxiosClient.post("/login", data);
        return response;
    } catch (error) {
        return error?.response;
    }
};

export const userRegister = async (data) => {
    try {
        const response = AxiosClient.post("/register", data);
        return response;
    } catch (error) {
        return error?.response;
    }
};

export const otpSend = async (data) => {
    try {
        const response = AxiosClient.post("/otp-send", data);
        return response;
    } catch (error) {
        return error?.response;
    }
};

export const otpVerify = async (data) => {
    console.log(data);
    try {
        const response = AxiosClient.post("/otp-verify", data);
        return response;
    } catch (error) {
        return error?.response;
    }
};

// ------------------------- Client Auth End --------------------------------

export const adminLog = async (data) => {
    try {
        const response = AxiosAdmin.post("/", data);
        return response;
    } catch (error) {
        return error?.response;
    }
};

//  ------------------------ Admin Auth End ----------------------------------

export const turfAdminLogin = async (data) => {
    try {
        const response = AxiosTurfAdmin.post("/login", data);
        return response;
    } catch (error) {
        return error?.response;
    }
};

export const turfAdminRegister = async (data) => {
    console.log(data);
    try {
        const response = AxiosTurfAdmin.post("/register", data);
        return response;
    } catch (error) {
        return error?.response;
    }
};

export const turfAdminOtpSend = async (data) => {
    try {
        const response = AxiosClient.post("/otp-send", data);
        return response;
    } catch (error) {
        return error?.response;
    }
};

export const turfAdminOtpVerify = async (data) => {
    try {
        const response = AxiosClient.post("/otp-verify", data);
        return response;
    } catch (error) {
        return error?.response;
    }
};

// ----------------------------- TurfAdmin Auth End ---------------------------
