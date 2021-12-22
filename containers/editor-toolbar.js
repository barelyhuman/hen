import { useEffect } from "react";
import debounce from "lodash.debounce";
import { fetcher } from "lib/fetcher";
import { Button } from "components/button";
import { Spacer } from "components/spacer";
import exampleCode from "templates/default-code";
import emptyCode from "templates/empty-code";
import { useRouter } from "next/router";

export function EditorToolbar({ code, onChange, ...props }) {
  const router = useRouter();

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

  async function shareCode() {
    const encodedCode = Buffer.from(String(code)).toString("base64");
    router.push("/", {
      query: {
        code: encodedCode,
      },
    });
  }

  const debouncedFormat = debounce(format, 500);

  return (
    <>
      <Spacer y={1} />
      <Button className="m-1" secondary onClick={debouncedFormat}>
        Format Code
      </Button>

      <Button className="m-1" secondary onClick={insertExampleCode}>
        View Example
      </Button>

      <Button className="m-1" secondary onClick={resetCode}>
        Reset
      </Button>

      <Button className="m-1" secondary onClick={shareCode}>
        Share
      </Button>
      <Spacer y={1} />
    </>
  );
}
