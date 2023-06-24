import { configureStore } from '@reduxjs/toolkit';
import jokesSlice from '../features/jokes';

export const store = configureStore({
  reducer: {
    jokes: jokesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
