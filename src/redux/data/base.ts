import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";

import { AppDispatch, RootState } from "../store";
import { NoteType, TagType } from "../../types";
import { getDemonstrationData, handleErrors } from "./utils";
import { db } from "../../db";
import { setActiveCategory } from "../filter/slice";
import { checkDbExistance } from "../../db/utils";

// Fetching data

export const getData = createAsyncThunk<
   [NoteType[], TagType[]],
   void,
   { state: RootState }
>("data/getData", async (_, { getState, rejectWithValue }) => {
   let notes: NoteType[], tags: TagType[];
   const { category, sort, searchValue, bin } = getState().filter;
   const reverseOrder = sort.sortProp2 === "asc" ? false : true;
   const orderByCreated = sort.sortProp1 === "created" ? true : false;
   const params = {
      orderByCreated,
      reverseOrder,
      bin,
      tagName: category,
      textSearch: searchValue,
   };
   const dbExistance = await checkDbExistance();
   if (dbExistance) {
      try {
         [notes, tags] = await Promise.all([
            db.getNotes(params),
            db.getTags({}),
         ]);
      } catch (error: any) {
         return handleErrors(
            error,
            rejectWithValue,
            "Error while getting data",
         );
      }
   } else {
      [notes, tags] = getDemonstrationData();
      await db.setData({ notes, tags });
   }
   return [notes, tags];
});

export const getTags = createAsyncThunk<TagType[], void, { state: RootState }>(
   "data/getTags",
   async (_, { rejectWithValue }) => {
      try {
         const res = await db.getTags({});
         return res;
      } catch (error: any) {
         return handleErrors(
            error,
            rejectWithValue,
            "Error while getting tags",
         );
      }
   },
);

// Notes CRUD

export const postNote = createAsyncThunk<
   NoteType,
   string | undefined,
   { state: RootState }
>("data/postNote", async (id, { dispatch, rejectWithValue }) => {
   try {
      if (!id) {
         id = nanoid();
      }
      await db.addNote(id);
      await dispatch(getNote(id));
   } catch (error: any) {
      return handleErrors(error, rejectWithValue, "Error while posting a note");
   }
});

export const getNote = createAsyncThunk<NoteType, string, { state: RootState }>(
   "data/getNote",
   async (id, { dispatch, rejectWithValue }) => {
      try {
         await dispatch(getTags());
         const res = await db.getNote(id);
         return res;
      } catch (error: any) {
         return handleErrors(error, rejectWithValue, "Error getting a note");
      }
   },
);

export const patchNote = createAsyncThunk<
   NoteType,
   {
      id: string;
      text?: string;
      addTagId?: string;
      deleteTagId?: string;
      bin?: boolean;
   },
   { state: RootState }
>(
   "data/patchNote",
   async (
      { id, text, addTagId, deleteTagId, bin },
      { dispatch, rejectWithValue, getState },
   ) => {
      const { notes } = getState().data;
      try {
         await db.updateNote(id, { text, addTagId, deleteTagId, bin });
         if (notes.length > 0) {
            await dispatch(getData());
         } else {
            await dispatch(getNote(id));
         }
      } catch (error: any) {
         return handleErrors(
            error,
            rejectWithValue,
            "Error while patching a note",
         );
      }
   },
);

export const deleteNote = createAsyncThunk<
   string,
   string,
   { state: RootState }
>("data/deleteNote", async (id, { rejectWithValue }) => {
   try {
      await db.deleteNote(id);
      return id;
   } catch (error: any) {
      return handleErrors(
         error,
         rejectWithValue,
         "Error while deleting a note",
      );
   }
});

export const deleteNotes = createAsyncThunk<void, void, { state: RootState }>(
   "data/deleteNotes",
   async (_, { rejectWithValue, getState }) => {
      const { notes } = getState().data;
      const filterBinNotes = notes.filter((item) => item.bin === true);
      const ids = filterBinNotes.map((item) => item.id);
      try {
         await db.bulkDeleteNotes(ids);
      } catch (error: any) {
         return handleErrors(
            error,
            rejectWithValue,
            "Error while deleting a note",
         );
      }
   },
);

// Tags CRUD

export const postTag = createAsyncThunk<
   { id: string; noteId: string },
   { tagName: string; noteId?: string },
   { state: RootState }
>(
   "data/postTag",
   async ({ tagName, noteId }, { dispatch, rejectWithValue, getState }) => {
      const { notes } = getState().data;
      try {
         const id = nanoid();
         await db.addTag(id, tagName, noteId);
         if (notes.length > 0) {
            await dispatch(getData());
         } else {
            if (noteId) {
               await dispatch(getTags());
               await dispatch(getNote(noteId));
            }
         }
         return { id, noteId };
      } catch (error: any) {
         return handleErrors(
            error,
            rejectWithValue,
            "Error while posting a tag",
         );
      }
   },
);

export const getTag =
   (tagId: string) =>
   (dispatch: AppDispatch, getState: () => RootState): TagType => {
      const { tags } = getState().data;
      const res = tags.find((item: TagType) => item.id === tagId);
      if (res) {
         return res;
      } else {
         throw new Error(`No tag found with id: ${tagId}`);
      }
   };

export const patchTag = createAsyncThunk<
   void,
   { id: string; name?: string; addNoteId?: string; deleteNoteId?: string },
   { state: RootState }
>(
   "data/patchTag",
   async (
      { id, name, addNoteId, deleteNoteId },
      { dispatch, rejectWithValue },
   ) => {
      try {
         await db.updateTag(id, { name, addNoteId, deleteNoteId });
         await dispatch(getTags());
      } catch (error: any) {
         return handleErrors(
            error,
            rejectWithValue,
            "Error while patching a tag",
         );
      }
   },
);

export const deleteTag = createAsyncThunk<
   void,
   { id: string; noteId?: string },
   { state: RootState }
>(
   "data/deleteTag",
   async ({ id, noteId }, { dispatch, getState, rejectWithValue }) => {
      const { notes } = getState().data;
      try {
         await db.deleteTag(id, noteId);
         dispatch(setActiveCategory(null));
         if (notes.length > 0) {
            await dispatch(getData());
         } else {
            if (noteId) {
               await dispatch(getNote(noteId));
            }
         }
      } catch (error: any) {
         return handleErrors(
            error,
            rejectWithValue,
            "Error while deleting a tag",
         );
      }
   },
);
