import { apiSlice } from "../api/apiSlice";

export const messages = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query({
          query: (id) =>
            `/messages?conversationId=${id}&_sort=timestamp&_order=desc&_page=1&_limit=${
              import.meta.env.VITE_MESSAGE_PER_PAGE
            }`,
        }),
      }),
})

export const { useGetMessagesQuery } = messages;