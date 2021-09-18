import { Editor } from "containers/editor";
import { IFrameContainer } from "containers/iframe-container";
import { useAsyncEffect } from "hooks/use-async-effect";
import { fetcher } from "lib/fetcher";
import { useState, useEffect } from "react";
import defaultCode from "templates/empty-code";
import debounce from "lodash.debounce";
import Header from "containers/header";

const CODE_STORAGE_TOKEN = Symbol("hen-code").toString();

const getDefaultCode = () => {
  if (typeof window !== "object") {
    return;
  }
  const code = localStorage.getItem(CODE_STORAGE_TOKEN);
  if (code && code.length) {
    return code;
  }
  return defaultCode;
};

export default function Home() {
  const [code, setCode] = useState(getDefaultCode());
  const [imports, setImports] = useState([]);
  const [snippet, setSnippet] = useState();

  useAsyncEffect(async () => {
    await handleOnCodeChange(getDefaultCode());
  }, []);

  // Call the transform code api to handle the given code
  // transform it to a react mountable node
  const handleOnCodeChange = async (_code) => {
    try {
      const response = await fetcher("/api/transform-code", "POST", {
        code: _code,
      });
      setImports(response.imports);
      setSnippet(response.snippet);
    } catch (err) {
      // ignore
    }
    localStorage.setItem(CODE_STORAGE_TOKEN, _code);
    setCode(_code);
  };

  // Debounce the change handler to avoid triggering
  // the transform call every keystroke
  const debouncedHandleChange = debounce(handleOnCodeChange, 500);

  return (
    <>
      <Header />
      <section className="p-2">
        <div className="flex flex-wrap">
          <div className="flex-1">
            <h3>Editor</h3>
            <hr />
            <Editor defaultValue={code} onChange={debouncedHandleChange} />
          </div>
          <div className="ml-1 flex-1">
            <h3>Preview</h3>
            <hr />
            <IFrameContainer imports={imports} snippet={snippet} />
          </div>
        </div>
      </section>
    </>
  );
}
