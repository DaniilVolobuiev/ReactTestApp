import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface FilterSliceState {
  searchValue: string;
}

const initialState: FilterSliceState = {
  searchValue: '',
};

export const filterReducer = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});
export const { setSearchValue } = filterReducer.actions;

export default filterReducer.reducer;
