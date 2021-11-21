import { convertJSXToBrowser } from "lib/jsx-helpers";
import {
  convertToCode,
  findImportsFromCode,
  findNodesFromCode,
  generateAST,
  removeImports,
  transformImportNodeToESM,
} from "lib/ast-helpers";

const addWrapperCode = (code) => {
  return `
const Snippet = ${code}
render(<Snippet />,document.querySelector("#root"));
`;
};

const handler = async (req, res) => {
  const code = req.body.code;
  const ast = generateAST(code);
  let imports = (findImportsFromCode(ast) || []).map((item) => ({
    name: item.name,
    code: convertToCode(item.node),
  }));
  const mainSnippetNode = findNodesFromCode(ast) || [];
  let snippet = "";
  if (mainSnippetNode && mainSnippetNode.length > 0) {
    const withReactRenderCode = addWrapperCode(mainSnippetNode[0].code);
    snippet = convertJSXToBrowser(withReactRenderCode);
    const snippetAST = generateAST(snippet);
    const extraImports = findImportsFromCode(snippetAST);
    extraImports.forEach((importItem) => {
      imports.push({
        name: importItem.name,
        code: convertToCode(transformImportNodeToESM(importItem.node)),
      });
    });
    const nodesWithoutImport = removeImports(snippetAST);
    snippet = nodesWithoutImport.map(convertToCode).join("\n");
  }

  return res.json({
    imports,
    snippet: snippet,
  });
};

export default handler;
