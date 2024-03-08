import { createSlice, configureStore } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    name: '',
    uid: '',
    isAuthenticated: false, // Add a flag to track authentication status
  },
  reducers: {
    login: (state, action) => {
      state.name = action.payload.name;
      state.uid = action.payload.uid;
      state.isAuthenticated = true;
    },
    logout: state => {
      state.name = '';
      state.uid = '';
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

// Configure the store with the authSlice reducer
const store = configureStore({
  reducer: authSlice.reducer,
});
