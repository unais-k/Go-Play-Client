import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { AdminLoginSlice } from "./Slice/Admin";
import { userLoginSlice } from "./Slice/Client";
import { turfAdminLoginSlice } from "./Slice/TurfAdmin";

const persistConfig = { key: "userLogin", storage, version: 1 };
const adminLoginPersistedConfig = { key: "adminLogin", storage, version: 1 };
const turfAdminLoginPersistedConfig = { key: "turfAdminLogin", storage, version: 1 };
const userLoginPersistedReducer = persistReducer(persistConfig, userLoginSlice.reducer);
const adminLoginPersistedReducer = persistReducer(adminLoginPersistedConfig, AdminLoginSlice.reducer);
const turfAdminLoginPersistedReducer = persistReducer(turfAdminLoginPersistedConfig, turfAdminLoginSlice.reducer);

export const store = configureStore({
    reducer: {
        userLogin: userLoginPersistedReducer,
        adminLogin: adminLoginPersistedReducer,
        turfAdminLogin: turfAdminLoginPersistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
