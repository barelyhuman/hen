import { transform } from "@babel/core";
import presetReact from "@babel/preset-react";
import * as Acorn from "acorn";
import transfromBackToJSX from "babel-plugin-transform-react-createelement-to-jsx";
import { generate as codeGenerate } from "escodegen";
import ObjPath from "object-path";

// TODO: currently each function regenerates an AST for no reason,
// remove the un-needed transforms and back and handle it all with one huge modified chunk
// of ast
export const findImportsFromCode = (code) => {
  const transformedCode = transform(code, {
    sourceType: "unambiguous",
    presets: [presetReact],
  }).code;

  const ast = Acorn.parse(transformedCode, {
    ecmaVersion: "2020",
    sourceType: "module",
  });

  const nodes = ast.body.filter((node) => {
    const type = node.type;
    return type === "ImportDeclaration";
  });

  return nodes.map((node) => {
    return {
      name: ObjPath.get(node, "specifiers.0.local.name"),
      code: backToJSX(node),
    };
  });
};

export const findNodesFromCode = (code) => {
  const transformedCode = transform(code, {
    sourceType: "unambiguous",
    presets: [presetReact],
  }).code;

  const ast = Acorn.parse(transformedCode, {
    sourceType: "module",
    ecmaVersion: "2020",
  });

  const nodes = ast.body.filter(isMainNode);

  return nodes.map((node) => {
    return {
      name: ObjPath.get(node, "declarations.0.id.name"),
      code: backToJSX(node),
    };
  });
};

function convertToCode(node) {
  return codeGenerate(node);
}

function backToJSX(node) {
  let codeOut = transform(convertToCode(node), {
    presets: [],
    plugins: [transfromBackToJSX],
  }).code;

  return codeOut;
}

function findReactNodes(ast) {
  const { body } = ast;
  return body.filter(isReactNode);
}

function isReactNode(node) {
  const type = node.type;
  let obj;
  let func;
  const mainBody = ObjPath.get(node, "declarations.0.init.body");
  if (mainBody) {
    mainBody.body.forEach((item) => {
      obj =
        ObjPath.get(item, "argument.callee.object.name") === "React"
          ? "React"
          : null;
      func =
        ObjPath.get(item, "argument.callee.property.name") === "createElement"
          ? "createElement"
          : null;
    }, "");
  }
  return (
    (type === "ExpressionStatement" || type === "VariableDeclaration") &&
    obj === "React" &&
    func === "createElement"
  );
}

function isMainNode(node) {
  const type = node.type;
  let obj;
  let func;
  const mainBody = ObjPath.get(node, "expression.type");
  return (
    type === "ExpressionStatement" && mainBody === "ArrowFunctionExpression"
  );
}

export const transformImportsToESM = (importCode) => {
  const ast = Acorn.parse(importCode, {
    ecmaVersion: "2020",
    sourceType: "module",
  });

  const nodes = ast.body.map((node) => {
    const type = node.type;
    if (type == "ImportDeclaration" && node.source.value) {
      node.source.value = `https://esm.sh/${node.source.value}`;
    }
    return convertToCode(node);
  });

  return {
    name: null,
    code: nodes[0],
  };
};

export const removeImports = (code) => {
  const ast = Acorn.parse(code, {
    ecmaVersion: "2020",
    sourceType: "module",
  });

  const nodes = ast.body.filter((node) => {
    const type = node.type;
    return type !== "ImportDeclaration";
  });

  return nodes.map((node) => {
    return {
      name: ObjPath.get(node, "specifiers.0.local.name"),
      code: convertToCode(node),
    };
  });
};
