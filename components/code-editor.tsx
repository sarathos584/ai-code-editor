"use client"

import { useEffect, useRef } from "react"
import * as monaco from "monaco-editor"

interface CodeEditorProps {
  code: string
  onChange: (code: string) => void
  placeholder?: string
}

export default function CodeEditor({ code, onChange, placeholder }: CodeEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const monacoRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)

  useEffect(() => {
    if (editorRef.current && !monacoRef.current) {
      // Configure Monaco Editor
      monaco.editor.defineTheme("custom-dark", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#0f172a",
          "editor.foreground": "#e2e8f0",
        },
      })

      monacoRef.current = monaco.editor.create(editorRef.current, {
        value: code || "",
        language: "javascript",
        theme: "custom-dark",
        automaticLayout: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        fontSize: 14,
        lineNumbers: "on",
        roundedSelection: false,
        scrollbar: {
          vertical: "auto",
          horizontal: "auto",
        },
        wordWrap: "on",
        folding: true,
        lineDecorationsWidth: 10,
        lineNumbersMinChars: 3,
      })

      monacoRef.current.onDidChangeModelContent(() => {
        const value = monacoRef.current?.getValue() || ""
        onChange(value)
      })
    }

    return () => {
      if (monacoRef.current) {
        monacoRef.current.dispose()
        monacoRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (monacoRef.current && code !== monacoRef.current.getValue()) {
      monacoRef.current.setValue(code || "")
    }
  }, [code])

  if (!code && placeholder) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-900 text-slate-400">
        <div className="text-center">
          <div className="text-4xl mb-4">📝</div>
          <p>{placeholder}</p>
        </div>
      </div>
    )
  }

  return <div ref={editorRef} className="h-full w-full" />
}
