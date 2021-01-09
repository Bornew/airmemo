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
  return (
    <div className="editor-wrapper">
      <Toolbar />
      <div className="editor-content">
        <EditorBlock getEditorContent={getEditorContent} />
        {/*其他block*/}
      </div>
      <Menubar content={content} />
    </div>
  );
};

export default EditorView;
