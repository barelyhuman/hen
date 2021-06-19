import React, { useEffect, useRef, useState } from "react";
import CodeEditor from "./components/code-editor";
import Spacer from "./components/spacer";
import defaultCode from "./default-code";
import debounce from "lodash.debounce";
import { iframeTemplateCode } from "./template/iframe";
const babel = require("@babel/standalone");
window.React = React;

const App = (props) => {
  const [component, setComponent] = useState(defaultCode);
  const [Parsed, setParsed] = useState("()=><></>");
  const [error, setError] = useState("");
  const [template, setTemplate] = useState("");
  const iframeRef = useRef(null);
  let transformed;

  useEffect(() => {
    window.addEventListener("message", function (message) {
      if (message.data === "loaded-iframe") {
        resizeIFrameToFitContent();
      }

      if (message.data.type === "error") {
        setError(message.data.data.message);
      }
    });
  }, [iframeRef]);

  useEffect(() => {
    setError("");
    parseComponentCode(component);
  }, [component]);

  useEffect(() => {
    updateTemplate();
  }, [Parsed]);

  const debouncedSetComponentCode = debounce(setComponent, 500);

  function updateTemplate() {
    setTemplate(iframeTemplateCode(Parsed));
  }

  function parseComponentCode() {
    try {
      if (component) {
        transformed = babel.transform(component, {
          sourceType: "unambiguous",
          plugins: ["transform-react-jsx"],
        }).code;

        transformed = transformed.replace(/\/\*#\w+\*\//g, "").trim();
      }
      if (transformed) {
        setParsed(transformed);
      }
    } catch (err) {
      transformed = "";
      setParsed("()=>{return <></>}");
    }
  }

  function resizeIFrameToFitContent() {
    if (iframeRef && iframeRef.current) {
      if (
        iframeRef.current.width <
        parseInt(iframeRef.current.contentWindow.document.body.scrollWidth)
      ) {
        iframeRef.current.width =
          parseInt(iframeRef.current.contentWindow.document.body.scrollWidth) +
          100;
      }

      if (
        iframeRef.current.height <
        parseInt(iframeRef.current.contentWindow.document.body.scrollHeight)
      ) {
        iframeRef.current.height =
          parseInt(iframeRef.current.contentWindow.document.body.scrollHeight) +
          100;
      }
    }
  }

  return (
    <>
      <r-grid columns="3">
        <r-cell />
        <r-cell>
          <h1 align="center">Hen</h1>
          <p align="center" className="p-0 m-0">
            UI Component Playground
          </p>
          <p align="center">
            <a href="https://github.com/barelyhuman/hen#readme">
              Documentation
            </a>
          </p>
          <div className="flex flex-center flex-col">
            <details className="note w-250-px">
              <summary>
                <strong>Note: </strong> Enable experimental split export?
              </summary>
              <Spacer y={1} />
              <p>
                This will try to split the added components into different files
                and export them accordingly. This may or may not work since it
                requires creating an AST to find the nodes and the conversion
                back to the written code needs to be worked on. This is added
                into this version just to let users know that its a part of the
                future scope.
              </p>
            </details>
          </div>
        </r-cell>
        <r-cell />
        <r-cell span="row" />
      </r-grid>
      <r-grid columns="2">
        <r-cell span="row">
          {error ? (
            <p align="center" className="w-100 note error">
              {error}
            </p>
          ) : null}
        </r-cell>
        <r-cell>
          <CodeEditor
            code={component}
            onCodeChange={(code) => debouncedSetComponentCode(code)}
          />
        </r-cell>
        <r-cell>
          <Spacer y={9} />
          <iframe
            style={{ minWidth: "100%", position: "fixed" }}
            ref={iframeRef}
            srcDoc={template}
          />
        </r-cell>
      </r-grid>
      <style jsx>
        {`
          .note {
            background: #eaeaea;
            color: #000;
            padding: 8px 16px;
            width: auto;
            min-height: 32px;
            border-radius: 4px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
          }

          .note.error {
            background: #bf616a;
            color: #fff;
          }

          .w-100 {
            width: 100%;
          }

          .w-250-px {
            width: 250px;
          }

          .flex {
            display: flex;
          }

          .flex-center {
            justify-content: center;
            align-items: center;
          }

          .flex-col {
            flex-direction: column;
          }
        `}
      </style>
    </>
  );
};

export default App;
