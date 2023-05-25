import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: null,
    token: null,
    id: null,
    city: null,
};

export const userLoginSlice = createSlice({
    name: "userLogin",
    initialState,
    reducers: {
        setCityOn: (state, action) => {
            state.city = action.payload.city;
        },
        setCityOff: (state, action) => {
            state.city = null;
        },
        setLogin: (state, action) => {
            state.name = action.payload.name;
            state.token = action.payload.token;
            state.id = action.payload.id;
        },
        setLogout: (state) => {
            state.name = null;
            state.token = null;
            state.id = null;
        },
    },
});

export const { setLogin, setLogout, setCityOff, setCityOn } = userLoginSlice.actions;

export default userLoginSlice.reducer;
