import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectFilter } from "../redux/filter/selectors";
import { setSorting, sortList } from "../redux/filter/slice";
import { SortItemType } from "../types";

export const SortTopBar = () => {
   const dispatch = useDispatch();
   const { sort } = useSelector(selectFilter);

   const [showPopup, setShowPopup] = React.useState(false);
   const popupRef = React.useRef(null);
   const sortRef = React.useRef(null);

   React.useEffect(() => {
      const handleClick = (event: any) => {
         const path = event.composedPath();
         if (
            popupRef.current &&
            !path.includes(popupRef.current) &&
            !path.includes(sortRef.current)
         ) {
            setShowPopup(false);
         }
      };

      document.body.addEventListener("click", handleClick);

      return () => document.body.removeEventListener("click", handleClick);
   }, []);

   const changeSort = (item: SortItemType) => {
      dispatch(setSorting(item));
      setShowPopup(!showPopup);
   };

   return (
      <div className="topbar-sort">
         <div ref={sortRef} className="topbar-sort-label">
            <span>Sort by:</span>
            <span
               onClick={() => setShowPopup(!showPopup)}
               className="topbar-sort-label__list"
            >
               {sort.name}
            </span>
            <div className="icon-sort-triangle">
               <svg
                  width="14"
                  height="12"
                  viewBox="0 0 14 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     d="M7.79764 10.521L12.4741 2.10448C12.9954 1.16735 13.2554 0.698424 13.05 0.349212C12.8446 2.11102e-08 12.3084 0 11.2359 0L1.88441 0C0.811984 0 0.27577 2.11102e-08 0.0703514 0.349212C-0.135067 0.698424 0.124894 1.16735 0.646232 2.10448L5.32128 10.521C5.86954 11.507 6.14296 12 6.56017 12C6.97667 12 7.25009 11.507 7.79764 10.521Z"
                     fill="white"
                  />
               </svg>
            </div>
         </div>
         {showPopup && (
            <div ref={popupRef} className="topbar-sort-popup">
               <ul>
                  {sortList.map((item, index) => {
                     return (
                        <li
                           key={item.name}
                           onClick={() => changeSort(item)}
                           className={sort.name === item.name ? "active" : ""}
                        >
                           {item.name}
                        </li>
                     );
                  })}
               </ul>
            </div>
         )}
      </div>
   );
};
