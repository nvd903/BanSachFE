import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: {
      allUsers: null,
      isFetching: false,
      isError: false,
    },
  },
  reducers: {
    getAllUsersStart: (state) => {
      state.users.isFetching = true;
    },
    getAllUsersSuccess: (state, action) => {
      state.users.isFetching = false;
      state.users.allUsers = action.payload;
    },
    getAllUsersFalure: (state) => {
      state.users.isError = true;
      state.users.isFetching = false;
    },
  },
});

export const { getAllUsersFalure, getAllUsersStart, getAllUsersSuccess } =
  userSlice.actions;

export default userSlice.reducer;
