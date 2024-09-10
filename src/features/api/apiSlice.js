 
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api", 
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,  // Correct Vite way to access env variables
    }),
    tagTypes: [],
    endpoints: (builder) => ({   
        // Define your endpoints here
    })
});
