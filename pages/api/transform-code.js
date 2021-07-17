import { convertJSXToBrowser } from "lib/jsx-helpers";
import {
  findImportsFromCode,
  findNodesFromCode,
  removeImports,
  transformImportsToESM,
} from "lib/ast-helpers";

const addWrapperCode = (code) => {
  return `
const Snippet = ${code}
render(<Snippet />,document.querySelector("#root"));
`;
};

const handler = async (req, res) => {
  const code = req.body.code;
  let imports = findImportsFromCode(code) || [];
  const mainSnippetNode = findNodesFromCode(code) || [];
  let snippet = "";
  if (mainSnippetNode && mainSnippetNode.length > 0) {
    const withReactRenderCode = addWrapperCode(mainSnippetNode[0].code);
    snippet = convertJSXToBrowser(withReactRenderCode);
    const extraImports = findImportsFromCode(snippet);
    extraImports.forEach((importItem) => {
      imports.push(transformImportsToESM(importItem.code));
    });
    const nodesWithoutImport = removeImports(snippet);
    snippet = nodesWithoutImport.map((item) => item.code).join("\n");
  }

  return res.json({
    imports,
    snippet: snippet,
  });
};

export default handler;
