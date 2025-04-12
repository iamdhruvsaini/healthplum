import { configureStore } from '@reduxjs/toolkit'
import doctorApi from '../api/doctorsAPI';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [doctorApi.reducerPath]: doctorApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        doctorApi.middleware
    ),
})

export default store;
