import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseURL } from '../../utils/getBaseURL';

export const patientApi = createApi({
  reducerPath: 'patientApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${getBaseURL()}/api` }),
  tagTypes: ['Appointments', 'Patient'], // define tag types
  endpoints: (builder) => ({
    bookAppointment: builder.mutation({
      query: (FormData) => ({
        url: `/patients/book-appointment`,
        method: 'POST',
        body: FormData,
      }),
      invalidatesTags: ['Appointments'], // invalidate appointments to refetch updated data
    }),

    getPatientAppointments: builder.query({
      query: (patientId) => `/patients/get-appointments/${patientId}`,
      providesTags: ['Appointments'], // associate this data with the Appointments tag
    }),

    getPatientDetails: builder.query({
      query: (patientId) => `/patients/patient-details/${patientId}`,
      providesTags: ['Patient'], // tag to help refetch patient details if needed
    }),

    cancelAppointment: builder.mutation({
      query: (appointmentId) => ({
        url: `/patients/cancel-appointment/${appointmentId}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Appointments'], // ensures UI refreshes appointment list
    }),

    getPatientProfile: builder.query({
      query: (patientId) => `/patients/get-patient-profile/${patientId}`,
      providesTags: ['Patient'], // tag to help refetch patient profile if needed
    }),

  }),
});

export const {
  useBookAppointmentMutation,
  useGetPatientAppointmentsQuery,
  useGetPatientDetailsQuery,
  useCancelAppointmentMutation,
  useGetPatientProfileQuery
} = patientApi;

export default patientApi;
