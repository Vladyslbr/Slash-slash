import React from "react";
import { useSelector } from "react-redux";

import { NoteContainer, NoteContainerSkeleton } from "./";
import { selectData } from "../redux/data/selectors";
import { NoteType, Status } from "../types";

type ContentProps = {
   noteType?: string;
};

export const Content: React.FC<ContentProps> = ({ noteType = "" }) => {
   const { notes, status } = useSelector(selectData);

   return (
      <div className="notes-content">
         {status === Status.LOADING
            // ? [...new Array(6)].map((_, index) => (
            //      <NoteContainerSkeleton key={index} />
            //   ))
            ? <></>
            : status === Status.SUCCESS
              ? notes.map((note: NoteType) => (
                   <NoteContainer
                      key={note.id}
                      id={note.id}
                      noteType={noteType}
                      initialTagsLimit={2}
                      finalTagsLimit={20}
                   />
                ))
              : ""}
      </div>
   );
};
