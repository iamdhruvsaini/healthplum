// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseURL } from '../../utils/getBaseURL';
import { bookAppointment } from '../../../../backend/controllers/appointmentBooking';

// Define a service using a base URL and expected endpoints
export const patientApi = createApi({
  reducerPath: 'patientApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${getBaseURL()}/api` }),
  endpoints: (builder) => ({
    bookAppointment: builder.mutation({
        query: (FormData) => ({
          url: `/book/appointment`,
          method: 'POST',
          body: FormData,
        }),
      }),
    
  }),
})

export const { useFetchDoctorsQuery,useFetchDoctorsByIdQuery} = doctorApi;
export default doctorApi ;