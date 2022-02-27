import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    userAuthInfo: { userName: "", email: "", password: "" },
    userData: {
      marks: "",
      economicStability: "",
      personality: "",
      agreeableness: "",
      openness: "",
      areaOfInterests: "",
    },
  },
  reducers: {
    signUp(state, action) {
      state.userAuthInfo = action.payload.userAuthInfo;
    },
    login(state, action) {
      state.userAuthInfo = action.payload.userAuthInfo;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});
export const userActions = userSlice.actions;
export default userSlice;
