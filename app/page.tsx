"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Wand2, Code, Eye, Download, Copy, Sparkles } from "lucide-react"
import dynamic from "next/dynamic"
const CodeEditor = dynamic(() => import("@/components/code-editor"), { ssr: false })
import ComponentPreview from "@/components/component-preview"
import StyleControls from "@/components/style-controls"
import ExportOptions from "@/components/export-options"
import { useToast } from "@/hooks/use-toast"
import FreeTierNoticeDialogProps from "@/components/FreeTierNoticeDialogProps"

export default function Home() {
  const [prompt, setPrompt] = useState("")
  const [generatedCode, setGeneratedCode] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState("editor")
  const [styleOptions, setStyleOptions] = useState({
    framework: "tailwind",
    colorScheme: "blue",
    size: "medium",
    rounded: "md",
  })
  const { toast } = useToast()

  const generateComponent = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a description",
        description: "Describe the component you want to generate",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate-component", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          styleOptions,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate component")
      }

      const data = await response.json()
      setGeneratedCode(data.code)
      setActiveTab("preview")

      toast({
        title: "Component generated!",
        description: "Your React component is ready for customization",
      })
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Please try again with a different description",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const examplePrompts = [
    "A responsive navbar with logo and navigation links",
    "A pricing card with features list and CTA button",
    "A contact form with validation and submit button",
    "A hero section with background image and call-to-action",
    "A product card with image, title, price, and add to cart button",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI Component Generator
                </h1>
                <p className="text-sm text-muted-foreground">Generate React components with natural language</p>
              </div>
            </div>
            <Badge variant="secondary" className="hidden sm:flex">
              <Code className="h-3 w-3 mr-1" />
              Next.js + AI
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Wand2 className="h-5 w-5" />
                  <span>Describe Your Component</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Describe the React component you want to generate..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px] resize-none"
                />

                <Button
                  onClick={generateComponent}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Component
                    </>
                  )}
                </Button>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Example prompts:</p>
                  <div className="space-y-1">
                    {examplePrompts.map((example, index) => (
                      <button
                        key={index}
                        onClick={() => setPrompt(example)}
                        className="text-xs text-left w-full p-2 rounded-md bg-muted hover:bg-muted/80 transition-colors"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <StyleControls options={styleOptions} onChange={setStyleOptions} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="h-[calc(100vh-200px)]">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="editor" className="flex items-center space-x-1">
                        <Code className="h-4 w-4" />
                        <span className="hidden sm:inline">Editor</span>
                      </TabsTrigger>
                      <TabsTrigger value="preview" className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span className="hidden sm:inline">Preview</span>
                      </TabsTrigger>
                      <TabsTrigger value="export" className="flex items-center space-x-1">
                        <Download className="h-4 w-4" />
                        <span className="hidden sm:inline">Export</span>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>

                  {generatedCode && (
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(generatedCode)
                          toast({
                            title: "Code copied!",
                            description: "Component code copied to clipboard",
                          })
                        }}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>

              <Separator />

              <CardContent className="p-0 h-full">
                <Tabs value={activeTab} className="h-full">
                  <TabsContent value="editor" className="h-full m-0">
                    <CodeEditor
                      code={generatedCode}
                      onChange={setGeneratedCode}
                      placeholder={!generatedCode ? "Generated component code will appear here..." : undefined}
                    />
                  </TabsContent>

                  <TabsContent value="preview" className="h-full m-0">
                    <ComponentPreview
                      code={generatedCode}
                      placeholder={
                        !generatedCode ? "Component preview will appear here after generation..." : undefined
                      }
                    />
                  </TabsContent>

                  <TabsContent value="export" className="h-full m-0">
                    <ExportOptions code={generatedCode} styleOptions={styleOptions} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <FreeTierNoticeDialogProps />
      {/* Footer */}
      <footer className="w-full border-t bg-white/80 dark:bg-slate-900/80 py-4 mt-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground text-center md:text-left">
            <span>
              © {new Date().getFullYear()} AI Component Generator. Built by Sarath O S. 
              <a href="https://github.com/sarathos584/ai-code-editor.git" target="_blank" rel="noopener noreferrer" className="underline ml-1">View on GitHub</a>
            </span>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <a href="https://github.com/sarathos584" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors" title="Follow on GitHub">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.984-.399 3.003-.404 1.019.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 21.796 24 17.299 24 12c0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/sarathos584/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition-colors" title="Follow on LinkedIn">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
            </a>
            <a href="https://www.instagram.com/sarath_rambler/?igsh=Zmc0aXZxODU2aXM3#" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors" title="Follow on Instagram">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.851s-.011 3.584-.069 4.85c-.062 1.367-.334 2.634-1.308 3.608-.975.974-2.242 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.011-4.85-.069c-1.367-.062-2.634-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.367.334-2.634 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.425 3.678 1.406c-.98.98-1.274 2.092-1.334 3.374C2.013 5.668 2 6.077 2 12c0 5.923.013 6.332.072 7.613.06 1.282.354 2.394 1.334 3.374.981.981 2.093 1.274 3.374 1.334C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.06 2.393-.353 3.374-1.334.98-.98 1.274-2.092 1.334-3.374.059-1.281.072-1.69.072-7.613 0-5.923-.013-6.332-.072-7.613-.06-1.282-.354-2.394-1.334-3.374-.981-.981-2.093-1.274-3.374-1.334C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
