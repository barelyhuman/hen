import { useEffect } from "react";
import debounce from "lodash.debounce";
import { fetcher } from "lib/fetcher";
import { Button } from "components/button";
import { Spacer } from "components/spacer";
import exampleCode from "templates/default-code";
import emptyCode from "templates/empty-code";

export function EditorToolbar({ code, onChange, ...props }) {
  useEffect(() => {
    debouncedFormat();
  }, []);

  async function format() {
    const formattedCode = await fetcher("/api/formatter", "POST", { code });
    onChange && onChange(formattedCode.code);
  }

  async function insertExampleCode() {
    const formattedCode = await fetcher("/api/formatter", "POST", {
      code: exampleCode,
    });
    onChange && onChange(formattedCode.code);
  }

  async function resetCode() {
    onChange && onChange(emptyCode);
  }

  const debouncedFormat = debounce(format, 500);

  return (
    <>
      <Spacer y={1} />
      <Button secondary onClick={debouncedFormat}>
        Format Code
      </Button>
      <Spacer x={1} inline />
      <Button secondary onClick={insertExampleCode}>
        View Example
      </Button>
      <Spacer x={1} inline />
      <Button secondary onClick={resetCode}>
        Reset
      </Button>
      <Spacer y={1} />
    </>
  );
}
