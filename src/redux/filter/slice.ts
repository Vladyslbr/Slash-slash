import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { FilterSliceTypes, SortItemType } from "../../types";

const initialState: FilterSliceTypes = {
   urlParams: null,
   category: null,
   sort: {
      name: "created-descending",
      sortProp1: "created",
      sortProp2: "desc",
   },
   searchValue: null,
   bin: false,
};

export const sortList: SortItemType[] = [
   {
      name: "created-ascending",
      sortProp1: "created",
      sortProp2: "asc",
   },
   {
      name: "created-descending",
      sortProp1: "created",
      sortProp2: "desc",
   },
   {
      name: "edited-ascending",
      sortProp1: "edited",
      sortProp2: "asc",
   },
   {
      name: "edited-descending",
      sortProp1: "edited",
      sortProp2: "desc",
   },
];

const filterSlice = createSlice({
   name: "filter",
   initialState,
   reducers: {
      setUrlParams(state, action: PayloadAction<string>) {
         state.urlParams = action.payload;
      },
      setActiveCategory(state, action: PayloadAction<string | null>) {
         state.category = action.payload;
      },
      setSorting(state, action: PayloadAction<SortItemType>) {
         state.sort = action.payload;
      },
      setSearchValue(state, action: PayloadAction<string>) {
         state.searchValue = action.payload;
      },
      setBin(state, action: PayloadAction<boolean>) {
         state.bin = action.payload;
      },
   },
});

export const {
   setActiveCategory,
   setSorting,
   setSearchValue,
   setUrlParams,
   setBin,
} = filterSlice.actions;

export default filterSlice.reducer;
