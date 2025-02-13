import { createSlice } from '@reduxjs/toolkit';

interface FormState {
  formData: {
    name: string;
    email: string;
    message: string;
  };
  isSubmitting: boolean;
}

const initialState: FormState = {
  formData: {
    name: '',
    email: '',
    message: '',
  },
  isSubmitting: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },
    submitForm: (state) => {
      state.isSubmitting = true;
    },
    submitFormSuccess: (state) => {
      state.isSubmitting = false;
      state.formData = initialState.formData;
    },
    submitFormError: (state) => {
      state.isSubmitting = false;
    },
    resetFormData: (state) => {
      state.formData = initialState.formData;
      state.isSubmitting = false;
    },
  },
});

export const { updateField, submitForm, submitFormSuccess, submitFormError, resetFormData } = formSlice.actions;
export default formSlice.reducer;