import debounce from "lodash.debounce";
import parserBabel from "prettier/parser-babel";
import prettier from "prettier/standalone";

import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";

import React, { useCallback, useState } from "react";
import useMousetrap from "react-hook-mousetrap";
import Editor from "react-simple-code-editor";
import Button from "./button";
import Spacer from "./spacer";

export default (props) => {
  const [code, setCode] = useState(props.code);

  const formatCallback = useCallback(() => {
    formatCode(code);
  }, [code]);

  useMousetrap(["ctrl+shift+f"], formatCallback);

  const debouncedTrigger = debounce(props.onCodeChange, 1000);

  const handleValueChange = (code) => {
    let _value = code;
    setCode(_value);
    debouncedTrigger(_value);
  };

  const formatCode = (toFormatCode) => {
    let _value = prettier.format(toFormatCode, {
      parser: "babel",
      plugins: [parserBabel],
    });
    setCode(_value);
    props.onCodeChange(_value);
  };

  return (
    <>
      <Button onClick={(e) => formatCode(code)}>Format (Ctrl+Shift+F)</Button>
      <Spacer y={1} />
      <Editor
        value={code}
        onValueChange={handleValueChange}
        highlight={(code) => highlight(code, languages.js)}
        padding={10}
        className="hen-code-wrapper"
        textareaClassName="hen-code-editor"
        preClassName="hen-code-editor-pre"
      />
      <style jsx global>
        {`
          .hen-code-wrapper {
            font-size: 16px !important;
            line-height: 28px;
          }

          .hen-code-editor + .hen-code-editor-pre {
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
