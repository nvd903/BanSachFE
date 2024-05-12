import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
    register: {
      isFetching: false,
      isSuccess: false,
      error: false,
    },
    logout: {
      isFetching: false,
      isSuccess: false,
      error: false,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    loginFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state) => {
      state.register.isFetching = false;
      state.register.error = false;
      state.register.isSuccess = true;
    },
    registerFailed: (state) => {
      state.register.isFetching = false;
      state.register.isSuccess = false;
      state.register.error = true;
    },
    logoutStart: (state) => {
      state.logout.isFetching = true;
    },
    logoutSuccess: (state) => {
      state.logout.isFetching = false;
      state.logout.error = false;
      state.logout.isSuccess = true;
      state.login.currentUser = null;
      window.storage.removeItem("persist:root");
    },
    logoutFailed: (state) => {
      state.logout.isFetching = false;
      state.logout.isSuccess = false;
      state.logout.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  registerSuccess,
  registerFailed,
  logoutFailed,
  logoutStart,
  logoutSuccess,
} = authSlice.actions;

export default authSlice.reducer;
