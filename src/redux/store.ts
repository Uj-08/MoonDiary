import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import blogInfoSlice from "./slices/blogInfo";

export const store = configureStore({
	devTools: true,
	reducer: {
		blogInfo: blogInfoSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
