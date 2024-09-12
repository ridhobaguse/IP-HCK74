import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    error: null,
    loading: false,
  },
  reducers: {
    createProfileRequest(state) {
      state.loading = true;
    },
    createProfileSuccess(state, action) {
      state.loading = false;
      state.profile = action.payload;
      state.error = null;
    },
    createProfileFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearProfile(state) {
      state.profile = null;
      state.error = null;
    },
  },
});

export const {
  createProfileRequest,
  createProfileSuccess,
  createProfileFailure,
  clearProfile,
} = profileSlice.actions;

export default profileSlice.reducer;

export const createProfile = (profileData) => async (dispatch) => {
  dispatch(createProfileRequest());
  try {
    const response = await axios.get(
      `https://valcom.ekasanjaya.my.id/mp/myprofiles`,
      profileData
    );
    dispatch(createProfileSuccess(response.data));
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "An error occurred";
    dispatch(createProfileFailure(errorMessage));
  }
};
