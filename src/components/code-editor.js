import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";

export default (props) => {
  const [code, setCode] = useState(`
    import React from 'react';


    function Link(){
      return <a href="https://hen.reaper.im">Hen</a>
    }

    export default Link;
  `);

  const handleValueChange = (code) => {
    setCode(code);
  };

  return (
    <>
      <Editor
        value={code}
        onValueChange={handleValueChange}
        highlight={(code) => highlight(code, languages.js)}
        padding={10}
        textareaClassName="hen-code-editor"
      />
      <style jsx global>
        {`
          .hen-code-editor + pre {
            font-size: 12px;
            min-height: 200px;
            border: 2px solid rgba(12, 12, 13, 0.1) !important;
            border-radius: 4px;
          }

          .hen-code-editor:focus + pre,
          .hen-code-editor:hover + pre {
            border-color: #000 !important;
          }
        `}
      </style>
    </>
  );
};
