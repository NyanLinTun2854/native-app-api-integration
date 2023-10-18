import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postFetcher } from "../api/configs/axiosConfig";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { HOME_PAGE } from "../configs/route";
import { storeAuthToken } from "../utils/asyncStorage";
import { useRouter } from "expo-router";

const initialState = {
  username: "",
  usertoken: "",
};

const router = useRouter();

export const loginFunc = createAsyncThunk(
  "user/login",
  async (value, { rejectWithValue }) => {
    console.log(value, "loginFunc");
    try {
      let response = await postFetcher(
        "http://54.169.108.176:8000/api/login",
        value
      );
      console.log(response);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateAuthToken: (state, action) => {
      state.usertoken = action.payload;
    },
    updateUserName: (state, action) => {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginFunc.fulfilled, (state, action) => {
      const setUserAuth = async () => {
        if (action.payload.token) {
          try {
            await storeAuthToken("AUTH_TOKEN", action.payload.token);
            await storeAuthToken("USER_NAME", action.payload.username);
          } catch (err) {
            console.log(err);
          }
        }
      };
      state.username = action.payload.username;
      state.usertoken = action.payload.token;

      Toast.show({
        visibilityTime: 2000,
        type: "success",
        text1: "Success",
        text2: "Login Successful",
      });
      setUserAuth();

      setTimeout(() => {
        router.push(HOME_PAGE);
      }, 2000);
    });
  },
});

// Action creators are generated for each case reducer function
export const { updateAuthToken, updateUserName } = userSlice.actions;

export default userSlice.reducer;
