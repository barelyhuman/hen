import React, { useState } from "react";
import CodeEditor from "./components/code-editor";
window.React = React;
const babel = require("@babel/standalone");
import defaultCode from "./default-code";

const App = (props) => {
  try {
    const [component, setComponent] = useState(defaultCode);

    let transformed;

    try {
      transformed = babel.transform(component, {
        plugins: ["transform-react-jsx"],
      }).code;

      transformed =
        "return " + transformed.replace(/\/\*\#\w+\*\//g, "").trim();
    } catch (err) {
      console.log("transform error");
    }

    let Parsed = () => <></>;
    try {
      if (transformed) {
        Parsed = new Function(transformed);
      }
    } catch (err) {
      console.log("Component creation error");
    }

    return (
      <>
        <r-grid columns="3">
          <r-cell></r-cell>
          <r-cell>
            <h1 align="center">Hen</h1>
            <p align="center">UI Component Playground</p>
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
  } catch (err) {
    return (
      <>
        <r-grid columns="3">
          <r-cell></r-cell>
          <r-cell>
            <h1 align="center">Hen</h1>
            <p align="center">UI Component Playground</p>
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
            <></>
          </r-cell>
        </r-grid>
      </>
    );
  }
};

export default App;
