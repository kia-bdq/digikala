import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer,  FLUSH,  REHYDRATE,  PAUSE,  PERSIST,  PURGE,  REGISTER,} from 'redux-persist'
import cartReducer from './cartSlice';

const rootReducer = combineReducers(
  {
    cart : cartReducer
  }
)

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
