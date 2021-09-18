import { Spacer } from "components/spacer";
import hljs from "highlight.js";
import React, { useState, useEffect } from "react";
import CodeEditor from "react-simple-code-editor";
import debounce from "lodash.debounce";

import { EditorToolbar } from "./editor-toolbar";

const highlighter = (code) => {
  return code && code.length && hljs.highlightAuto(code, ["js"]).value;
};

export const Editor = ({ defaultValue, value, onChange, ...props }) => {
  const [code, setCode] = useState(defaultValue || "");

  //  un-needed control but breaks due to an issue with codejar, so left as is for now
  const handleChange = (code) => {
    setCode(code);
    onChange && onChange(code);
  };

  //  un-needed control but breaks due to an issue with codejar, so left as is for now
  useEffect(() => {
    setCode(value);
  }, [value]);

  return (
    <>
      <EditorToolbar code={code} onChange={handleChange} />
      <CodeEditor
        value={code}
        onValueChange={handleChange}
        highlight={highlighter}
        padding={10}
        style={{
          fontFamily: '"Hack", monospace',
          fontSize: 14,
        }}
      />
    </>
  );
};
