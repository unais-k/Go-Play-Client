import { AxiosChat, AxiosConversation } from "../AxiosInstance";

export const NewConversationReqApi = async (data, token) => {
    try {
        const response = await AxiosConversation.post("/add-conversation", data, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const GetConversationReqApi = async (data, token) => {
    try {
        const response = await AxiosConversation.get(`/get-conversation/${data}`, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const GetAdminListReqApi = async (token) => {
    try {
        const response = await AxiosConversation.get(`/get-admin`, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const GetOwnerListReqApi = async (token) => {
    try {
        const response = await AxiosConversation.get(`/get-owner`, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const GetConversationListReqApi = async (token) => {
    try {
        const response = await AxiosConversation.get(`/get-conversation-list`, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const AdminPermissionReqApi = async (token) => {
    try {
        let data = { text: "admin Permission" };
        console.log(token);
        const response = await AxiosChat.post("/get-admin-permission", data, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

///////////////////////////////////// messages /////////////////////

export const GetFullMessagesReqApi = async (data, token) => {
    try {
        const response = await AxiosChat.get(`/message/` + data, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};

export const AddMessageReqApi = async (data, token) => {
    try {
        const response = await AxiosChat.post(`/message/`, data, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error?.response;
    }
};
