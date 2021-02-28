import * as Acorn from 'acorn';
import { transform } from '@babel/standalone';
import ObjPath, { set } from 'object-path';
import { generate as codeGenerate } from 'escodegen';

import transfromBackToJSX from 'babel-plugin-transform-react-createelement-to-jsx';
import styledJSX from 'styled-jsx/babel';

export const findNodesFromCode = (code) => {
  const transformedCode = transform(code, {
    sourceType: 'unambiguous',
    presets: ['env', 'react'],
  }).code;

  const ast = Acorn.parse(transformedCode);

  const nodes = findReactNodes(ast, { sourceType: 'module' });

  return nodes.map((node) => {
    return {
      name: ObjPath.get(node, 'declarations.0.id.name'),
      code: backToJSX(node),
    };
  });
};

function convertToCode(node) {
  return codeGenerate(node);
}

function backToJSX(node) {
  let codeOut = transform(convertToCode(node), {
    presets:[],
    plugins: [transfromBackToJSX, styledJSX],
  }).code;

  const isStyledJSX = codeOut.indexOf('<style jsx={true}>') > -1;
  if (isStyledJSX) {
    codeOut = codeOut
      .replace(/(\<style jsx=\{true\}\>)[`]*/g, '<style jsx={true}>{`')
      .replace(/[`]*(\<\/style\>)/g, '`}</style>');
  }

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
  const mainBody = ObjPath.get(node, 'declarations.0.init.body');
  if (mainBody) {
    mainBody.body.forEach((item) => {
      obj =
        ObjPath.get(item, 'argument.callee.object.name') === 'React'
          ? 'React'
          : null;
      func =
        ObjPath.get(item, 'argument.callee.property.name') === 'createElement'
          ? 'createElement'
          : null;
    }, '');
  }
  return (
    (type === 'ExpressionStatement' || type === 'VariableDeclaration') &&
    obj === 'React' &&
    func === 'createElement'
  );
}
