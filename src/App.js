import React, { useState } from "react";
import CodeEditor from "./components/code-editor";
window.React = React;
const babel = require("@babel/standalone");
import defaultCode from "./default-code";

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
    console.log("transform error");
  }

  let Parsed = () => <></>;

  try {
    if (transformed) {
      Parsed = new Function(transformed);
      Parsed();
    }
  } catch (err) {
    Parsed = () => <></>;
    console.log("Component creation error");
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
          <Parsed />
        </r-cell>
      </r-grid>
    </>
  );
};

export default App;
