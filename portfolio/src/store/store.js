import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatSlice';

const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['chat/addMessage'],
        // Ignore these field paths in all actions
        ignoredActionsPaths: ['payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['chat.messages.timestamp'],
      },
    }),
});

export default store;

