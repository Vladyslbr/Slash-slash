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

   const handleDelete = () => {
      if (selectedNote) {
         if (selectedNote.bin) {
            dispatch(deleteNote(selectedNote.id));
            setDeleted(true);
         } else {
            dispatch(
               patchNote({ id: selectedNote.id, bin: !selectedNote.bin }),
            );
         }
      }
   };

   React.useEffect(() => {
      if (deleted) {
         navigate("/");
         setDeleted(false);
      } else if (!selectedNote && id) {
         dispatch(getNote(id));
      }
   }, [id, selectedNote, deleted, dispatch, navigate]);

   React.useEffect(() => {
      if (selectedNote) {
         setEditorText(selectedNote.text);
      }
   }, [selectedNote, dispatch]);

   const tagsIter = () => {
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

   if (error) {
      return <ErrorPage errCode={"404"} message={`Redux problem: ${error}`} />;
   } else if (!id) {
      return <ErrorPage errCode="404" />;
   }

   return !selectedNote ? (
      <div className="page-loading"></div>
   ) : selectedNote ? (
      <div className="main__wrapper-note">
         <div className="top">
            <div className="top-menu">
               <BackBtn binStatus={selectedNote.bin} />
               <RemoveBtn binStatus={selectedNote.bin} onClick={handleDelete} />
            </div>
            <div className="top-details">
               <div className="top-details-categories">
                  <span className="top-menu-detail-name">Tags:</span>
                  <div className="top-details-categories__wrapper-tags">
                     {tagsIter()}
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
   ) : (
      <></>
   );
}

export default Note;
