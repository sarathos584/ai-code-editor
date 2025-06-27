"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

interface ComponentPreviewProps {
  code: string
  placeholder?: string
}

export default function ComponentPreview({ code, placeholder }: ComponentPreviewProps) {
  const [previewHtml, setPreviewHtml] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!code) {
      setPreviewHtml("")
      setError(null)
      return
    }

    try {
      // Transform JSX to HTML for preview
      // This is a simplified transformation - in production you'd want a more robust solution
      let html = code
        .replace(/className=/g, "class=")
        .replace(/onClick=\{[^}]+\}/g, 'onclick="void(0)"')
        .replace(/\{[^}]+\}/g, "")
        .replace(/<(\w+)([^>]*?)\/>/g, "<$1$2></$1>")

      // Wrap in a container with Tailwind
      html = `
        <div class="p-6 bg-white min-h-full">
          ${html}
        </div>
      `

      setPreviewHtml(html)
      setError(null)
    } catch (err) {
      setError("Failed to render preview")
      setPreviewHtml("")
    }
  }, [code])

  if (!code && placeholder) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-50 text-slate-400">
        <div className="text-center">
          <div className="text-4xl mb-4">👁️</div>
          <p>{placeholder}</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="h-full bg-slate-50">
      <div className="p-4 border-b bg-white">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-sm text-muted-foreground">Component Preview</span>
        </div>
      </div>

      <div className="h-full overflow-auto">
        <iframe
          srcDoc={`
            <!DOCTYPE html>
            <html>
              <head>
                <script src="https://cdn.tailwindcss.com"></script>
                <style>
                  body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
                </style>
              </head>
              <body>
                ${previewHtml}
              </body>
            </html>
          `}
          className="w-full h-full border-0"
          title="Component Preview"
        />
      </div>
    </div>
  )
}
