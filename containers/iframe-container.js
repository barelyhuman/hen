import { useEffect, useState, useRef } from "react";
import { iframeTemplateCode } from "templates/iframe-template";

// TODO: clean up and handle more edge cases in terms of errors
export const IFrameContainer = ({ imports, snippet, ...props }) => {
  const iframeRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setError();
  }, [imports, snippet]);

  useEffect(() => {
    window.addEventListener("message", function (message) {
      if (message.data === "loaded-iframe") {
        resizeIFrameToFitContent();
      }

      if (message.data.type === "error") {
        setError(message.data.data.message);
      }
    });
  }, [iframeRef]);

  const compilediFrameTemplate = iframeTemplateCode(
    imports.map((item) => item.code).join(""),
    snippet
  );

  return (
    <>
      {error ? <p className="error-text">{error}</p> : null}
      <iframe ref={iframeRef} srcDoc={compilediFrameTemplate} />
      <style jsx>{`
        .error-text {
          background: var(--oc-red-2);
          padding: 1em;
          color: var(--oc-red-9);
        }

        iframe {
          position: fixed;
          width: 100%;
          height: 100%;
          outline: #000;
          border: 0px;
          overflow-y: auto;
        }
      `}</style>
    </>
  );
};
