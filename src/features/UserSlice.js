import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    user: null,
    isAdmin: false,
    nameUser: "",
  },
  reducers: {
    login: (state, action) => {
      const newUser = action.payload;
      const existingUsers = JSON.parse(JSON.stringify(newUser));
      state.user = existingUsers;

      state.user = state.user;
      state.isAuthenticated = true;
      console.log("LOGIN", state);
      state.nameUser = state.user.user_name;
      if (state.user.User_type === "admin") {
        state.isAdmin = true;
        console.log(state.isAdmin);
      }
      console.log("state.user", state.user);
      console.log("state.nameUser", state.nameUser);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = UserSlice.actions;
export const selectUser = (state) => state.user.isAuthenticated;
export const selectUserName = (state) => state.user.user;
export const selectUserAdmin = (state) => state.user.user;
export default UserSlice.reducer;
