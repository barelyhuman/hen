import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";

export default (props) => {
  const [code, setCode] = useState(props.code);

  const handleValueChange = (code) => {
    let _value = code;
    if (!code) {
      _value = `
      <>
      
      </>
      `;
    }
    setCode(_value);
    props.onCodeChange(_value);
  };

  return (
    <>
      <Editor
        value={code}
        onValueChange={handleValueChange}
        highlight={(code) => highlight(code, languages.js)}
        padding={10}
        textareaClassName="hen-code-editor"
        preClassName="hen-code-editor-pre"
      />
      <style jsx global>
        {`
          .hen-code-editor + .hen-code-editor-pre {
            font-size: 12px;
            min-height: 200px;
            border: 2px solid rgba(12, 12, 13, 0.1) !important;
            border-radius: 4px;
          }

          .hen-code-editor:focus + .hen-code-editor-pre,
          .hen-code-editor:hover + .hen-code-editor-pre {
            border-color: #000 !important;
          }
        `}
      </style>
    </>
  );
};
