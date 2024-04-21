import React from "react";
import "react-tooltip/dist/react-tooltip.css";

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
