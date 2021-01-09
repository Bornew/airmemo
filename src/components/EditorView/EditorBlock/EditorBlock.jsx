import React, { useState, useCallback, useMemo, useEffect } from "react";
import "./EditorBlock.css";
import {
  Node,
  Editor,
  Transforms,
  Range,
  Text,
  Point,
  createEditor,
  Element as SlateElement,
} from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";

const SHORTCUTS = {
  "*": "list-item",
  "-": "list-item",
  "+": "list-item",
  ">": "block-quote",
  "-[ ]": "checklist-item",
};
const EditorBlock = (props) => {
  const { getEditorContent } = props;
  const [value, setValue] = useState(initialValue);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const editor = useMemo(
    () => withShortcuts(withReact(withHistory(createEditor()))),
    []
  );
  const updateEditorContent = useCallback(()=>{
    getEditorContent(value);
    console.log(value);
  }, [value, getEditorContent]);

  const Leaf = (props) => {
    return (
      <span
        {...props.attributes}
        style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
      >
        {props.children}
      </span>
    );
  };
  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);
  const renderMark = (props, editor, next) => {
    if (props.mark.type === "bold") {
      return <strong>{props.children}</strong>;
    } else if (props.mark.type === "italic") {
      return <em>{props.children}</em>;
    }
    return next;
  };
  const onKeyDown = (event, editor, next) => {
    if (event.key == "b" && event.metaKey) {
      editor.toggleMark("bold");
    } else if (event.key == "i" && event.metaKey) {
      editor.toggleMark("italic");
    } else if (event.key == "u" && event.metaKey) {
      editor.toggleMark("underline");
    } else {
      return next; // don't forget to call next if you don't handle it.
    }
  };
  useEffect(() => {
    console.log(value, typeof getEditorContent);
    updateEditorContent();
  }, [value]);
  return (
    <div>
      {/*<button*/}
      {/*  onClick={(e) => {*/}
      {/*    e.preventDefault();*/}
      {/*    // editor.toggleMark("bold");*/}
      {/*    Transforms.setNodes(*/}
      {/*      editor,*/}
      {/*      { bold: true },*/}
      {/*      // Apply it to text nodes, and split the text node up if the*/}
      {/*      // selection is overlapping only part of it.*/}
      {/*      { match: (n) => Text.isText(n), split: true }*/}
      {/*    );*/}
      {/*  }}*/}
      {/*>*/}
      {/*  bold*/}
      {/*</button>*/}
      <Slate
        editor={editor}
        value={value}
        renderMark={renderMark}
        onChange={(value) => setValue(value)}
      >
        <Editable
          className="editor-input"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Writing is not a way to PRESENT our thoughts, but a way to INSPIRE thinking"
          autoFocus
          tabIndex={2}
          onKeyDown={onKeyDown}
          onCompositionEnd={(e) => {
            Transforms.setNodes(
              editor,
              {
                key: +new Date(),
              },
              { match: Text.isText }
            );
          }}
        />
      </Slate>
    </div>
  );
};

const withShortcuts = (editor) => {
  const { deleteBackward, insertText } = editor;

  editor.insertText = (text) => {
    const { selection } = editor;

    if (text === " " && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection;
      const block = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });
      const path = block ? block[1] : [];
      const start = Editor.start(editor, path);
      const range = { anchor, focus: start };
      const beforeText = Editor.string(editor, range);
      const type = SHORTCUTS[beforeText];

      if (type) {
        Transforms.select(editor, range);
        Transforms.delete(editor);
        const newProperties = {
          type,
        };
        Transforms.setNodes(editor, newProperties, {
          match: (n) => Editor.isBlock(editor, n),
        });

        if (type === "list-item") {
          const list = { type: "bulleted-list", children: [] };
          Transforms.wrapNodes(editor, list, {
            match: (n) =>
              !Editor.isEditor(n) &&
              SlateElement.isElement(n) &&
              n.type === "list-item",
          });
        }

        return;
      }
    }

    insertText(text);
  };

  editor.deleteBackward = (...args) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });

      if (match) {
        const [block, path] = match;
        const start = Editor.start(editor, path);

        if (
          !Editor.isEditor(block) &&
          SlateElement.isElement(block) &&
          block.type !== "paragraph" &&
          Point.equals(selection.anchor, start)
        ) {
          const newProperties = {
            type: "paragraph",
          };
          Transforms.setNodes(editor, newProperties);

          if (block.type === "list-item") {
            Transforms.unwrapNodes(editor, {
              match: (n) =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                n.type === "bulleted-list",
              split: true,
            });
          }

          return;
        }
      }

      deleteBackward(...args);
    }
  };

  return editor;
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const initialValue = [
  {
    type: "paragraph",
    children: [
      {
        text: "",
      },
    ],
  },
];
export default EditorBlock;
