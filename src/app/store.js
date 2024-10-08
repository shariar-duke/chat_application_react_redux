/* eslint-disable no-undef */
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import conversationsReducer from "../features/conversations/conversationSlice";
import messagesReducer from "../features/messages/messagesSlice";
export const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth:authSliceReducer,
        conversations:conversationsReducer,
        messagesReducer:messagesReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware:(getDefaultMiddlewares) => getDefaultMiddlewares().concat(apiSlice.middleware)
})