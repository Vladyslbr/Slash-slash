import React, { Suspense } from "react";
import rehypeSanitize from "rehype-sanitize";
import rehypeRewrite, { RehypeRewriteOptions } from 'rehype-rewrite';
import { PluggableList } from 'unified'

//@ts-ignoretype
import debounce from "lodash.debounce";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import { patchNote } from "../redux/data/base";

const MDEditor = React.lazy(() => import("@uiw/react-md-editor"));
const MDEditorPreview = React.lazy(() => import("@uiw/react-markdown-preview"));

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

      const [editorInput, _setEditorInput] = React.useState<string>(note);

      // eslint-disable-next-line react-hooks/exhaustive-deps
      const _debounceEditorInput = React.useCallback(
         debounce((id: string, text: string) => {
            dispatch(patchNote({ id, text }));
         }, 1500),
         [],
      );

      const handleEditorInput = (text: string) => {
         _setEditorInput(text);
         _debounceEditorInput(id, text);
      };

      const rehypePlugins: PluggableList = [
         rehypeSanitize,
         // to remove <a> header link
         [rehypeRewrite, {
             rewrite: (node, index, parent) => {
               if (
                 node.type === 'element' &&
                 node.tagName === "a" &&
                 parent && 
                 parent.type === 'element' &&
                 /^h(1|2|3|4|5|6)/.test(parent.tagName)
               ) {
                 parent.children = [parent.children[1]];
               }
             }
         } as RehypeRewriteOptions]
      ];

      return preview ? (
         <Suspense fallback={<div>...//...</div>}>
            <div>
         <MDEditorPreview
            source={editorInput}
            wrapperElement={{
               "data-color-mode": "dark"
            }}
            rehypePlugins={rehypePlugins}
         />
         </div>
         
         </Suspense>
      ) : (
         <Suspense fallback={<div>...//...</div>}>
            <MDEditor
               value={editorInput}
               onChange={(e) => handleEditorInput(e as string)}
               visibleDragbar={false}
               data-color-mode="dark"
               height="100%"
               autoFocus={true}
               previewOptions={{
                  rehypePlugins: rehypePlugins,
               }}
               textareaProps={{
                  placeholder: "New markdown..."
               }}
            />
         </Suspense>
      );
   },
);
