import { configureStore } from '@reduxjs/toolkit';
import networkReducer from './networkSlice';

export const store = configureStore({
  reducer: {
    networks: networkReducer,
  },
});
