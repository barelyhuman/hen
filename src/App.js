import React, { useState } from "react";
import CodeEditor from "./components/code-editor";
const babel = require("@babel/standalone");
import defaultCode from "./default-code";
import Spacer from "./components/spacer";
window.React = React;

const App = (props) => {
  const [component, setComponent] = useState(defaultCode);

  let transformed;

  try {
    if (component) {
      transformed = babel.transform(component, {
        sourceType: "unambiguous",
        plugins: ["transform-react-jsx"],
      }).code;

      transformed = transformed.replace(/\/\*\#\w+\*\//g, "").trim();
      transformed += "\n return Snippet();";
    }
  } catch (err) {
    transformed = "";
  }

  let Parsed = () => <></>;

  try {
    if (transformed) {
      Parsed = new Function(transformed);
    }
  } catch (err) {
    Parsed = () => <></>;
  }

  const iframeCode = `
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello World</title>
    <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">

      const Parsed  = ${Parsed};

      const Index = () => {
        return <>
          <Parsed />
        </>
      }

      ReactDOM.render(
        <Index />,
        document.getElementById('root')
      );

    </script>
  </body>
</html>

    `;

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
          <iframe srcDoc={iframeCode}></iframe>
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
