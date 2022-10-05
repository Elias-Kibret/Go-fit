import { createSlice } from '@reduxjs/toolkit';
import { Exercise } from '../utils/type';

const initialState: Exercise[] = [];

export const exerciseSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setExercises(state, { payload }) {
      console.log('exerciseSlice.setxercises', { state, payload });
      state = payload;
      return state;
    },
  },
});

export const { setExercises } = exerciseSlice.actions;
export default exerciseSlice.reducer;
