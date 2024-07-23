import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import dataReducer from './dataSlice';
import { thunk } from 'redux-thunk';

export const store = configureStore({
  reducer: {
    user: userReducer,
    data: dataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
