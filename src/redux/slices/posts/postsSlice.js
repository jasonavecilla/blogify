import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  resetErrorAction,
  resetSuccesAction,
} from "../globalSlice/globalSlice";

//initialstate
const INITIAL_STATE = {
  loading: false,
  error: null,
  posts: [],
  post: null,
  success: false,
};

//!Fetch public posts
export const fetchPublicPostsAction = createAsyncThunk(
  "posts/fetch-public-posts",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.get(
        "http://localhost:9080/api/v1/posts/public"
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! Create post
export const addPostAction = createAsyncThunk(
  "post/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    console.log(payload);
    try {
      //convert the payload to formdata
      const formData = new FormData();
      formData.append("title", payload?.title);
      formData.append("content", payload?.content);
      formData.append("categoryId", payload?.category);
      formData.append("file", payload?.image);

      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        "http://localhost:9080/api/v1/posts",
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! Users slices
const publicPostSlice = createSlice({
  name: "posts",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //fetch public posts
    builder.addCase(fetchPublicPostsAction.pending, (state, action) => {
      state.loading = true;
    });
    //handle fulfilled state
    builder.addCase(fetchPublicPostsAction.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* Handle the rejection
    builder.addCase(fetchPublicPostsAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! create post
    builder.addCase(addPostAction.pending, (state, action) => {
      state.loading = true;
    });
    //handle fulfilled state
    builder.addCase(addPostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* Handle the rejection
    builder.addCase(addPostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! Reset error action
    builder.addCase(resetErrorAction.fulfilled, (state) => {
      state.error = null;
    });
    //! Reset success action
    builder.addCase(resetSuccesAction.fulfilled, (state) => {
      state.success = false;
    });
  },
});

//! generate reducer
const postsReducer = publicPostSlice.reducer;

export default postsReducer;
