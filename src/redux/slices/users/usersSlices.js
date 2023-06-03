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
  users: [],
  user: null,
  success: false,
  isverified: false,
  emailMessage: undefined,
  profile: {},
  isEmailSent: false,
  userAuth: {
    error: null,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

//! Login Action
export const loginAction = createAsyncThunk(
  "users/login",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.post(
        "http://localhost:9080/api/v1/users/login",
        payload
      );
      //! save the user into localstorage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! Register Action
export const registerAction = createAsyncThunk(
  "users/register",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.post(
        "http://localhost:9080/api/v1/users/register",
        payload
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! Get User Public Profile Action
export const userPublicProfileAction = createAsyncThunk(
  "users/user-public-profile",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:9080/api/v1/users/public-profile/${userId}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! Get User  Profile Action
export const userPrivateProfileAction = createAsyncThunk(
  "users/user-private-profile",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:9080/api/v1/users/profile/`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! Block User Action
export const blockUserAction = createAsyncThunk(
  "users/block-user",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:9080/api/v1/users/block/${userId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! UnBlock User Action
export const unBlockUserAction = createAsyncThunk(
  "users/unblock-user",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:9080/api/v1/users/unblock/${userId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//!Follow User Action
export const followUserAction = createAsyncThunk(
  "users/follow-user",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:9080/api/v1/users/following/${userId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//!UnFollow User Action
export const unFollowUserAction = createAsyncThunk(
  "users/unfollow-user",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:9080/api/v1/users/unfollowing/${userId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! Logout action
export const logoutAction = createAsyncThunk("users/logout", async () => {
  //remove token from localstorage
  localStorage.removeItem("userInfo");
  return true;
});
// ! upload cover image
export const uploadCoverImageAction = createAsyncThunk(
  "users/upload-cover-image",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //convert the payload to formdata
      const formData = new FormData();
      formData.append("file", payload?.image);

      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        "http://localhost:9080/api/v1/users/upload-cover-image",
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! upload profile image
export const uploadProfileImageAction = createAsyncThunk(
  "users/upload-profile-image",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //convert the payload to formdata
      const formData = new FormData();
      formData.append("file", payload?.image);
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        "http://localhost:9080/api/v1/users/upload-profile-image",
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//
//! Send Account verification email Action
export const sendAccVerificationEmailAction = createAsyncThunk(
  "users/send-account-verification-email",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:9080/api/v1/users/account-verification-email`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! verify account Action
export const verifyAccountAction = createAsyncThunk(
  "users/account-verified",
  async (verifyToken, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:9080/api/v1/users/account-verification/${verifyToken}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//!forgot password Action
export const forgotPasswordAction = createAsyncThunk(
  "users/forgot-password",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.post(
        "http://localhost:9080/api/v1/users/forgot-password",
        payload
      );
      //! save the user into localstorage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//! Users slices
const usersSlice = createSlice({
  name: "users",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //Login
    builder.addCase(loginAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //get user public profile
    builder.addCase(userPublicProfileAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userPublicProfileAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(userPublicProfileAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //upload user profile image
    builder.addCase(uploadProfileImageAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(uploadProfileImageAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(uploadProfileImageAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //! upload user cover image
    builder.addCase(uploadCoverImageAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(uploadCoverImageAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(uploadCoverImageAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //get user private profile
    builder.addCase(userPrivateProfileAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userPrivateProfileAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(userPrivateProfileAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //Send Account verification email
    builder.addCase(sendAccVerificationEmailAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(
      sendAccVerificationEmailAction.fulfilled,
      (state, action) => {
        state.isEmailSent = true;
        state.loading = false;
        state.error = null;
      }
    );
    builder.addCase(
      sendAccVerificationEmailAction.rejected,
      (state, action) => {
        state.error = action.payload;
        state.loading = false;
      }
    );

    //Verify Account
    builder.addCase(verifyAccountAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(verifyAccountAction.fulfilled, (state, action) => {
      state.isverified = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(verifyAccountAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //block user
    builder.addCase(blockUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(blockUserAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(blockUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //forgot password
    builder.addCase(forgotPasswordAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(forgotPasswordAction.fulfilled, (state, action) => {
      state.isEmailSent = true;
      state.emailMessage = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(forgotPasswordAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //unblock user
    builder.addCase(unBlockUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(unBlockUserAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(unBlockUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //follow user
    builder.addCase(followUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(followUserAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(followUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //unfollow user
    builder.addCase(unFollowUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(unFollowUserAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(unFollowUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //! Register
    builder.addCase(registerAction.pending, (state, action) => {
      state.loading = true;
    });
    //handle fulfilled state
    builder.addCase(registerAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* Handle the rejection
    builder.addCase(registerAction.rejected, (state, action) => {
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
const usersReducer = usersSlice.reducer;

export default usersReducer;
