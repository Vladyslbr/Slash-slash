import { NoteType, TagType } from "../../types";
import { AppDispatch, RootState } from "../store";

export const handleErrors = (error: any, rejectWithValue: any, message: string) => {
    return rejectWithValue(`${message}: ${error.message}`);
};
 
export const checkTagDuplicate = (tagName: string, noteId?: string) => (dispatch: AppDispatch, getState: () => RootState): void => {
   const { tags, selectedNote, notes } = getState().data;
   // <if> check tag name duplicate <else> check tag name inclusion in a note
   const foundTag = tags.find((item: TagType) => item.name === tagName);
   if (!noteId) {
      if (foundTag) {
         throw new Error(`Tag name <${tagName}> already exists`);
      }
   };
   if (noteId) {
      let foundNote;
      if (selectedNote?.id === noteId) {
         foundNote = selectedNote;
      } else {
         foundNote = notes.find((item: NoteType) => item.id === noteId);
      };
      if (foundNote && foundTag) {
         const noteIncluded = foundNote.tags.find((item: string) => item === foundTag.id);
         if (noteIncluded) {
            throw new Error(`Tag name <${tagName}> already included in a note`);
         };
      };
   };
};