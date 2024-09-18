import { apiSlice } from "../api/apiSlice";
import { messagesApi } from "../messages/messagesApi";

export const conversationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: (email) =>
        `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=${
          import.meta.env.VITE_CONVERSATION_PER_PAGE
        }`,
    }),

    getConversation: builder.query({
      query: ({ userEmail, participantEmail }) =>
        `/conversations?participants_like=${userEmail}-${participantEmail}&participants_like=${participantEmail}-${userEmail}`,
    }),

    addConversation: builder.mutation({
      query: ({ sender, data }) => ({
        url: "/conversations",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // Optimistic update for conversation cache
        const pathResult1 = dispatch(
          apiSlice.util.updateQueryData(
            "getConversations",
            arg.sender,
            (draft) => {
              const draftConversation = draft.find((c) => c.id === arg.data.id);
              if (draftConversation) {
                draftConversation.message = arg.data.message;
                draftConversation.timestamp = arg.data.timestamp;
              } else {
                console.warn(`Conversation with id ${arg.data.id} not found in cache`);
              }
            }
          )
        );

        try {
          const conversation = await queryFulfilled;
          if (conversation?.data?.id) {
            const users = arg.data.users || [];
            const senderUser = users.find((user) => user.email === arg.sender);
            const receiverUser = users.find((user) => user.email !== arg.sender);

            try {
              const messageResponse = await dispatch(
                messagesApi.endpoints.addMessages.initiate({
                  conversationId: conversation?.data?.id,
                  sender: senderUser,
                  receiver: receiverUser,
                  message: arg?.data?.message,
                  timestamp: arg?.data?.timestamp,
                })
              ).unwrap();


              console.log("Message added or updated:", messageResponse);
            } catch (err) {
              console.error("Failed to post message:", err);
              // Optionally handle retries or recovery here
            }
          }
        } catch (err) {
          pathResult1.undo();
          console.error("Error while adding conversation:", err);
        }
      },
    }),

    editConversation: builder.mutation({
      query: ({ id, data, sender }) => ({
        url: `/conversations/${id}`,
        method: "PATCH",
        body: data,
      }),
    
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // Optimistic update for conversation cache
        const pathResult1 = dispatch(
          apiSlice.util.updateQueryData(
            "getConversations",
            arg.sender,
            (draft) => {
              const draftConversation = draft.find(
                (c) => c.id === arg.id
              );
              if (draftConversation) {
                draftConversation.message = arg.data.message;
                draftConversation.timestamp = arg.data.timestamp;
              }
            }
          )
        );
    
        try {
          const conversation = await queryFulfilled;
          if (conversation?.data?.id) {
            const users = arg.data.users || [];
            const senderUser = users.find((user) => user.email === arg.sender);
            const receiverUser = users.find((user) => user.email !== arg.sender);
    
            try {
              const messageResponse = await dispatch(
                messagesApi.endpoints.addMessages.initiate({
                  conversationId: conversation?.data?.id,
                  sender: senderUser,
                  receiver: receiverUser,
                  message: arg.data.message,
                  timestamp: arg.data.timestamp,
                })
              ).unwrap();
    
              console.log("Message added or updated:", messageResponse);
            } catch (err) {
              console.error("Failed to post message:", err);
              pathResult1.undo(); // Roll back optimistic update if message fails
            }
          }
        } catch (err) {
          pathResult1.undo();
          console.error("Error while editing conversation:", err);
        }
      },
    }),
    
    
  }),
});

export const {
  useGetConversationsQuery,
  useGetConversationQuery,
  useAddConversationMutation,
  useEditConversationMutation,
} = conversationsApi;
