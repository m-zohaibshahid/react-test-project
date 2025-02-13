import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default to localStorage\

// Configuration for Redux Persist
const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['user'], // Optionally, specify which reducers you want to persist
  // Use a custom serializable check for redux-persist to handle non-serializable values
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  // Optionally handle serializability check (ensure no non-serializable actions)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // Ignore persist actions from serializability checks
      },
    }),
});

// Create a persistor for redux-persist
export const persistor = persistStore(store);

// Exporting the store for use in your components
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const appDispatch = store.dispatch;
