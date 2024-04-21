import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import "../scss/main.scss";
import {
   Content,
   AddNoteBtn,
   SortTopBar,
   Categories,
} from "../components";
import ErrorPage from "./ErrorPage";
import { selectData } from "../redux/data/selectors";
import { selectFilter } from "../redux/filter/selectors";
import { setBin } from "../redux/filter/slice";
import { getData } from "../redux/data/base";
import { makeParse, makeUrl } from "../utils";

const Home = () => {

   // Redux setup
   const dispatch = useAppDispatch();
   const { error } = useSelector(selectData);
   const { category, sort, searchValue, urlParams } = useSelector(selectFilter);

   // Navigation and URL parsing setup
   const navigate = useNavigate();
   const isSearch = React.useRef(false);
   const isMounted = React.useRef(false);

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
         // Generate URL and update Redux state
         makeUrl({ sort, category, searchValue, bin: false, dispatch });
         // Reset bin filter
         dispatch(setBin(false));
         // Fetch data based on filters
         dispatch(getData());
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

   if (error) {
      return <ErrorPage errCode={"404"} message={`${error}`} />;
   }

   return (
      <div className="main__wrapper" data-testid="main__wrapper">
         <div className="topbar" data-testid="topbar">
            <div className="topbar__wrapper-add-note-sort">
               <AddNoteBtn />
               <SortTopBar />
            </div>
            <Categories />
         </div>
         <Content />
      </div>
   );
};

export default Home;
