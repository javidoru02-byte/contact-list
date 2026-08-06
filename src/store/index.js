import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./slices/contactSlice";

export default configureStore({
  reducer: {
    contacts: contactReducer,
  },
});
