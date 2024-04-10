import React from "react";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
//@ts-ignoretype
import debounce from "lodash.debounce";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../redux/store";

import { patchNote } from "../redux/data/base";

type EditorProps = {
   note: string;
   preview?: boolean;
};

export const Editor: React.FC<EditorProps> = React.memo(
   ({
      note,
      //dispatch,
      preview = false,
   }) => {
      const { id } = useParams();

      const dispatch = useAppDispatch();

      const [editorInput, setEditorInput] = React.useState<string>(note);

      // eslint-disable-next-line react-hooks/exhaustive-deps
      const debounceEditorInput = React.useCallback(
         debounce((id: string, text: string) => {
            dispatch(patchNote({ id, text }));
         }, 1500),
         [],
      );

      const handleEditorInput = (text: string) => {
         setEditorInput(text);
         debounceEditorInput(id, text);
      };

      return preview ? (
         <MDEditor.Markdown
            source={editorInput}
            //style={{ whiteSpace: "pre-wrap" }}
         />
      ) : (
         <MDEditor
            value={editorInput}
            onChange={(e) => handleEditorInput(e as string)}
            visibleDragbar={false}
            data-color-mode="dark"
            height="100%"
            autoFocus={true}
            previewOptions={{
               rehypePlugins: [[rehypeSanitize]],
            }}
         />
      );
   },
);
