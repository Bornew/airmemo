import React, { useState, useEffect } from "react";
import EditorBlock from "./EditorBlock";
import "./EditorView.css";
import Toolbar from "./Toolbar";
import Menubar from "./Menubar";

const EditorView = (props) => {
  return (
    <div className="editor-wrapper">
      <Toolbar />
      <div className="editor-content">
        <EditorBlock />
        {/*其他block*/}
      </div>
      <Menubar />
    </div>
  );
};

export default EditorView;
