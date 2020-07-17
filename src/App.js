import React, { useState, useEffect, useRef } from "react";
import CodeEditor from "./components/code-editor";
const babel = require("@babel/standalone");
import defaultCode from "./default-code";
import Spacer from "./components/spacer";
window.React = React;

const App = (props) => {
  const [component, setComponent] = useState(defaultCode);
  const [Parsed, setParsed] = useState("()=><></>");
  const [template, setTemplate] = useState("");
  const iframeRef = useRef(null);
  let transformed;

  useEffect(() => {
    window.addEventListener("message", function (message) {
      if (message.data === "loaded-iframe") {
        resizeIFrameToFitContent();
      }
    });
  }, [iframeRef]);

  useEffect(() => {
    parseComponentCode(component);
  }, [component]);

  useEffect(() => {
    updateTemplate();
  }, [Parsed]);

  function updateTemplate() {
    const iframeCode = `
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello World</title>
    <script src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      let _react = {};
      _react.default = React;
      
      ${Parsed}
      

      const Index = () => {
        parent.postMessage("loaded-iframe");
        return (
          <>
            <Snippet />
          </>
        );
      };

      ReactDOM.render(<Index />, document.getElementById("root"));
    </script>
  </body>
</html>
    `;
    setTemplate(iframeCode);
  }

  function parseComponentCode() {
    try {
      if (component) {
        transformed = babel.transform(component, {
          sourceType: "unambiguous",
          plugins: ["transform-react-jsx"],
        }).code;

        transformed = transformed.replace(/\/\*\#\w+\*\//g, "").trim();
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
        <r-cell></r-cell>
        <r-cell>
          <h1 align="center">Hen</h1>
          <p align="center">UI Component Playground</p>
          <p align="center">
            <a href="https://github.com/barelyhuman/hen#readme">
              Documentation
            </a>
          </p>
          <p align="center" className="note">
            <strong>Note: </strong> The `Snippet` function needs to exist for
            the preview to work.
          </p>
        </r-cell>
        <r-cell></r-cell>
        <r-cell span="row"></r-cell>
      </r-grid>
      <r-grid columns="2">
        <r-cell>
          <CodeEditor
            code={component}
            onCodeChange={(code) => setComponent(code)}
          />
        </r-cell>
        <r-cell>
          <Spacer y={5} />
          <iframe ref={iframeRef} srcDoc={template}></iframe>
        </r-cell>
      </r-grid>
      <style jsx>
        {`
          .note {
            background: #eaeaea;
            color: #000;
            padding: 8px 16px;
            width: auto;
            height: 32px;
            border-radius: 4px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>
    </>
  );
};

export default App;
