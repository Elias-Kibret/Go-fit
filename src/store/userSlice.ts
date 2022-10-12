import { createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

const initialState = {
  value: {},
  user: null as User | null,
  authError: null as null | string,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }: { payload: User }) {
      state.authError = null;
      state.user = payload;
      console.log('USER', state.user);
    },
    clearUser(state) {
      state.authError = null;
      state.user = null;
    },

    setAuthError(state, { payload }: { payload: string }) {
      state.authError = payload;
    },
  },
});

export const { setUser, clearUser, setAuthError } = userSlice.actions;
export default userSlice.reducer;
