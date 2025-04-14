// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseURL } from '../../utils/getBaseURL';

// Define a service using a base URL and expected endpoints
export const doctorApi = createApi({
  reducerPath: 'doctorApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${getBaseURL()}/api/doctors` }),
  endpoints: (builder) => ({
    fetchDoctors: builder.query({
      query: () => `get-doctors/`,
    }),
    fetchDoctorsById: builder.query({
      query: (id) => `get-doctors/${id}`,
    }),
    fetchTrendingDoctors: builder.query({
      query: () => `get-trending-doctor/`,
    }),
    fetchAppointmentByDoctorID: builder.query({
      query: (id) => `get-appointment-by-doctor-id/${id}`,
    }),
  }),
})

export const {
   useFetchDoctorsQuery,
   useFetchDoctorsByIdQuery,
   useFetchTrendingDoctorsQuery,
   useFetchAppointmentByDoctorIDQuery,
  } = doctorApi;
  
export default doctorApi ;