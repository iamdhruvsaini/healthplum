// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseURL } from '../../utils/getBaseURL';

// Define a service using a base URL and expected endpoints
export const authenticationApi = createApi({
  reducerPath: 'authenticationApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${getBaseURL()}/api/authentication` }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (FormData) => ({
        url: `/register`,
        method: 'POST',
        body: FormData,
      }),
    }),
    loginUser: builder.mutation({
      query: (FormData) => ({
        url: `/login`,
        method: 'POST',
        body: FormData,
      }),
    }),
  }),
})

export const {useLoginUserMutation,useRegisterUserMutation} = authenticationApi;
export default authenticationApi ;