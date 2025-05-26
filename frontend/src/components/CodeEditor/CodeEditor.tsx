import { Editor } from "@monaco-editor/react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  height?: string;
}

const CodeEditor = ({
  value,
  onChange,
  language,
  height = "300px",
}: CodeEditorProps) => {
  return (
    <div className="relative border border-slate-600 bg-slate-900 rounded-xl overflow-hidden shadow-lg">
      {/* Language label */}
      <div className="absolute top-2 right-2 z-10">
        <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full font-mono tracking-wide shadow">
          {language.toUpperCase()}
        </span>
      </div>

      <Editor
        height={height}
        language={language}
        value={value}
        onChange={(v) => onChange(v || "")}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "Fira Code, Menlo, monospace",
          scrollBeyondLastLine: false,
          wordWrap: "on",
          automaticLayout: true,
          lineNumbers: "on",
          roundedSelection: true,
          renderLineHighlight: "line",
          tabSize: 2,
          scrollbar: {
            verticalScrollbarSize: 6,
            horizontalScrollbarSize: 6,
          },
        }}
      />
    </div>
  );
};

export default CodeEditor;
