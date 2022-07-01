import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userinfo: [],
};

const userinfo = createSlice({
  name: "userinfo",
  initialState,
  reducers: {
    saveUserInfo: (state, { payload }) => {
      state.userinfo = payload.profile;
    },
  },
});

export const { saveUserInfo } = userinfo.actions;
export default userinfo.reducer;
