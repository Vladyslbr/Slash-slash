import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";

import "../scss/bin-page.scss";
import ErrorPage from "./ErrorPage";
import {
   Content,
   CategoriesTopBar,
   BackBtn,
   PermanentRemoveBtn,
} from "../components/";
import { selectData } from "../redux/data/selectors";
import { selectFilter } from "../redux/filter/selectors";
import { getData } from "../redux/data/base";
import { makeParse, makeUrl } from "../utils";
import { setBin } from "../redux/filter/slice";

function Bin() {
   const dispatch = useAppDispatch();

   const isSearch = React.useRef(false);
   const isMounted = React.useRef(false);

   const navigate = useNavigate();

   const { error } = useSelector(selectData);
   const { category, sort, searchValue, urlParams } = useSelector(selectFilter);

   React.useEffect(() => {
      if (window.location.search) {
         makeParse(dispatch);
         isSearch.current = true;
      }
   }, [dispatch]);

   React.useEffect(() => {
      if (!isSearch.current) {
         makeUrl({ sort, category, searchValue, bin: true, dispatch });
         dispatch(setBin(true));
         dispatch(getData());
      }

      isSearch.current = false;
   }, [sort, category, searchValue, dispatch]);

   React.useEffect(() => {
      if (isMounted.current && urlParams) {
         navigate(`?${urlParams}`);
      }

      isMounted.current = true;
   }, [sort, category, searchValue, urlParams, navigate]);

   if (error) {
      return <ErrorPage errCode="404" message={`Redux problem: ${error}`} />;
   }

   return (
      <div className="main__wrapper-bin">
         <div className="top-menu">
            <BackBtn />
            <PermanentRemoveBtn />
            <CategoriesTopBar />
         </div>
         <Content noteType={"bin"} />
      </div>
   );
}

export default Bin;
