import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";

import styles from "./addNoteBtn.module.scss";
import { postNote } from "../../redux/data/base";
import { nanoid } from "@reduxjs/toolkit";

export const AddNoteBtn = () => {
   const navigate = useNavigate();

   const dispatch = useAppDispatch();

   const [noteId, setNoteId] = React.useState<string>("");

   const handleAddNote = () => {
      const id = nanoid();
      dispatch(postNote(id));
      setNoteId(id);
   };

   React.useEffect(() => {
      if (noteId) {
         navigate(`/notes/${noteId}`);
         setNoteId("");
      }
   }, [noteId, navigate]);

   return (
      <div className={styles.root}>
         <div className="topbar-add-note-btn" onClick={handleAddNote}>
            <div className="icon-add-note">
               <svg
                  width="15"
                  height="17"
                  viewBox="0 0 15 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     d="M7.5 1V15.4444"
                     stroke="white"
                     strokeWidth="2"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                  />
                  <path
                     d="M1 8.2222H14"
                     stroke="white"
                     strokeWidth="2"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                  />
               </svg>
            </div>
            <span>Add a note</span>
         </div>
      </div>
   );
};
