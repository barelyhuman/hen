import debounce from "lodash.debounce";
import parserBabel from "prettier/parser-babel";
import parserPCSS from "prettier/parser-postcss";
import prettier from "prettier/standalone";

import hljs from "highlight.js";
import Apex from "@barelyreaper/apex";

// import "highlight.js/styles/github.css";

import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import useMousetrap from "react-hook-mousetrap";
import Button from "./button";
import Spacer from "./spacer";

import { findNodesFromCode } from "../lib/findNodesFromCode";
import { isSnippetNode } from "../lib/isSnippetNode";
import { createZip } from "../lib/createZip";

export default (props) => {
  const [code, setCode] = useState(props.code);
  const [experimentalExport, setExperimentalExport] = useState(false);

  const apexInstance = useRef();

  useEffect(() => {
    apexInstance.current = new Apex({
      el: document.getElementById("code-editor"),
      tabSpace: 2,
      font: "Hack,monospace",
      fontSize: "14",
      placeholder: "Enter Code here",
      value: code,
      className: "hen-code-wrapper",
      onChange: (_code) => {
        setCode(_code);
        debouncedTrigger(_code);
      },
      highlight: (_code) => hljs.highlightAuto(_code).value,
    });
  }, []);

  const formatCallback = useCallback(() => {
    formatCode(code);
  }, [code]);

  useMousetrap(["ctrl+shift+f"], formatCallback);

  const debouncedTrigger = debounce(props.onCodeChange, 1000);

  const formatCode = (toFormatCode) => {
    const _value = prettier.format(toFormatCode, {
      parser: "babel",
      plugins: [parserBabel,parserPCSS],
    });
    if (apexInstance.current) {
      apexInstance.current.updateCode(_value);
    }
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
      <div id="code-editor"></div>
      <style jsx global>
        {`
          .hen-code-wrapper {
            border-radius: 4px !important;
          }

          .hen-code-wrapper > textarea {
            border-radius: 4px !important;
          }

          .hen-code-wrapper > textarea + pre {
            min-height: 200px !important;
            border: 2px solid rgba(12, 12, 13, 0.1) !important;
            border-radius: 4px !important;
            outline: none;
          }

          .hen-code-wrapper > textarea:focus + pre,
          .hen-code-wrapper > textarea:hover + pre {
            border-color: #000 !important;
            outline: none;
          }
        `}
      </style>
    </>
  );
};
