import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";
import updateFormReducer from "../features/updateFormSlice";
import userReducer from "../features/userSlice";

const createDebugger = require("redux-flipper").default;

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    updateForm: updateFormReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(createDebugger()),
});
