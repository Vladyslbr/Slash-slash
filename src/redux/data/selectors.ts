import { RootState } from "../store";

export const selectData = (state: RootState) => state.data;

export const selectNotes = (state: RootState) => state.data.notes;

export const selectTags = (state: RootState) => state.data.tags;

export const selectNote = (state: RootState) => (id: string) =>
   state.data.notes.find((item) => item.id === id);
