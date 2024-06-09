import React from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ language, value, onChange }) => {
  return (
    <div className="flex-grow border bg-gray-100">
      <Editor
        height="100%"
        language={language}
        value={value}
        onChange={(value) => onChange(value)}
        options={{
          selectOnLineNumbers: true,
          automaticLayout: true,
          scrollBeyondLastLine: false,
          minimap: { enabled: false },
          scrollbar: {
            horizontal: "auto",
            vertical: "hidden",
          },
        }}
      />
    </div>
  );
};

export default CodeEditor;
