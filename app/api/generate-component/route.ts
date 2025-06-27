export async function POST(req: Request) {
  try {
    const { prompt, styleOptions } = await req.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Prompt is required" }), {
        status: 400,
      });
    }

    const systemPrompt = `You are an expert React developer. Generate clean, modern React components based on user descriptions.
    
Guidelines:
- Use functional components with hooks
- Use ${styleOptions.framework === "tailwind" ? "Tailwind CSS classes" : styleOptions.framework} for styling
- Apply ${styleOptions.colorScheme} color scheme
- Use ${styleOptions.size} sizing
- Apply ${styleOptions.rounded} border radius
- Include accessibility attributes
- Use semantic HTML, interactivity, responsiveness, and comments
Return only the component code.`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Create a React component: ${prompt}` },
      ],
      max_tokens: 2000,
    }),
    });

    const data = await response.json();

    if (!data.choices || !data.choices.length || !data.choices[0].message?.content) {
      console.error("Unexpected API response:", data);
      return new Response(JSON.stringify({ error: "Unexpected response from model" }), {
        status: 502,
      });
    }

    return new Response(JSON.stringify({ code: data.choices[0].message.content }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error generating component:", error);
    return new Response(JSON.stringify({ error: "Failed to generate component" }), {
      status: 500,
    });
  }
}
