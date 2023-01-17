import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface ItemInterface {
  id: number;
  title: string;
  events: string[];
  featured: boolean;
  imageUrl: string;
  launches: string[];
  newsSite: string;
  publishedAt: string;
  summary: string;
  updatedAt: string;
  url: string;
}

export const getItems = createAsyncThunk(
  'items/getItemsStatus',
  async (params: Record<string, string>) => {
    const { searchValue } = params;
    const response = await axios.get(`https://api.spaceflightnewsapi.net/v3/articles`);

    return response.data as ItemInterface[];
  },
);

interface ItemsSliceState {
  items: ItemInterface[];
  status: 'loading' | 'success' | 'error';
}

const initialState: ItemsSliceState = {
  items: [],
  status: 'loading',
};

export const itemsReducer = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getItems.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(getItems.fulfilled, (state, action) => {
      state.status = 'success';
      state.items = action.payload;
    });
    builder.addCase(getItems.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    });
  },
});
export const { setItems } = itemsReducer.actions;

export default itemsReducer.reducer;
