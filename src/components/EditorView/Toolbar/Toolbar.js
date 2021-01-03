import React, { useState, useEffect } from "react";
import { LinkTwo, CheckCorrect, Quote } from "@icon-park/react";
import './Toolbar.css';
const Toolbar = () => {
  return (
    <div className="editor-toolbar">
      <div className="editor-toolbar-left">
        <CheckCorrect
          theme="outline"
          size="16"
          fill="#7D7D7D"
          strokeWidth={3}
          strokeLinecap="butt"
        />
        <LinkTwo
          theme="outline"
          size="16"
          fill="#7D7D7D"
          strokeWidth={3}
          strokeLinecap="butt"
        />
        <Quote
          theme="outline"
          size="16"
          fill="#7D7D7D"
          strokeWidth={3}
          strokeLinecap="butt"
        />
      </div>
    </div>
  );
};

export default Toolbar;
