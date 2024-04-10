import React from "react";

export const CreatedDate: React.FC<{ created: string }> = React.memo(
   ({ created }) => {
      return (
         <div className="date-created">
            <span className="top-menu-detail-name">Created:</span>
            <span>{created}</span>
         </div>
      );
   },
);

export const EditedDate: React.FC<{ edited: string }> = React.memo(
   ({ edited }) => {
      return (
         <div className="date-edited">
            <span className="top-menu-detail-name">Edited:</span>
            <span>{edited}</span>
         </div>
      );
   },
);
