import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: null,
    token: null,
    id: null,
};

export const AdminLoginSlice = createSlice({
    name: "adminLogin",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.name = action.payload.name;
            state.token = action.payload.token;
            state.id = action.payload.id;
        },
        setLogout: (state, action) => {
            state.name = null;
            state.token = null;
            state.id = null;
        },
    },
});

export const { setLogin, setLogout } = AdminLoginSlice.actions;

export default AdminLoginSlice.reducer;
