import { configureStore } from '@reduxjs/toolkit'
import doctorApi from '../api/doctorsAPI';
import authenticationApi from '../api/authenticationAPI';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [doctorApi.reducerPath]: doctorApi.reducer,
    [authenticationApi.reducerPath]: authenticationApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        doctorApi.middleware,
        authenticationApi.middleware
    ),
})

export default store;
