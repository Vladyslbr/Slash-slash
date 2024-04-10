import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux'

import filter from "./filter/slice";
import data from "./data/slice";

export const store = configureStore({
    reducer: {
        data,
        filter,
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;