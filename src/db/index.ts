import Dexie, { Table } from 'dexie';
import { NoteType, TagType, UpdatedNoteType, UpdatedTagType } from '../types';
import moment from 'moment';

const dateFormat = "MM-DD-YYYY HH:mm";

type GetNotesType = {
  orderByCreated?: boolean;
  reverseOrder?: boolean;
  bin?: boolean;
  tagName?: string | null;
  textSearch?: string | null;
};

class Database extends Dexie {
  notes: Table<NoteType, string>;
  tags: Table<TagType, string>;

  constructor() {
    super('Slash-DB');
    this.version(1).stores({
        notes: 'id, *tags, created, edited, bin',
        tags: 'id, name, *notes, created',
    });
    this.notes = this.table("notes");
    this.tags = this.table("tags");
  };

  // Notes operations

  addNote(id: string): Promise<string> {
    const note = {
      id,
      text: "",
      tags: [],
      created: moment().format(dateFormat),
      edited: "",
      bin: false,
    };
    return this.notes.add(note);
  };

  async getNotes({ orderByCreated=true, reverseOrder=false, bin, tagName, textSearch }: GetNotesType): Promise<NoteType[]> {
    let query;
    if (orderByCreated) {
      query = this.notes.orderBy("created");
    } else {
      query = this.notes.orderBy("edited");
    };

    if (reverseOrder) {
      query = query.reverse();
    };

    if (bin !== undefined) {;
      query = query.filter(note => note.bin === bin);
    };
    if (tagName) {
        const tag = await this.getTag({ tagName });
        query = query.filter(note => note.tags.includes(tag.id));
    };

    if (textSearch) {
        query = query.filter(note => note.text.toLowerCase().includes(textSearch.toLowerCase()));
    };

    return query.toArray();
  };

  async getNote(id: string): Promise<NoteType> {
    const note = await this.notes.get(id);

    if (!note) {
      throw new Error("Note not found");
    };

    return note;
  };

  async updateNote(id: string, { text, addTagId, deleteTagId, bin }: UpdatedNoteType): Promise<void> {
    // addTagId and deleteTagId are implemented only within a note
    const note = await this.getNote(id);

    let updatedTags = [...note.tags];

    if (addTagId) {
      if (updatedTags.includes(addTagId)) {
        throw new Error("Tag already included in a note");
      };
      updatedTags.push(addTagId);
    };
    if (deleteTagId) {
      const filtered = updatedTags.filter(item => item !== deleteTagId);
      updatedTags = [...filtered];
    };

    const updated = {
      text: text !== undefined ? text : note?.text,
      tags: updatedTags,
      bin: bin !== undefined ? bin : note.bin,
      edited: moment().format(dateFormat),
    };

    await this.notes.update(id, updated);
  };

  async deleteNote(id: string): Promise<void> {
    const note = await this.getNote(id);

    const allTags = await this.tags.toArray();

    const removeNotePromises = note.tags.map( async tagId => {
        const foundTag = allTags.find(item => item.id === tagId);
        if (foundTag) {
            const filteredNotesArray = foundTag.notes.filter(item => item !== id);
            await this.tags.update(foundTag.id, { notes: filteredNotesArray });
        };
    });

    await Promise.all(removeNotePromises);

    return this.notes.delete(id);
  };

  async bulkDeleteNotes(ids: string[]): Promise<void> {
    const [notes, allTags] = await Promise.all([
      this.notes.bulkGet(ids),
      this.tags.toArray()
    ]);
    if (!notes || !allTags) {
      throw new Error("Bulk delete operation failed");
    }

    // filter and update tags [notes] such that [notes] not includes [ids]
    const removeNotesPromises = allTags.map(async tag => {
      const filteredNotesArray = tag.notes.filter(item => !ids.includes(item));
      await this.tags.update(tag.id, { notes: filteredNotesArray });
    });

    await Promise.all(removeNotesPromises);

    return this.notes.bulkDelete(ids);
  }

  // Tags operations

  async addTag(id: string, tagName: string, noteId?: string): Promise<void> {
    const tags = await this.tags.toArray();
    const tag = {
      id,
      name: tagName,
      notes: noteId? [noteId] : [],
      created: moment().format(dateFormat),
    };
    const foundTag = tags.find(item => item.name === tagName);
    if (noteId) {
      if (foundTag) {
        await Promise.all([
          this.updateTag(foundTag.id, { addNoteId: noteId }),
          this.updateNote(noteId, { addTagId: foundTag.id })
        ]);
      } else {
        await Promise.all([
          this.tags.add(tag),
          this.updateNote(noteId, { addTagId: tag.id })
        ]);
      };
    } else {
      if (foundTag) {
        throw new Error("Tag already exists");
      };
      await this.tags.add(tag);
    };
  };

  async getTag ({ id, tagName }: {id?: string, tagName?: string}): Promise<TagType> {
    
    let tag;

    if (tagName) {
      const tags = await this.tags.toArray();
      tag = tags.find(item => item.name === tagName);
    };
    
    if (id) {
      tag = await this.tags.get(id);
    };

    if (!tag) {
      throw new Error("Tag not found");
    };

    return tag;
  };

  getTags ({ reverseOrder=false }): Promise<TagType[]> {
    let query = this.tags.orderBy("created");

    if (reverseOrder) {
      query = query.reverse()
    };

    return query.toArray();
  };

  async updateTag(id: string, { name, addNoteId, deleteNoteId }: UpdatedTagType): Promise<void> {
    const tag = await this.getTag({ id });

    let updatedNotes = [...tag.notes];

    if (addNoteId) {
      if (updatedNotes.includes(addNoteId)) {
        throw new Error("Note already included in a tag");
      };
      updatedNotes.push(addNoteId);
    };
    if (deleteNoteId) {
      const filtered = updatedNotes.filter(item => item !== deleteNoteId);
      updatedNotes = [...filtered];
    };

    const updated = {
      name: name || tag.name,
      notes: updatedNotes,
    };

    this.tags.update(id, { ...updated });
  };

  async deleteTag(id: string, noteId?: string): Promise<void> {
    const tag = await this.getTag({ id });

    if (noteId) {
      await Promise.all([
        this.updateTag(id, { deleteNoteId: noteId }),
        this.updateNote(noteId, { deleteTagId: id })
      ]);
    } else {
      const allNotes = await this.notes.toArray();
      const removeTagPromises = tag.notes.map( async noteId => {
          const foundNote = allNotes.find(item => item.id === noteId);
          if (foundNote) {
              await this.updateNote(foundNote.id, { deleteTagId: id });
          };
      });
      await Promise.all(removeTagPromises);
      await this.tags.delete(id);
    };
  };
}

export const db = new Database();