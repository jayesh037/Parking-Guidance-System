import { configureStore } from '@reduxjs/toolkit';
import parkingReducer from './parkingSlice';

const store = configureStore({
  reducer: {
    parking: parkingReducer,
  },
});

export default store;
