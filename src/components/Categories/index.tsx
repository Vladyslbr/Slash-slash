import React from "react";
import { useSelector } from "react-redux";

//import CategoriesTagsSkeleton from "./CategoriesTagsSkeleton";
import { selectData } from "../../redux/data/selectors";
import { Tag } from "../";
import { Status, TagType } from "../../types";
import { selectFilter } from "../../redux/filter/selectors";
import { useAppDispatch } from "../../redux/store";
import { setActiveCategory } from "../../redux/filter/slice";

export const Categories = () => {
   const { status, tags } = useSelector(selectData);
   const { category } = useSelector(selectFilter);
   const dispatch = useAppDispatch();

   React.useEffect(() => {
      const handleClick = (event: any) => {
         const path = event.composedPath();
         const arr = path
            .map((obj: any) =>
               obj.className === "topbar-categories" ||
               obj.className === "note-container" ||
               obj.className === "header__wrapper-search-actions" ||
               obj.className === "topbar-sort"
                  ? obj
                  : null,
            )
            .filter((item: string[]) => item !== null);
         if ((category === null || category) && !arr.length) {
            dispatch(setActiveCategory(null));
         }
      };
      document.body.addEventListener("click", handleClick);

      return () => document.body.removeEventListener("click", handleClick);
   });

   return (
      <div className="topbar-categories">
         {tags.length > 0 ? (
            <>
               <span>Tags:</span>
               <div className="topbar-categories__wrapper-tags">
                  {status === Status.LOADING ? (
                     // ? [...new Array(4)].map((_, index) => {
                     //      return <CategoriesTagsSkeleton key={index} />;
                     //   })
                     <></>
                  ) : (
                     status === Status.SUCCESS &&
                     tags.map((tag: TagType) => (
                        <Tag key={tag.id} tag={tag} categoryTag={true} />
                     ))
                  )}
               </div>
            </>
         ) : (
            ""
         )}
      </div>
   );
};
