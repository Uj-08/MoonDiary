import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface BlogInfoType {
    isEditorInit: boolean;
}

const initialState: BlogInfoType = {
    isEditorInit: false,
};


export const blogInfoSlice = createSlice({
    name: "blogInfo",
    initialState,
    reducers: {
        updateIsEditorInit: (state, action: PayloadAction<boolean>) => {
            state.isEditorInit = action.payload;
          },
    },
    extraReducers: (builder) => {

    },
});

export const { updateIsEditorInit } = blogInfoSlice.actions;

export default blogInfoSlice.reducer;