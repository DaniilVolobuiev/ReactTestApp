import { configureStore } from '@reduxjs/toolkit';

import itemsReducer from './slices/ItemSlice';
import filterReducer from './slices/FilterSlice';

export const store = configureStore({
  reducer: { itemsReducer, filterReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
