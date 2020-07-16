import React from "react";
import CodeEditor from "./components/code-editor";

const App = (props) => {
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
          <CodeEditor />
        </r-cell>
        <r-cell></r-cell>
      </r-grid>
    </>
  );
};

export default App;
