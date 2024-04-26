import React from "react";
import { Link } from "react-router-dom";
import { RootState, useAppDispatch } from "../../redux/store";

import { Editor, Tag, SubmitTag, TagsHide } from "../";
import { deleteNote, patchNote } from "../../redux/data/base";
import { useSelector } from "react-redux";
import { selectNote } from "../../redux/data/selectors";
import ErrorPage from "../../pages/ErrorPage";

type NoteContainerProps = {
   id: string;
   noteType?: string;
   initialTagsLimit: number;
   finalTagsLimit: number;
};

export const NoteContainer: React.FC<NoteContainerProps> = ({
   id,
   noteType = "",
   initialTagsLimit,
   finalTagsLimit,
}) => {
   const dispatch = useAppDispatch();

   const note = useSelector((state: RootState) => selectNote(state)(id));

   const [hideTags, setHideTags] = React.useState<boolean>(true);
   const [isRotated, setIsRotated] = React.useState(false);

   const noteDate = (created: string, edited?: string) => {
      return (
         <div className="note-container-date">
            <span>{edited ? "Edited: " + edited : created}</span>
         </div>
      );
   };

   const tagsIter = (note: any) => {
      if (note.tags.length > 0) {
         const limit = hideTags ? initialTagsLimit : finalTagsLimit;
         return note.tags
            .slice(0, limit)
            .map((tag: string) => (
               <Tag key={tag} noteId={note.id} tagId={tag} withNoEdit={true} />
            ));
      }
   };

   if (!note) {
      return <ErrorPage errCode="404" />;
   } else {
      return (
         <div className="note-container-wrapper">
            <div className="note-container">
               <div className="note-container__wrapper">
                  {noteType === "bin" ? (
                     <>
                        <div
                           onClick={() => dispatch(deleteNote(id))}
                           className="note-container-btn-delete"
                        >
                           <svg
                              width="14"
                              height="19"
                              viewBox="0 0 14 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                           >
                              <path
                                 d="M13.5 1.15385H9.75L9.45625 0.479574C9.39402 0.33542 9.29817 0.214161 9.17947 0.129438C9.06078 0.0447158 8.92395 -0.000109181 8.78438 6.32189e-06H5.2125C5.07324 -0.000611366 4.93665 0.0440465 4.81838 0.128863C4.7001 0.21368 4.60492 0.335226 4.54375 0.479574L4.25 1.15385H0.5C0.367392 1.15385 0.240215 1.21464 0.146447 1.32283C0.0526784 1.43102 0 1.57777 0 1.73078L0 2.88462C0 3.03763 0.0526784 3.18437 0.146447 3.29257C0.240215 3.40076 0.367392 3.46154 0.5 3.46154H13.5C13.6326 3.46154 13.7598 3.40076 13.8536 3.29257C13.9473 3.18437 14 3.03763 14 2.88462V1.73078C14 1.57777 13.9473 1.43102 13.8536 1.32283C13.7598 1.21464 13.6326 1.15385 13.5 1.15385ZM1.6625 16.8389C1.68635 17.2784 1.85443 17.6908 2.13252 17.9922C2.41061 18.2937 2.77781 18.4615 3.15937 18.4615H10.8406C11.2222 18.4615 11.5894 18.2937 11.8675 17.9922C12.1456 17.6908 12.3137 17.2784 12.3375 16.8389L13 4.61539H1L1.6625 16.8389Z"
                                 fill="#777777"
                              />
                           </svg>
                        </div>
                        <Link to={`/notes/${id}`}>
                           <div className="note-container-text">
                              <Editor note={note.text} preview={true} />
                              {/* change to one var */}
                           </div>
                        </Link>
                        <div className="note-container__wrapper_info">
                           <div className="note-container-separator"></div>
                           <div className="note-container__wrapper__tags">
                              {tagsIter(note)}
                              <SubmitTag addTagObj={{ noteId: note.id }} />
                              {note.tags.length > initialTagsLimit ? (
                                 <TagsHide
                                    isRotated={isRotated}
                                    onClick={() => {
                                       setHideTags(!hideTags);
                                       setIsRotated(!isRotated);
                                    }}
                                 />
                              ) : (
                                 ""
                              )}
                           </div>
                           {noteDate(note.created, note.edited)}
                           <div
                              onClick={() =>
                                 dispatch(
                                    patchNote({
                                       id,
                                       bin: !note.bin,
                                    }),
                                 )
                              }
                              className="note-container-btn-restore"
                           >
                              <svg
                                 width="20"
                                 height="20"
                                 viewBox="0 0 20 20"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                              >
                                 <path
                                    d="M19.5241 2.75843e-07H17.644C17.3812 -0.000279724 17.1678 0.21264 17.1676 0.47564C17.1676 0.48336 17.1677 0.49108 17.1681 0.4988L17.3267 3.78292C15.46 1.58176 12.7198 0.31428 9.83482 0.31744C4.41535 0.31748 -0.00395733 4.74324 2.65923e-06 10.1663C0.00396265 15.598 4.40583 20 9.83482 20C12.2704 20.0033 14.6199 19.0991 16.4249 17.4639C16.6208 17.2885 16.6374 16.9874 16.4622 16.7915C16.4563 16.7849 16.4502 16.7785 16.444 16.7722L15.0956 15.423C15.0103 15.3376 14.8958 15.2879 14.7752 15.2838C14.6546 15.2798 14.5369 15.3217 14.4461 15.4012C11.5521 17.949 7.14187 17.6669 4.59563 14.7709C2.0494 11.875 2.3314 7.46188 5.22543 4.914C8.11946 2.36612 12.5297 2.64828 15.0759 5.54424C15.2755 5.77125 15.4601 6.01097 15.6286 6.26188L11.6023 6.06864C11.3398 6.05616 11.1169 6.25896 11.1044 6.52168C11.104 6.5294 11.1038 6.53712 11.1039 6.54484V8.4262C11.1039 8.6892 11.3169 8.9024 11.5797 8.9024H19.5241C19.787 8.9024 20 8.6892 20 8.4262V0.4762C20 0.2132 19.7869 2.75843e-07 19.5241 2.75843e-07Z"
                                    fill="#46ACC2"
                                 />
                              </svg>
                           </div>
                        </div>
                     </>
                  ) : (
                     <>
                        <Link to={`/notes/${id}`}>
                           <div className="note-container-text">
                              <Editor note={note.text} preview={true} />
                              {/* change to one var */}
                           </div>
                        </Link>
                        <div className="note-container__wrapper_info">
                           <div className="note-container-separator"></div>
                           <div className="note-container__wrapper__tags">
                              {tagsIter(note)}
                              <SubmitTag addTagObj={{ noteId: note.id }} />
                              {note.tags.length > initialTagsLimit ? (
                                 <TagsHide
                                    isRotated={isRotated}
                                    onClick={() => {
                                       setHideTags(!hideTags);
                                       setIsRotated(!isRotated);
                                    }}
                                 />
                              ) : (
                                 ""
                              )}
                           </div>
                           {noteDate(note.created, note.edited)}
                           <div
                              onClick={() =>
                                 dispatch(
                                    patchNote({
                                       id,
                                       bin: !note.bin,
                                    }),
                                 )
                              }
                              className="note-container-btn-bin"
                           >
                              <div
                                 className="icon-note-container-bin"
                                 title="Move a note to a bin"
                              >
                                 <svg
                                    width="13"
                                    height="18"
                                    viewBox="0 0 13 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                 >
                                    <path
                                       d="M12.5357 1.07143H9.05357L8.7808 0.445318C8.72302 0.311461 8.63402 0.198864 8.5238 0.120193C8.41358 0.0415218 8.28652 -0.000101383 8.15692 5.87033e-06H4.84018C4.71087 -0.000567697 4.58403 0.0409003 4.47421 0.119659C4.36438 0.198417 4.276 0.311281 4.2192 0.445318L3.94643 1.07143H0.464286C0.341149 1.07143 0.223057 1.12788 0.135986 1.22834C0.0489157 1.32881 0 1.46507 0 1.60715L0 2.67858C0 2.82066 0.0489157 2.95692 0.135986 3.05738C0.223057 3.15785 0.341149 3.21429 0.464286 3.21429H12.5357C12.6588 3.21429 12.7769 3.15785 12.864 3.05738C12.9511 2.95692 13 2.82066 13 2.67858V1.60715C13 1.46507 12.9511 1.32881 12.864 1.22834C12.7769 1.12788 12.6588 1.07143 12.5357 1.07143ZM1.54375 15.6362C1.56589 16.0442 1.72197 16.4271 1.98019 16.707C2.23842 16.987 2.5794 17.1428 2.93371 17.1429H10.0663C10.4206 17.1428 10.7616 16.987 11.0198 16.707C11.278 16.4271 11.4341 16.0442 11.4562 15.6362L12.0714 4.28572H0.928571L1.54375 15.6362Z"
                                       fill="#B7B7B7"
                                    />
                                 </svg>
                              </div>
                           </div>
                        </div>
                     </>
                  )}
               </div>
            </div>
         </div>
      );
   }
};

export * from "./NoteContainerSkeleton";
