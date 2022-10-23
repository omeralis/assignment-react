import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    user: null,
    isAdmin: false,
    isNameUser: null,
  },
  reducers: {
    login: (state) => {
      state.user = state.user;
      state.isAuthenticated = true;
      console.log("LOGIN", state);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    getData(state, action) {
      const newUser = action.payload;
      const existingUsers = JSON.parse(JSON.stringify(newUser));
      state.user = existingUsers;
      state.isNameUser = state.user.user_name;
      if (state.user.User_type === "admin") {
        state.isAdmin = true;
        console.log(state.isAdmin);
      }
    },
  },
});

export const { login, logout, getData } = UserSlice.actions;
export const selectUser = (state) => state.user.isAuthenticated;
export default UserSlice.reducer;
