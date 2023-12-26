import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? "",
});

export async function POST(req: Request) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { prompt } = await req.json();

  const imagePrompt = `
Analyze my headshot and provide a structured evaluation in the form of a JSON array. Rate each of the following categories on a scale from 0 to 100, where 100 represents excellence. Include detailed, professional, and constructive feedback for each category.

Categories to be evaluated:
1. Composition
2. Lighting
3. Clothing
4. Expression
5. Background

Return the output as a JSON array (don't return any Markdown), with each category's score, feedback in an array. For example:

Query: [image]

Result:
[
  {
    "category": "composition",
    "score": [score],
    "feedback": "[feedback]"
  },
  {
    "category": "lighting",
    "score": [score],
    "feedback": "[feedback]"
  },
  ...
]

Include specific suggestions for improvement in each category, if applicable`;

  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    stream: true,
    temperature: 0.3,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: imagePrompt },
          {
            type: "image_url",
            image_url: {
              url: prompt as string,
              detail: "low",
            },
          },
        ],
      },
    ],
    max_tokens: 600,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
