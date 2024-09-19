import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api", 
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,  // Correct Vite way to access env variables
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.accessToken;
      console.log('Token in prepareHeaders:', token); 
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [],  // You can define your tagTypes here for cache management
  endpoints: (builder) => ({
    // Define your endpoints here
  }),
});
