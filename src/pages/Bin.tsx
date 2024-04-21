import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";

import "../scss/bin-page.scss";
import ErrorPage from "./ErrorPage";
import {
   Content,
   Categories,
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

   // Refs to track URL search state and component mount state
   const isSearch = React.useRef(false);
   const isMounted = React.useRef(false);

   // Navigation setup
   const navigate = useNavigate();

   // Redux state selectors
   const { error } = useSelector(selectData);
   const { category, sort, searchValue, urlParams } = useSelector(selectFilter);

   // Parse URL parameters on component mount
   React.useEffect(() => {
      if (window.location.search) {
         makeParse(dispatch);
         isSearch.current = true;
      }
   }, [dispatch]);

   // Update URL parameters and fetch data when filter changes
   React.useEffect(() => {
      if (!isSearch.current) {
         // Generate URL and update Redux state for bin view
         makeUrl({ sort, category, searchValue, bin: true, dispatch });
         dispatch(setBin(true)); // Set filter to show bin notes
         dispatch(getData()); // Fetch data for bin notes
      }
      isSearch.current = false;
   }, [sort, category, searchValue, dispatch]);

   // Navigate to updated URL when filters change
   React.useEffect(() => {
      if (isMounted.current && urlParams) {
         navigate(`?${urlParams}`);
      }
      isMounted.current = true;
   }, [sort, category, searchValue, urlParams, navigate]);

   // Render error page if there's a Redux error
   if (error) {
      return <ErrorPage errCode="404" message={`Redux problem: ${error}`} />;
   }

   // Render the bin page with top menu and content
   return (
      <div className="main__wrapper-bin">
         <div className="top-menu">
            <BackBtn />
            <PermanentRemoveBtn />
            <Categories />
         </div>
         <Content noteType={"bin"} />
      </div>
   );
}

export default Bin;
