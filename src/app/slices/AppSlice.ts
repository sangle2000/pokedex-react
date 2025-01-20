import {AppTypeInitialState} from "../../utils/Types.ts";
import {createSlice} from "@reduxjs/toolkit";


const initialState: AppTypeInitialState = {
    toasts: [],
    userInfo: undefined,
};

export const AppSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setToast: (state: AppTypeInitialState, action) => {
            const toasts = [...state.toasts];
            toasts.push(action.payload);
            state.toasts = toasts;
        },

        clearToast: (state: AppTypeInitialState) => {
            state.toasts = [];
        },

        setUserStatus: (state: AppTypeInitialState, action) => {
            state.userInfo = action.payload;
        }
    },
})

export const {setToast, clearToast, setUserStatus} = AppSlice.actions;
