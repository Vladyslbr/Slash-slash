import { NoteType, TagType } from "../../types";
import { AppDispatch, RootState } from "../store";

export const handleErrors = (
   error: any,
   rejectWithValue: any,
   message: string,
) => {
   return rejectWithValue(`${message}: ${error.message}`);
};

export const checkTagDuplicate =
   (tagName: string, noteId?: string) =>
   (dispatch: AppDispatch, getState: () => RootState): void => {
      const { tags, selectedNote, notes } = getState().data;
      // <if> check tag name duplicate <else> check tag name inclusion in a note
      const foundTag = tags.find((item: TagType) => item.name === tagName);
      if (!noteId) {
         if (foundTag) {
            throw new Error(`Tag name <${tagName}> already exists`);
         }
      }
      if (noteId) {
         let foundNote;
         if (selectedNote?.id === noteId) {
            foundNote = selectedNote;
         } else {
            foundNote = notes.find((item: NoteType) => item.id === noteId);
         }
         if (foundNote && foundTag) {
            const noteIncluded = foundNote.tags.find(
               (item: string) => item === foundTag.id,
            );
            if (noteIncluded) {
               throw new Error(
                  `Tag name <${tagName}> already included in a note`,
               );
            }
         }
      }
   };

export const getDemonstrationData = (): [NoteType[], TagType[]] => {
   const notes: NoteType[] = [
      {
         id: "7LUJYTJmEt87BQfF7fELc",
         text: 'Some notes\n\n### Debugging\nThe first known actual bug causing a problem in a computer was a moth, trapped inside a Harvard mainframe, recorded in a log book entry dated September 9, 1947.[22] "Bug" was already a common term for a software defect when this insect was found.\n\n![image](https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/First_Computer_Bug%2C_1945.jpg/440px-First_Computer_Bug%2C_1945.jpg)',
         tags: ["-P7HJF9dW5vD0S9fFKpZv"],
         created: "04-11-2024 13:58",
         edited: "04-11-2024 13:59",
         bin: false,
      },
      {
         id: "0Lw6PhpAruiZmSZt8VWaX",
         text: "**Computer programming** or **coding** is the composition of sequences of instructions, called programs, that computers can follow to perform tasks. \n\n> Machine code was the language of early programs, written in the instruction set of the particular machine, often in binary notation\n\nSometimes software development is known as software engineering, especially when it employs formal methods or follows an engineering design process.\n\n- in `Python`:\n\n```python\nn = int(input('Type a number, and its factorial will be printed: '))\n\nif n < 0:\n    raise ValueError('You must enter a non-negative integer')\n\nfactorial = 1\nfor i in range(2, n + 1):\n    factorial *= i\n\nprint(factorial)\n```",
         tags: ["-P7HJF9dW5vD0S9fFKpZv", "YbVYxHeMq2tqHOjy03W0r"],
         created: "04-11-2024 13:28",
         edited: "04-12-2024 15:30",
         bin: false,
      },
      {
         id: "K34fO3_s68WYLK_P8R7UM",
         text: "removed note\n\n## Compiler languages\n\nHigh-level languages made the process of developing a program simpler and more understandable, and less bound to the underlying hardware. The first compiler related tool, the A-0 System, was developed in 1952[11] by Grace Hopper, who also coined the term 'compiler'.[12][13] FORTRAN, the first widely used high-level language to have a functional implementation, came out in 1957,[14] and many other languages were soon developed—in particular, COBOL aimed at commercial data processing, and Lisp for computer research.\n\nThese compiled languages allow the programmer to write programs in terms that are syntactically richer, and more capable of abstracting the code, making it easy to target varying machine instruction sets via compilation declarations and heuristics. Compilers harnessed the power of computers to make programming easier[14] by allowing programmers to specify calculations by entering a formula using infix notation.",
         tags: [],
         created: "04-11-2024 13:59",
         edited: "04-11-2024 14:01",
         bin: true,
      },
   ];
   const tags: TagType[] = [
      {
         id: "-P7HJF9dW5vD0S9fFKpZv",
         name: "tagOne",
         created: "04-11-2024 13:58",
         notes: ["7LUJYTJmEt87BQfF7fELc", "0Lw6PhpAruiZmSZt8VWaX"],
      },
      {
         id: "YbVYxHeMq2tqHOjy03W0r",
         name: "tagTwo",
         created: "04-11-2024 13:58",
         notes: ["0Lw6PhpAruiZmSZt8VWaX"],
      },
   ];
   return [notes, tags];
};
