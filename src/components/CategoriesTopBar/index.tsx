import React from "react";
import { useSelector } from "react-redux";

import CategoriesTagsSkeleton from "./CategoriesTagsSkeleton";
import { selectData } from "../../redux/data/selectors";
import { Tag } from "../";
import { Status, TagType } from "../../types";

export const CategoriesTopBar = () => {
   const { status, tags } = useSelector(selectData);

   // React.useEffect(() => {
   //    const handleClick = (event) => {
   //       const path = event.composedPath();
   //       const arr = path.map(obj =>
   //          obj.className === "topbar-categories" || obj.className === "note-container" || obj.className === "header__wrapper-search-actions" || obj.className === "topbar-sort"
   //          ? obj
   //          : null).filter(item => item !== null)
   //       if ((category === 0 || category) && !arr.length) {
   //          setActiveCategory();
   //       }
   //    };
   //    document.body.addEventListener("click", handleClick)

   //    return () => document.body.removeEventListener("click", handleClick)
   // });

   return (
      <div className="topbar-categories">
         <span>Tags:</span>
         <div className="topbar-categories__wrapper-tags">
            {status === Status.LOADING
               ? [...new Array(4)].map((_, index) => {
                    return <CategoriesTagsSkeleton key={index} />;
                 })
               : status === "success"
                 ? tags.map((tag: TagType) => (
                      <Tag key={tag.id} tag={tag} categoryTag={true} />
                   ))
                 : ""}
         </div>
      </div>
   );
};
