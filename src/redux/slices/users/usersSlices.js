import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//initialstate

const INITIAL_STATE = {
  loading: false,
  error: null,
  users: [],
  users: null,
  isUpated: false,
  isDeleted: false,
  isEmailSent: false,
  isPasswordReset: false,
  profile: {},
  userAuth: {
    error: null,
    userInfo: {},
  },
};

//! Login Action

export const loginAction = createAsyncThunk(
  "users/login",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/login",
        payload
      );
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
