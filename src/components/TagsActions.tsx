import React from "react";
import { useAppDispatch } from "../redux/store";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

import { checkTagDuplicate } from "../redux/data/utils";
import { patchTag, postTag } from "../redux/data/base";

type HideTagsProps = {
   isRotated: boolean;
   onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export const TagsHide: React.FC<HideTagsProps> = ({ isRotated, onClick }) => {
   return (
      <div
         onClick={onClick}
         className={isRotated ? "tags-hide rotate-180" : "tags-hide"}
      >
         <div className="tags-hide-icon">
            <svg
               width="11"
               height="10"
               viewBox="0 0 11 10"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path
                  className={isRotated ? "rotate-180" : ""}
                  d="M6.49805 8.76749L10.3951 1.75373C10.8296 0.972788 11.0462 0.58202 10.875 0.29101C10.7038 1.75918e-08 10.257 0 9.36329 0L1.57036 0C0.676674 0 0.22983 1.75918e-08 0.0586473 0.29101C-0.112535 0.58202 0.104099 0.972788 0.538548 1.75373L4.43442 8.76749C4.8913 9.58916 5.11915 10 5.46683 10C5.81392 10 6.04177 9.58916 6.49805 8.76749Z"
                  fill="#46ACC2"
               />
            </svg>
         </div>
      </div>
   );
};

type SubmitTagProps = {
   addTagObj?: AddTagObj;
   editTagObj?: EditTagObj;
   bigSize?: boolean;
};

type AddTagObj = {
   noteId: string;
};

type EditTagObj = {
   tagId: string;
   tagDisplay: boolean;
   setTagDisplay: (val: boolean) => void;
};

export const SubmitTag: React.FC<SubmitTagProps> = ({
   addTagObj,
   editTagObj,
   bigSize = false,
}) => {
   const dispatch = useAppDispatch();

   const inputRef = React.useRef<HTMLInputElement>(null);

   const [inputTag, setInputTag] = React.useState("");
   const [errorMessage, setErrorMessage] = React.useState("");

   const [inputDisplay, setInputDisplay] = React.useState(false);

   const resetInputFields = (noteId?: string) => {
      (document.activeElement as HTMLElement)?.blur();
      noteId ? setInputDisplay(false) : editTagObj?.setTagDisplay(true);
      setErrorMessage("");
      setInputTag("");
   };

   const handleConfirm = (event?: React.MouseEvent<HTMLDivElement>) => {
      event?.stopPropagation();
      if (inputTag.length > 0 && inputTag.length <= 15) {
         try {
            if (addTagObj) {
               dispatch(checkTagDuplicate(inputTag, addTagObj.noteId)); // to check for a tooltip
               dispatch(
                  postTag({ tagName: inputTag, noteId: addTagObj.noteId }),
               );
               resetInputFields(addTagObj.noteId);
            } else if (editTagObj) {
               dispatch(checkTagDuplicate(inputTag)); // to check for a tooltip
               dispatch(patchTag({ id: editTagObj.tagId, name: inputTag }));
               resetInputFields();
            }
         } catch (error: any) {
            setErrorMessage(error.message);
         }
      }
   };

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value.length <= 15) {
         setInputTag(event.target.value);
         setErrorMessage("");
      } else {
         setErrorMessage("Maximum length is 15 characters");
      }
   };

   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
         addTagObj && handleConfirm();
         editTagObj && handleConfirm();
      }
   };

   React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (
            inputRef.current &&
            !inputRef.current.contains(event.target as Node) &&
            inputRef.current !== event.target
         ) {
            addTagObj
               ? setInputDisplay(false)
               : editTagObj?.setTagDisplay(true);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [addTagObj, editTagObj]);

   if (editTagObj) {
      return (
         <div ref={inputRef} className="edit-tag" title="Edit a tag">
            <div
               onClick={(e) => {
                  e.stopPropagation();
                  editTagObj.setTagDisplay(false);
               }}
               className="edit-tag-icon"
            >
               <svg
                  width="20"
                  height="20"
                  viewBox="0 0 16 17"
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
                     d="M2.79167 13.8482C2.60278 13.8482 2.44456 13.7838 2.317 13.6548C2.18944 13.5259 2.12544 13.3666 2.125 13.1768V11.5486C2.125 11.3695 2.15833 11.1988 2.225 11.0363C2.29167 10.8738 2.38611 10.7312 2.50833 10.6086L10.925 2.14857C11.0583 2.02547 11.2057 1.93035 11.367 1.86321C11.5283 1.79607 11.6977 1.7625 11.875 1.7625C12.0528 1.7625 12.225 1.79607 12.3917 1.86321C12.5583 1.93035 12.7028 2.03107 12.825 2.16535L13.7417 3.10535C13.875 3.22845 13.9721 3.37393 14.033 3.54178C14.0939 3.70964 14.1246 3.8775 14.125 4.04535C14.125 4.2244 14.0943 4.39517 14.033 4.55765C13.9717 4.72014 13.8746 4.8683 13.7417 5.00214L5.34167 13.4621C5.21944 13.5852 5.07767 13.6804 4.91633 13.7475C4.755 13.8146 4.58567 13.8482 4.40833 13.8482H2.79167ZM12.4571 5.37143L13.3714 4.45714L11.4286 2.62857L10.5143 3.54285L12.4571 5.37143Z"
                     fill="black"
                  />
               </svg>
            </div>
            <input
               value={inputTag}
               onClick={(e) => e.stopPropagation()}
               onChange={handleInputChange}
               onKeyDown={handleKeyDown}
               maxLength={16}
               name="tag_input"
               placeholder="Change tag name..."
               type="text"
               data-tooltip-id="edit-tag"
               data-tooltip-content={errorMessage}
               data-tooltip-place="top"
            />
            <Tooltip
               id="edit-tag"
               isOpen={errorMessage ? true : false}
               className="tooltip"
            />
            <div
               onClick={handleConfirm}
               className="edit-tag__confirm"
               title="Confirm a new tag name"
            >
               <svg
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <rect
                     y="0.0935059"
                     width="16"
                     height="16"
                     rx="4"
                     fill="#777777"
                     fillOpacity="0.08"
                  />
                  <path
                     d="M8 4V12"
                     stroke="#111111"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                  />
                  <path
                     d="M4 8L12 8"
                     stroke="#111111"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                  />
               </svg>
            </div>
         </div>
      );
   } else if (addTagObj) {
      return (
         <div
            ref={inputRef}
            className={inputDisplay ? "add-tag-active" : "add-tag"}
            title="Add a tag"
         >
            <div className="add-tag-icon" onClick={() => setInputDisplay(true)}>
               <svg
                  width={bigSize ? "18" : "15"}
                  height={bigSize ? "18" : "14"}
                  viewBox="0 0 12 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     d="M6 1V12.1111"
                     stroke="black"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                  />
                  <path
                     d="M1 6.55556H11"
                     stroke="black"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                  />
               </svg>
            </div>
            <input
               value={inputTag}
               onChange={handleInputChange}
               onKeyDown={handleKeyDown}
               maxLength={16}
               name="tag_input"
               placeholder="Add new tag..."
               type="text"
               data-tooltip-id="add-new-tag"
               data-tooltip-content={errorMessage}
               data-tooltip-place="top"
            />
            <Tooltip
               id="add-new-tag"
               isOpen={errorMessage ? true : false}
               className="tooltip"
            />
            <div
               onClick={handleConfirm}
               className="add-tag__confirm"
               title="Confirm adding a tag"
            >
               <svg
                  width="20"
                  height="20"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <rect
                     y="0.0935059"
                     width="16"
                     height="16"
                     rx="4"
                     fill="#777777"
                     fillOpacity="0.08"
                  />
                  <path
                     d="M8 4V12"
                     stroke="#111111"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                  />
                  <path
                     d="M4 8L12 8"
                     stroke="#111111"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                  />
               </svg>
            </div>
         </div>
      );
   } else {
      return <></>;
   }
};
