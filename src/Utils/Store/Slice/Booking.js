import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   user:null
};

export const userLoginSlice = createSlice({
    name: "bookingSlice",
    initialState,
    reducers: {
        
    },
});

export const { setLogin, setLogout, setCityOff, setCityOn } = BookingSlice.actions;

export default BookingSlice.reducer;
