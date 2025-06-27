"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Download, Copy, FileText, Code2, Share, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ExportOptionsProps {
  code: string
  styleOptions: any
}

export default function ExportOptions({ code, styleOptions }: ExportOptionsProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const copyToClipboard = async () => {
    if (!code) return

    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast({
        title: "Code copied!",
        description: "Component code copied to clipboard",
      })
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Failed to copy code to clipboard",
        variant: "destructive",
      })
    }
  }

  const downloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "File downloaded!",
      description: `${filename} has been downloaded`,
    })
  }

  const generatePackageJson = () => {
    return JSON.stringify(
      {
        name: "generated-component",
        version: "1.0.0",
        description: "AI-generated React component",
        main: "Component.jsx",
        dependencies: {
          react: "^18.0.0",
          "react-dom": "^18.0.0",
          ...(styleOptions.framework === "tailwind" && { tailwindcss: "^3.0.0" }),
          ...(styleOptions.framework === "styled-components" && { "styled-components": "^5.0.0" }),
        },
        keywords: ["react", "component", "ai-generated"],
        author: "AI Component Generator",
        license: "MIT",
      },
      null,
      2,
    )
  }

  const generateReadme = () => {
    return `# Generated React Component

This component was generated using AI Component Generator.

## Installation

\`\`\`bash
npm install
\`\`\`

## Usage

\`\`\`jsx
import Component from './Component'

function App() {
  return <Component />
}
\`\`\`

## Styling

This component uses ${styleOptions.framework === "tailwind" ? "Tailwind CSS" : styleOptions.framework} for styling.

## Customization

Feel free to modify the component to fit your needs!
`
  }

  if (!code) {
    return (
      <div className="h-full flex items-center justify-center text-slate-400">
        <div className="text-center">
          <div className="text-4xl mb-4">📦</div>
          <p>Export options will appear here after generating a component</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 h-full overflow-auto">
      <div>
        <h3 className="text-lg font-semibold mb-2">Export Your Component</h3>
        <p className="text-sm text-muted-foreground">Choose how you want to export your generated component</p>
      </div>

      <Separator />

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button onClick={copyToClipboard} className="w-full justify-start bg-transparent" variant="outline">
            {copied ? <CheckCircle className="h-4 w-4 mr-2 text-green-500" /> : <Copy className="h-4 w-4 mr-2" />}
            {copied ? "Copied!" : "Copy Component Code"}
          </Button>

          <Button
            onClick={() => downloadFile("Component.jsx", code)}
            className="w-full justify-start"
            variant="outline"
          >
            <Download className="h-4 w-4 mr-2" />
            Download as .jsx
          </Button>

          <Button
            onClick={() =>
              downloadFile(
                "Component.tsx",
                code.replace("export default function", "export default function Component"),
              )
            }
            className="w-full justify-start"
            variant="outline"
          >
            <Code2 className="h-4 w-4 mr-2" />
            Download as .tsx
          </Button>
        </CardContent>
      </Card>

      {/* Project Files */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Complete Project</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm text-muted-foreground mb-3">
            Download additional project files for a complete setup
          </div>

          <Button
            onClick={() => downloadFile("package.json", generatePackageJson())}
            className="w-full justify-start"
            variant="outline"
          >
            <FileText className="h-4 w-4 mr-2" />
            Download package.json
          </Button>

          <Button
            onClick={() => downloadFile("README.md", generateReadme())}
            className="w-full justify-start"
            variant="outline"
          >
            <FileText className="h-4 w-4 mr-2" />
            Download README.md
          </Button>
        </CardContent>
      </Card>

      {/* Component Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Component Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">
              {styleOptions.framework === "tailwind" ? "Tailwind CSS" : styleOptions.framework}
            </Badge>
            <Badge variant="secondary">{styleOptions.colorScheme} theme</Badge>
            <Badge variant="secondary">{styleOptions.size} size</Badge>
            <Badge variant="secondary">{styleOptions.rounded} rounded</Badge>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>Lines of code: {code.split("\n").length}</p>
            <p>Characters: {code.length}</p>
          </div>
        </CardContent>
      </Card>

      {/* Share Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center">
            <Share className="h-4 w-4 mr-2" />
            Share Component
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            Sharing functionality coming soon! You'll be able to share your components with a unique URL.
          </p>
          <Button disabled className="w-full bg-transparent" variant="outline">
            Generate Share Link
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
