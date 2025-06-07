import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface BlogInfoType {
    blogDeleteStatus: {
        isLoading: boolean;
        deletedBlogId: string;
    };
    blogPostUpdateStatus: {
        isLoading: boolean,
        createdBlogId: string,
    };
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
    error: {
        isError: false,
        message: ""
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
            const resData = await resDataJson.json();
            return {
                resData
            }
        } catch (err) {
            throw (err)
        }
    }
)

export const updateBlog = createAsyncThunk(
    "updateBlog",
    async (reqObj: {
        blogId: string
        blogTitle: string,
        blogImg: string,
        blogData: string,
        authorName: string,
        authorPicture: string,
        authorEmail: string,
    }) => {
        const { blogId, ...reqBody } = reqObj;
        try {
            const resDataJson = await fetch(`/api/blogs/${blogId}`, {
                method: "PUT",
                body: JSON.stringify(reqBody),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const resData = await resDataJson.json();
            return {
                resData
            }
        } catch (err) {
            throw (err)
        }
    }
)

export const postBlog = createAsyncThunk(
    "postBlog",
    async (reqObj: {
        blogTitle: string,
        blogImg: string,
        blogData: string,
        authorName: string,
        authorPicture: string,
        authorEmail: string,
    }, { rejectWithValue }) => {
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
            return {resData};
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

        builder.addCase(updateBlog.pending, (state) => {
            state.blogDeleteStatus.isLoading = true;
        })
        builder.addCase(updateBlog.fulfilled, (state, action) => {
            state.blogDeleteStatus.isLoading = false;
            state.blogPostUpdateStatus.createdBlogId = action.payload.resData.id;
        })
        builder.addCase(updateBlog.rejected, (state) => {
            state.blogPostUpdateStatus.isLoading = false;
        })

        builder.addCase(postBlog.pending, (state) => {
            state.blogPostUpdateStatus.isLoading = true;
        })
        builder.addCase(postBlog.fulfilled, (state, action) => {
            state.blogPostUpdateStatus.isLoading = false;
            state.blogPostUpdateStatus.createdBlogId = action.payload.resData.id;
        })
        builder.addCase(postBlog.rejected, (state, action) => {
            state.error.isError = true;
            state.error.message = action.payload?.message?.message || "Something went wrong.";
            state.blogPostUpdateStatus.isLoading = false;
        })
    },
});

export const { resetDeletedBlogId, resetCreatedBlogId, resetErrorState } = blogInfoSlice.actions;

export default blogInfoSlice.reducer;