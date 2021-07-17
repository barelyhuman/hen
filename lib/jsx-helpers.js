import { transform } from "@babel/core";
import styledJSX from "styled-jsx/babel";
import presetEnv from "@babel/preset-env";
import presetReact from "@babel/preset-react";

export const convertJSXToBrowser = (code) => {
  const transformedCode = transform(code, {
    sourceType: "unambiguous",
    presets: [presetEnv, presetReact],
    plugins: [styledJSX],
  }).code;

  return transformedCode;
};
