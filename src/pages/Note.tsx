import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";

import "../scss/note-page.scss";
import ErrorPage from "./ErrorPage";
import { selectData } from "../redux/data/selectors";
import { deleteNote, getNote, patchNote } from "../redux/data/base";
import {
   CreatedDate,
   EditedDate,
   Tag,
   Editor,
   SubmitTag,
   BackBtn,
   RemoveBtn,
} from "../components";

function Note() {
   const { id } = useParams();
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const [editorText, setEditorText] = React.useState<string>();
   const [deleted, setDeleted] = React.useState(false);

   const { selectedNote, error } = useSelector(selectData);

   // Function to handle note deletion or moving to bin
   const handleDelete = () => {
      if (selectedNote) {
         if (selectedNote.bin) {
            // If note is already in bin, delete it permanently
            dispatch(deleteNote(selectedNote.id));
            setDeleted(true);
         } else {
            // If note is not in bin, move it to bin
            dispatch(
               patchNote({ id: selectedNote.id, bin: !selectedNote.bin }),
            );
         }
      }
   };

   // Effect to handle navigation after deletion or loading note
   React.useEffect(() => {
      if (deleted) {
         // If note was deleted, navigate back to the home page
         navigate("/");
         setDeleted(false);
      } else if (!selectedNote && id) {
         // If note is not loaded and ID is present, fetch the note
         dispatch(getNote(id));
      }
   }, [id, selectedNote, deleted, dispatch, navigate]);

   // Effect to update editor text when selected note changes
   React.useEffect(() => {
      if (selectedNote) {
         setEditorText(selectedNote.text);
      }
   }, [selectedNote]);

   // Function to render tags for the selected note
   const renderTags = () => {
      return selectedNote?.tags.map((tag: string) => (
         <Tag
            key={tag}
            noteId={selectedNote.id}
            tagId={tag}
            categoryTag={true}
            onClickCategory={false}
         />
      ));
   };

   // Render error page if Redux error occurs or no ID is provided
   if (error) {
      return <ErrorPage errCode={"404"} message={`Redux problem: ${error}`} />;
   } else if (!id) {
      return <ErrorPage errCode="404" />;
   }

   return !selectedNote ? (
      <div className="page-loading"></div>
   ) : (
      <div className="main__wrapper-note">
         <div className="top">
            <div className="note-top-menu">
               <BackBtn binStatus={selectedNote.bin} />
               <RemoveBtn binStatus={selectedNote.bin} onClick={handleDelete} />
            </div>
            <div className="top-details">
               <div className="top-details-categories">
                  <span className="top-menu-detail-name">Tags:</span>
                  <div className="top-details-categories__wrapper-tags">
                     {renderTags()}
                     <SubmitTag
                        addTagObj={{ noteId: selectedNote.id }}
                        bigSize={true}
                     />
                  </div>
               </div>
               <CreatedDate created={selectedNote.created} />
               {selectedNote.edited && (
                  <EditedDate edited={selectedNote.edited} />
               )}
            </div>
            <div className="top-separator"></div>
         </div>
         <div className="editor-content">
            {editorText !== undefined && <Editor note={editorText} />}
         </div>
      </div>
   );
}

export default Note;
