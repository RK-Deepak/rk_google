import { createSlice } from "@reduxjs/toolkit";

const SearchSlice = createSlice({
  name: "search",
  initialState: {
    datavalue: null,
    searchterm: "",
    searchsuggestion: null,
    isfocused: true,
  },
  reducers: {
    changevalue: (state, action) => {
      return {
        ...state,
        datavalue: action.payload,
      };
    },
    removeAllvalue: (state) => {
      return {
        ...state,
        datavalue: null,
      };
    },
    setsearchterm: (state, action) => {
      return {
        ...state,
        searchterm: action.payload,
      };
    },
    setsearchsuggestion: (state, action) => {
      return {
        ...state,
        searchsuggestion: action.payload,
      };
    },
    clearsuggestion: (state, action) => {
      return {
        ...state,
        searchsuggestion: null,
      };
    },
    setfocused: (state, action) => {
      return {
        ...state,
        isfocused: action.payload,
      };
    },
  },
});
export default SearchSlice.reducer;
export const {
  changevalue,
  removeAllvalue,
  setsearchterm,
  setsearchsuggestion,
  clearsuggestion,
  setfocused,
} = SearchSlice.actions;
