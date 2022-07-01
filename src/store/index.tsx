import { configureStore } from "@reduxjs/toolkit";
import userinfo from "./userinfo";
export default configureStore({
  reducer: {
    userinfo,
  },
});
