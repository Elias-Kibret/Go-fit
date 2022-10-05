import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  firstName: '',
  lastName: '',
  email: '',
  authError: '',
};

export type AuthenticatedUser = typeof initialState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(_, { payload }) {
      return { ...payload, authError: '' };
    },
    clearUser() {
      return { ...initialState };
    },
    setAuthError(_, { payload }) {
      return { ...initialState, authError: payload };
    },
  },
});

export const { setUser, clearUser, setAuthError } = userSlice.actions;
export default userSlice.reducer;
