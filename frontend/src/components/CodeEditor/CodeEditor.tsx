import { Editor } from "@monaco-editor/react";
import { Settings } from "lucide-react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  className?: string;
}

const CodeEditor = ({
  value,
  onChange,
  language,
  className = "",
}: CodeEditorProps) => {
  return (
    <div
      className={`bg-slate-950 border border-slate-700 rounded-lg overflow-hidden ${className}`}
    >
      <div className="bg-slate-900 px-4 py-2 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-sm text-slate-400 ml-2">{language}</span>
        </div>
        <Settings className="w-4 h-4 text-slate-400" />
      </div>
      <Editor
        height={"500px"}
        className="w-full bg-slate-950 text-slate-200 font-mono text-sm resize-none outline-none min-h-[400px]"
        language={language}
        value={value}
        onChange={(value) => onChange(value ?? "")}
        theme="vs-dark"
      />
    </div>
  );
};

export default CodeEditor;
