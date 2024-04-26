import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { DataSliceType, NoteType, Status, TagType } from "../../types";
import {
   deleteNote,
   deleteNotes,
   deleteTag,
   getData,
   getNote,
   getTags,
   patchNote,
   patchTag,
   postNote,
   postTag,
} from "./base";

export const initialState: DataSliceType = {
   notes: [],
   tags: [],
   selectedNote: null,
   status: Status.IDLE,
   error: null,
};

const dataSlice = createSlice({
   name: "data",
   initialState,
   reducers: {
      setSelectedNote(state, action: PayloadAction<NoteType | null>) {
         state.selectedNote = action.payload;
      },
      setNotes(state, action: PayloadAction<NoteType[]>) {
         state.notes = action.payload;
      },
      setTags(state, action: PayloadAction<TagType[]>) {
         state.tags = action.payload;
      },
      setStatus(state, action: PayloadAction<Status>) {
         state.status = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(getData.pending, (state) => {
            state.status = Status.LOADING;
         })
         .addCase(getData.fulfilled, (state, action) => {
            const [notes, tags] = action.payload;
            state.notes = notes;
            state.tags = tags;
            state.selectedNote = null;
            state.status = Status.SUCCESS;
         })
         .addCase(getData.rejected, (state, action) => {
            state.notes = [];
            state.tags = [];
            state.status = Status.ERROR;
            state.error = action.error.message || "Failed to get data";
         });

      builder
         .addCase(getTags.pending, (state) => {
            state.status = Status.LOADING;
         })
         .addCase(getTags.fulfilled, (state, action) => {
            state.tags = action.payload;
            state.status = Status.SUCCESS;
         })
         .addCase(getTags.rejected, (state, action) => {
            state.tags = [];
            state.status = Status.ERROR;
            state.error = action.error.message || "Failed to get tags";
         });

      // Notes CRUD

      builder.addCase(postNote.rejected, (state, action) => {
         state.selectedNote = null;
         state.status = Status.ERROR;
         state.error = action.error.message || "Failed to post a note";
      });

      builder
         .addCase(
            getNote.fulfilled,
            (state, action: PayloadAction<NoteType>) => {
               state.selectedNote = action.payload;
               state.notes = [];
            },
         )
         .addCase(getNote.rejected, (state, action) => {
            state.selectedNote = null;
            state.status = Status.ERROR;
            state.error = action.error.message || "Failer to get a note";
         });

      builder.addCase(patchNote.rejected, (state, action) => {
         state.status = Status.ERROR;
         state.error = action.error.message || "Failed to patch a note";
      });

      builder
         .addCase(
            deleteNote.fulfilled,
            (state, action: PayloadAction<string>) => {
               const id = action.payload;
               state.selectedNote = null;
               if (state.notes) {
                  const filtered = state.notes.filter((item) => item.id !== id);
                  state.notes = [...filtered];
               }
            },
         )
         .addCase(deleteNote.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.error = action.error.message || "Failed to delete a note";
         });

      builder
         .addCase(deleteNotes.fulfilled, (state, action) => {
            state.selectedNote = null;
            if (state.notes) {
               const filtered = state.notes.filter((item) => item.bin !== true);
               state.notes = [...filtered];
            }
         })
         .addCase(deleteNotes.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.error = action.error.message || "Failed to delete notes";
         });

      // Tags CRUD

      builder.addCase(postTag.rejected, (state, action) => {
         state.status = Status.ERROR;
         state.error = (action.payload as string) || "Failed to post a tag";
      });

      builder.addCase(patchTag.rejected, (state, action) => {
         state.status = Status.ERROR;
         state.error = action.error.message || "Failed to patch a tag";
      });

      builder.addCase(deleteTag.rejected, (state, action) => {
         state.status = Status.ERROR;
         state.error = action.error.message || "Failed to delete a tag";
      });
   },
});

export const { setSelectedNote, setNotes, setTags, setStatus } =
   dataSlice.actions;

export default dataSlice.reducer;
