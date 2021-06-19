import debounce from "lodash.debounce";
import parserBabel from "prettier/parser-babel";
import parserPCSS from "prettier/parser-postcss";
import prettier from "prettier/standalone";

import { useCodeJar } from "react-codejar";
import "highlight.js/styles/mono-blue.css";
import hljs from "highlight.js";

import React, { useCallback, useEffect, useRef, useState } from "react";
import useMousetrap from "react-hook-mousetrap";
import Button from "./button";
import Spacer from "./spacer";

import { findNodesFromCode } from "../lib/findNodesFromCode";
import { isSnippetNode } from "../lib/isSnippetNode";
import { createZip } from "../lib/createZip";

const highligher = (editor) => {
  const code = editor.textContent;
  editor.innerHTML = hljs.highlightAuto(code, ["js"]).value;
};

export default (props) => {
  const [code, setCode] = useState(props.code);
  const [experimentalExport, setExperimentalExport] = useState(false);

  const formatCallback = useCallback(() => {
    formatCode(code);
  }, [code]);

  const editorRef = useCodeJar({
    code,
    onUpdate: (update) => {
      setCode(update);
      props.onCodeChange(update);
    },
    highlight: highligher,
    lineNumbers: false,
    options: {
      tab: "  ",
    },
  });

  useMousetrap(["ctrl+shift+f"], formatCallback);

  const formatCode = (toFormatCode) => {
    const _value = prettier.format(toFormatCode, {
      parser: "babel",
      plugins: [parserBabel, parserPCSS],
    });
    setCode(_value);
    props.onCodeChange(_value);
  };

  const exportCode = () => {
    const files = [];
    if (experimentalExport) {
      const nodes = findNodesFromCode(code);
      const validNodes = nodes.filter((item) => !isSnippetNode(item));

      validNodes.forEach((item) => {
        files.push({
          name: String(item.name).toLowerCase() + ".js",
          content: item.code,
        });
      });
    } else {
      const file = { name: "hen.js", content: code };
      files.push(file);
    }

    createZip(files);
  };

  return (
    <>
      <div>
        <Button onClick={(e) => formatCode(code)}>Format (Ctrl+Shift+F)</Button>
        <Spacer x={1} inline />
        <Button secondary onClick={(e) => exportCode(code)}>
          Export Code
        </Button>
        <Spacer y={2} />
        <div>
          <label htmlFor="">
            <input
              type="checkbox"
              value={experimentalExport}
              onChange={(e) => setExperimentalExport(e.target.value)}
            />
            Enable experimental split export?
          </label>
        </div>
      </div>
      <Spacer y={1} />
      <div className="hen-code-wrapper" ref={editorRef}></div>
      <style jsx global>
        {`
          .hen-code-wrapper {
            padding: 10px;
            border-radius: 4px !important;
            min-height: 200px !important;
            border: 2px solid rgba(12, 12, 13, 0.1) !important;
            border-radius: 4px !important;
            font-family: "Hack", monospace;
            font-size: 14px;
            line-height: 25.2px;
          }
        `}
      </style>
    </>
  );
};
