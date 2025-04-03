import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer"; // Ensure correct import

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store; // Ensure correct export
