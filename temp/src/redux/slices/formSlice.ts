import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

const initialState: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<{ field: keyof FormState; value: string }>) => {
      state[action.payload.field] = action.payload.value;
    },
    submitForm: (state) => {
      console.log("Form Data Submitted:", state);
    },
  },
});

export const { updateField, submitForm } = formSlice.actions;
export default formSlice.reducer;
