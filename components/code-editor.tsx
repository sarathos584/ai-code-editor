"use client"

import Editor from "@monaco-editor/react"

interface CodeEditorProps {
  code: string
  onChange: (code: string) => void
  placeholder?: string
}

export default function CodeEditor({ code, onChange, placeholder }: CodeEditorProps) {
  return (
    <div className="relative h-full w-full min-h-0">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        value={code}
        onChange={(value) => onChange(value || "")}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: "on",
        }}
      />
      {!code && placeholder && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900 text-slate-400 pointer-events-none">
          <div className="text-center">
            <div className="text-4xl mb-4">📝</div>
            <p>{placeholder}</p>
          </div>
        </div>
      )}
    </div>
  )
}
