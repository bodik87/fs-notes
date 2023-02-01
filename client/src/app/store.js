import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "../app/notes/notesSlice";
import authSlice from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    notes: notesSlice,
  },
});
