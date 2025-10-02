import { cn } from "@/lib/utils";
import { useRequest } from "@/request.provider";
import { json } from "@codemirror/lang-json";
import { tags as t } from "@lezer/highlight";
import { createTheme } from "@uiw/codemirror-themes";
import CodeMirror from "@uiw/react-codemirror";
import { useState } from "react";

const myTheme = createTheme({
  theme: "light",
  settings: {
    background: "transparent",
    backgroundImage: "",
    foreground: "var(--muted-foreground)",
    caret: "#5d00ff",
    selection: "#036dd626",
    selectionMatch: "#036dd626",
    lineHighlight: "#8a91991a",
    gutterBackground: "transparent",
    gutterForeground: "var(--muted-foreground)",
    fontSize: "var(--text-sm)",
    fontFamily: "var(--font-mono)",
  },
  styles: [
    { tag: t.propertyName, color: "var(--primary)" },
    { tag: t.comment, color: "#787b8099" },
    { tag: t.variableName, color: "#0080ff" },
    { tag: [t.string, t.special(t.brace)], color: "var(--color-emerald-500)" },
    { tag: t.number, color: "var(--color-amber-500)" },
    { tag: t.bool, color: "var(--color-blue-500)" },
    { tag: t.null, color: "#5c6166" },
    { tag: t.keyword, color: "#5c6166" },
    { tag: t.operator, color: "#5c6166" },
    { tag: t.className, color: "#5c6166" },
    { tag: t.definition(t.typeName), color: "#5c6166" },
    { tag: t.typeName, color: "#5c6166" },
  ],
});

type RequestBodyTabProps = {
  className?: string;
};

export function RequestBodyTab({ className }: RequestBodyTabProps) {
  const initialCode = JSON.stringify({}, null, 2);
  const { request, setRequest } = useRequest();

  const [code, setCode] = useState(initialCode);
  const [jsonError, setJsonError] = useState<string | null>(null);

  const validateJson = (value: string) => {
    if (!value.trim()) {
      setJsonError(null);
      return;
    }

    try {
      JSON.parse(value);
      setJsonError(null);
    } catch (error) {
      if (error instanceof Error) {
        setJsonError(error.message);
      } else {
        setJsonError("Invalid JSON syntax");
      }
    }
  };

  const handleChange = (value: string) => {
    setCode(value);
    if (request) {
      setRequest({
        ...request,
        body: value,
      });
    }

    validateJson(value);
  };

  return (
    <div className={cn(className)}>
      {jsonError && (
        <div className="mb-2 p-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded">
          <strong>JSON Error:</strong> {jsonError}
        </div>
      )}
      <CodeMirror
        className="mt-4"
        value={code}
        extensions={[json()]}
        theme={myTheme}
        onChange={handleChange}
      />
    </div>
  );
}
