// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseURL } from '../../utils/getBaseURL';


// Define a service using a base URL and expected endpoints
export const patientApi = createApi({
  reducerPath: 'patientApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${getBaseURL()}/api` }),
  endpoints: (builder) => ({
    bookAppointment: builder.mutation({
        query: (FormData) => ({
          url: `/patients/book-appointment`,
          method: 'POST',
          body: FormData,
        }),
    }),
    getPatientAppointments: builder.query({
        query: (patientId) => `/patients/get-appointments/${patientId}`,
    }),
    getPatientDetails: builder.query({
      query: (patientId) => `/patients/patient-details/${patientId}`,
  }),
  }),
})

export const {useBookAppointmentMutation,useGetPatientAppointmentsQuery,useGetPatientDetailsQuery} = patientApi;
export default patientApi ;