import qs from "qs";

import { setActiveCategory, setSearchValue, setSorting, setUrlParams, sortList } from "../redux/filter/slice";
import { AppDispatch } from "../redux/store";
import { SortItemType } from "../types";

type MakeUrlType = {
    sort: SortItemType;
    category: string | null;
    searchValue: string | null;
    bin: boolean;
    dispatch: AppDispatch;
};

export const makeUrl = ({sort, category, searchValue, bin, dispatch}: MakeUrlType) => {
    let newURL;
    newURL = `_sort=${sort.sortProp1}&_order=${sort.sortProp2}`;
    //newURL = newURL + "&bin=" + bin.toString();
    newURL = category ? newURL + `&tags_like=${category}` : newURL;
    newURL = searchValue
       ? newURL + `&text_like=${searchValue.toLowerCase()}`
       : newURL;
    dispatch(setUrlParams(newURL));
};

export const makeParse = (dispatch: AppDispatch) => {
    const parse = qs.parse(window.location.search.substring(1));
    const foundCategory = parse.tags_like as string | undefined;
    if (foundCategory !== undefined) {
       dispatch(setActiveCategory(foundCategory));
    };
    const foundObj = sortList.find(
       (obj) =>
          obj.sortProp1 === parse._sort && obj.sortProp2 === parse._order,
    ) as SortItemType;
    dispatch(setSorting(foundObj));
    const foundSearch = parse.text_like as string | undefined;
    if (foundSearch) {
       dispatch(setSearchValue(foundSearch));
    };
};

export * from "./msgDictionary";