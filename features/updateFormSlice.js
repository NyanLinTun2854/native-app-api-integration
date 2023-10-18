import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  content: "",
  slug: "",
};

export const updateFormSlice = createSlice({
  name: "updateForm",
  initialState,
  reducers: {
    updateFormTitle: (state, action) => {
      state.title = action.payload;
    },
    updateFormContent: (state, action) => {
      state.content = action.payload;
    },
    updateSlug: (state, action) => {
      state.slug = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateFormContent, updateFormTitle, updateSlug } =
  updateFormSlice.actions;

export default updateFormSlice.reducer;
