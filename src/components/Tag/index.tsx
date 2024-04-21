import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";

import { selectFilter } from "../../redux/filter/selectors";
import { setActiveCategory } from "../../redux/filter/slice";
import { deleteTag, getTag } from "../../redux/data/base";
import { TagType } from "../../types";
import { SubmitTag } from "./SubmitTag";

type TagProps = {
   tag?: TagType;
   tagId?: string;
   noteId?: string;
   categoryTag?: boolean;
   withNoEdit?: boolean;
   onClickCategory?: boolean;
};

export const Tag: React.FC<TagProps> = ({
   tag,
   noteId,
   tagId,
   categoryTag = false,
   withNoEdit = false,
   onClickCategory = true,
}) => {
   const dispatch = useAppDispatch();

   const { category } = useSelector(selectFilter);

   const [tagDisplay, setTagDisplay] = React.useState(true);

   let tagObj;

   if (tagId) {
      tagObj = dispatch(getTag(tagId));
   } else if (tag) {
      tagObj = tag;
   } else {
      throw new Error("Tag object or a tagId must be provided");
   }

   const { id, name } = tagObj;

   const activeTag = (name: string | null) => {
      category === name
         ? dispatch(setActiveCategory(null))
         : dispatch(setActiveCategory(name));
   };

   return (
      <div
         key={name}
         onClick={() => onClickCategory && activeTag(name)}
         className={
            name === category
               ? tagDisplay
                  ? "tag-active"
                  : "tag-input"
               : tagDisplay
                 ? "tag"
                 : "tag-input"
         }
      >
         <div
            onClick={(e) => {
               e.stopPropagation();
               noteId
                  ? dispatch(deleteTag({ id, noteId }))
                  : window.confirm("Remove tag from all notes?") &&
                    dispatch(deleteTag({ id }));
            }}
            className={
               noteId ? "tag__remove" : "tag__remove tag__remove-category"
            }
            title={
               noteId
                  ? "Remove tag only from this note"
                  : "Remove tag from all notes"
            }
         >
            <svg
               width="20"
               height="20"
               viewBox="0 0 16 16"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
            >
               <rect
                  width="16"
                  height="16"
                  rx="4"
                  fill="#777777"
                  fillOpacity="0.08"
               />
               <path
                  d="M11.6589 11.2905L9.02632 7.99999L11.6589 4.70952C11.9431 4.35427 12.1835 4.12855 11.6589 3.4271C11.0977 2.67674 10.9171 3.07185 10.6329 3.4271L8.0003 6.71757L5.36772 3.4271C5.0835 3.07185 4.90289 2.67675 4.3417 3.4271C3.74137 4.12855 4.05748 4.35427 4.3417 4.70952L6.97428 7.99999L4.3417 11.2905C4.05748 11.6457 3.74137 11.8715 4.3417 12.5729C4.90291 13.3233 5.0835 12.9281 5.36772 12.5729L8.0003 9.28242L10.6329 12.5729C10.9171 12.9281 11.0977 13.3233 11.6589 12.5729C12.2593 11.8715 11.9411 11.6432 11.6589 11.2905Z"
                  fill="#111111"
               />
            </svg>
         </div>
         <span className={categoryTag ? "tag-text-category" : ""}>{name}</span>
         {!withNoEdit && (
            <SubmitTag editTagObj={{ tagId: id, tagDisplay, setTagDisplay }} />
         )}
      </div>
   );
};

export * from "./SubmitTag";
export * from "./TagsActions";