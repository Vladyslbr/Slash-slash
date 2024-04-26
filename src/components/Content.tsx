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
   const [showSkeleton, setShowSkeleton] = React.useState(false);

   React.useEffect(() => {
      if (status === Status.LOADING) {
         var timer = setTimeout(() => {
            setShowSkeleton(true);
         }, 1000);
      }
      if (status === Status.SUCCESS) {
         setShowSkeleton(false);
      }

      return () => clearTimeout(timer);
   }, [status]);

   return (
      <div className="notes-content">
         {showSkeleton
            ? [...new Array(6)].map((_, index) => (
                 <NoteContainerSkeleton key={index} />
              ))
            : notes.map((note: NoteType) => (
                 <NoteContainer
                    key={note.id}
                    id={note.id}
                    noteType={noteType}
                    initialTagsLimit={6}
                    finalTagsLimit={30}
                 />
              ))}
      </div>
   );
};
