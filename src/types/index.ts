// Data types

export type TagType = {
    id: string;
    name: string;
    created: string;
    notes: string[];
};

export type NoteType = {
    id: string;
    text: string;
    tags: string[];
    created: string;
    edited: string;
    bin: boolean;
};

export type UpdatedNoteType = {
    text?: string;
    addTagId?: string;
    deleteTagId?: string;
    bin?: boolean;
}
  
export type UpdatedTagType = {
    name?: string;
    addNoteId?: string;
    deleteNoteId?: string;
}

export enum Status {
    IDLE = "idle",
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error"
};

export interface DataSliceType {
    notes: NoteType[];
    tags: TagType[];
    selectedNote: NoteType | null;
    status: Status;
    error: string | null;
};

// Filter types

export type SortItemType = {
    name: "created-descending";
    sortProp1: "created";
    sortProp2: "desc";
} | {
    name: "created-ascending";
    sortProp1: "created";
    sortProp2: "asc";
} | {
    name: "modified-ascending";
    sortProp1: "edited";
    sortProp2: "asc";
} | {
    name: "modified-descending";
    sortProp1: "edited";
    sortProp2: "desc";
};

export type FilterSliceTypes = {
    urlParams: string | null;
    category: string | null;
    sort: SortItemType;
    searchValue: string | null;
    bin: boolean;
};