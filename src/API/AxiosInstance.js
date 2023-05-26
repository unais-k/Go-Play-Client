import Axios from "axios";
export const AxiosClient = Axios.create({
    baseURL: "http://localhost:4001/api/client/",
});

export const AxiosAdmin = Axios.create({
    baseURL: "http://localhost:4001/api/admin",
});

export const AxiosTurfAdmin = Axios.create({
    baseURL: "http://localhost:4001/api/turf-admin",
});

export const AxiosConversation = Axios.create({
    baseURL: "http://localhost:4001/api/conversation",
});

export const AxiosChat = Axios.create({
    baseURL: "http://localhost:4001/api/chat",
});
