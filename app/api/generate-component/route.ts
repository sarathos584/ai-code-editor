import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { prompt, styleOptions } = await req.json()

    if (!prompt) {
      return Response.json({ error: "Prompt is required" }, { status: 400 })
    }

    const systemPrompt = `You are an expert React developer. Generate clean, modern React components based on user descriptions.

Guidelines:
- Use functional components with hooks
- Use ${styleOptions.framework === "tailwind" ? "Tailwind CSS classes" : styleOptions.framework} for styling
- Apply ${styleOptions.colorScheme} color scheme
- Use ${styleOptions.size} sizing (small: compact padding/text, medium: normal, large: generous spacing)
- Apply ${styleOptions.rounded} border radius (none: rounded-none, sm: rounded-sm, md: rounded-md, lg: rounded-lg, full: rounded-full)
- Include proper accessibility attributes
- Make components responsive
- Use semantic HTML elements
- Include interactive states (hover, focus, active)
- Add proper TypeScript types if applicable
- Keep code clean and well-structured
- Include comments for complex logic
- Use modern React patterns

Return only the component code without explanations or markdown formatting.`

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      prompt: `Create a React component: ${prompt}`,
      maxTokens: 2000,
    })

    return Response.json({ code: text })
  } catch (error) {
    console.error("Error generating component:", error)
    return Response.json({ error: "Failed to generate component" }, { status: 500 })
  }
}
