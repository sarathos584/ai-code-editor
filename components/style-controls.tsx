"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Palette, Settings } from "lucide-react"

interface StyleOptions {
  framework: string
  colorScheme: string
  size: string
  rounded: string
}

interface StyleControlsProps {
  options: StyleOptions
  onChange: (options: StyleOptions) => void
}

export default function StyleControls({ options, onChange }: StyleControlsProps) {
  const updateOption = (key: keyof StyleOptions, value: string) => {
    onChange({ ...options, [key]: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <span>Style Options</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>CSS Framework</Label>
          <Select value={options.framework} onValueChange={(value) => updateOption("framework", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tailwind">Tailwind CSS</SelectItem>
              <SelectItem value="css-modules">CSS Modules</SelectItem>
              <SelectItem value="styled-components">Styled Components</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Color Scheme</Label>
          <Select value={options.colorScheme} onValueChange={(value) => updateOption("colorScheme", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="blue">Blue</SelectItem>
              <SelectItem value="purple">Purple</SelectItem>
              <SelectItem value="green">Green</SelectItem>
              <SelectItem value="red">Red</SelectItem>
              <SelectItem value="gray">Gray</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Component Size</Label>
          <Select value={options.size} onValueChange={(value) => updateOption("size", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="large">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Border Radius</Label>
          <Select value={options.rounded} onValueChange={(value) => updateOption("rounded", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="sm">Small</SelectItem>
              <SelectItem value="md">Medium</SelectItem>
              <SelectItem value="lg">Large</SelectItem>
              <SelectItem value="full">Full</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center space-x-2 mb-2">
            <Palette className="h-4 w-4" />
            <Label className="text-sm">Quick Themes</Label>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onChange({ ...options, colorScheme: "blue", rounded: "md" })}
              className="p-2 rounded-md bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-medium transition-colors"
            >
              Modern Blue
            </button>
            <button
              onClick={() => onChange({ ...options, colorScheme: "purple", rounded: "lg" })}
              className="p-2 rounded-md bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-medium transition-colors"
            >
              Purple Gradient
            </button>
            <button
              onClick={() => onChange({ ...options, colorScheme: "green", rounded: "sm" })}
              className="p-2 rounded-md bg-green-100 hover:bg-green-200 text-green-800 text-xs font-medium transition-colors"
            >
              Nature Green
            </button>
            <button
              onClick={() => onChange({ ...options, colorScheme: "gray", rounded: "none" })}
              className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-medium transition-colors"
            >
              Minimal Gray
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
