import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface BlogInfoType {
    isEditorInit: boolean;
    blogDeleteStatus: {
        isLoading: boolean;
        deletedBlogId: string;
    }
}

const initialState: BlogInfoType = {
    isEditorInit: false,
    blogDeleteStatus: {
        isLoading: false,
        deletedBlogId: "",
    }
};

export const deleteBlog = createAsyncThunk(
    "deleteBlog",
    async (reqObj: { blogId: string }) => {
        const { blogId } = reqObj;
        try {
            const resDataJson = await fetch(`/api/blogs/${blogId}`, {
                method: "DELETE"
            })
            const resData  = await resDataJson.json();
            return {
                resData
            }
        } catch (err) {
            throw(err)
        }
    }
)

export const blogInfoSlice = createSlice({
    name: "blogInfo",
    initialState,
    reducers: {
        updateIsEditorInit: (state, action: PayloadAction<boolean>) => {
            state.isEditorInit = action.payload;
          },

        resetDeletedBlogId: (state) => {
            state.blogDeleteStatus.deletedBlogId = "";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(deleteBlog.pending, (state) => {
            state.blogDeleteStatus.isLoading = true;
        })
        builder.addCase(deleteBlog.fulfilled, (state, action) => {
            state.blogDeleteStatus.isLoading = false;
            state.blogDeleteStatus.deletedBlogId = action.payload.resData.id;
        })
        builder.addCase(deleteBlog.rejected, (state) => {
            state.blogDeleteStatus.isLoading = false;
        })
    },
});

export const { updateIsEditorInit, resetDeletedBlogId } = blogInfoSlice.actions;

export default blogInfoSlice.reducer;