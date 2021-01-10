import React, { useState, useEffect, useCallback } from "react";
import EditorBlock from "./EditorBlock";
import "./EditorView.css";
import Toolbar from "./Toolbar";
import Menubar from "./Menubar";

const EditorView = () => {
  const [content, setContent] = useState(""); //初始值为空
  const getEditorContent = useCallback((content) => {
    setContent(content);
  }, []);
  // var container = document.getElementById('editor');
  // var editor = new Quill(container);
  return (
    <div>
      <div className="editor-wrapper">
        <Toolbar />
        <div className="editor-content">
          <EditorBlock getEditorContent={getEditorContent} />
        </div>
        <Menubar content={content} />
      </div>
    </div>
  );
};

export default EditorView;
