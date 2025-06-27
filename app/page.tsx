"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Wand2, Code, Eye, Download, Copy, Sparkles } from "lucide-react"
import CodeEditor from "@/components/code-editor"
import ComponentPreview from "@/components/component-preview"
import StyleControls from "@/components/style-controls"
import ExportOptions from "@/components/export-options"
import { useToast } from "@/hooks/use-toast"

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
    </div>
  )
}
