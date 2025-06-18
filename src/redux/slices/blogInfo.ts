import { BlogType, CreateBlogType } from "@/types/blog";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ObjectId } from "mongoose";

interface BlogInfoType {
    blogDeleteStatus: {
        isLoading: boolean;
        deletedBlogId: string;
    };
    blogPostUpdateStatus: {
        isLoading: boolean,
        createdBlogId: string,
    };
    success: {
        isSuccessful: boolean,
        message: string
    }
    error: {
        isError: boolean,
        message: string
    }
}

const initialState: BlogInfoType = {
    blogDeleteStatus: {
        isLoading: false,
        deletedBlogId: "",
    },
    blogPostUpdateStatus: {
        isLoading: false,
        createdBlogId: "",
    },
    success: {
        isSuccessful: false,
        message: ""
    },
    error: {
        isError: false,
        message: ""
    }
};

export const deleteBlog = createAsyncThunk(
    "deleteBlog",
    async (_id: ObjectId, { rejectWithValue }) => {
        try {
            const resDataJson = await fetch(`/api/blogs/${_id}`, {
                method: "DELETE"
            })
            if (!resDataJson.ok) {
                const errorData = await resDataJson.json();
                console.error("Server responded with error:", errorData);
                return rejectWithValue(errorData);
            }
            const resData = await resDataJson.json();
            return { resData };
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)

export const updateBlog = createAsyncThunk(
    "updateBlog",
    async (reqObj: BlogType, { rejectWithValue }) => {
        try {
            const resDataJson = await fetch(`/api/blogs/${reqObj._id}`, {
                method: "PUT",
                body: JSON.stringify(reqObj),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (!resDataJson.ok) {
                const errorData = await resDataJson.json();
                console.error("Server responded with error:", errorData);
                return rejectWithValue(errorData);
            }
            const resData = await resDataJson.json();
            return { resData };
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)

export const postBlog = createAsyncThunk(
    "postBlog",
    async (reqObj: CreateBlogType, { rejectWithValue }) => {
        try {
            const resDataJson = await fetch("/api/blogs", {
                method: "POST",
                body: JSON.stringify(reqObj),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (!resDataJson.ok) {
                const errorData = await resDataJson.json();
                console.error("Server responded with error:", errorData);
                return rejectWithValue(errorData);
            }
            const resData = await resDataJson.json();
            return { resData };
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)

export const blogInfoSlice = createSlice({
    name: "blogInfo",
    initialState,
    reducers: {
        resetDeletedBlogId: (state) => {
            state.blogDeleteStatus.deletedBlogId = "";
        },

        resetCreatedBlogId: (state) => {
            state.blogPostUpdateStatus.createdBlogId = "";
        },

        resetErrorState: (state) => {
            state.error.isError = false;
        },

        resetSuccessState: (state) => {
            state.success.isSuccessful = false;
        },

        updateBlogDataIsLoading: (state, action) => {
            state.blogPostUpdateStatus.isLoading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(deleteBlog.pending, (state) => {
            state.blogDeleteStatus.isLoading = true;
        })
        builder.addCase(deleteBlog.fulfilled, (state, action) => {
            state.blogDeleteStatus.isLoading = false;
            state.blogDeleteStatus.deletedBlogId = action.payload.resData.id;
            state.success.isSuccessful = true;
            state.success.message = "Blog deleted successfully!";
        })
        builder.addCase(deleteBlog.rejected, (state, action) => {
            state.error.isError = true;
            state.error.message = action.payload?.message || "Something went wrong.";
            state.blogDeleteStatus.isLoading = false;
        })

        builder.addCase(updateBlog.pending, (state) => {
            state.blogPostUpdateStatus.isLoading = true;
        })
        builder.addCase(updateBlog.fulfilled, (state, action) => {
            state.blogPostUpdateStatus.isLoading = false;
            state.blogPostUpdateStatus.createdBlogId = action.payload.resData.id;
            state.success.isSuccessful = true;
            state.success.message = "Blog updated successfully!";
        })
        builder.addCase(updateBlog.rejected, (state, action) => {
            state.error.isError = true;
            state.blogPostUpdateStatus.isLoading = false;
            state.error.message = action.payload?.message || "Something went wrong.";
        })

        builder.addCase(postBlog.pending, (state) => {
            state.blogPostUpdateStatus.isLoading = true;
        })
        builder.addCase(postBlog.fulfilled, (state, action) => {
            state.blogPostUpdateStatus.isLoading = false;
            state.blogPostUpdateStatus.createdBlogId = action.payload.resData.id;
            state.success.isSuccessful = true;
            state.success.message = "Blog created successfully!";
        })
        builder.addCase(postBlog.rejected, (state, action) => {
            state.error.isError = true;
            state.error.message = action.payload?.message || "Something went wrong.";
            state.blogPostUpdateStatus.isLoading = false;
        })
    },
});

export const { resetDeletedBlogId, resetCreatedBlogId, resetErrorState, resetSuccessState, updateBlogDataIsLoading } = blogInfoSlice.actions;

export default blogInfoSlice.reducer;