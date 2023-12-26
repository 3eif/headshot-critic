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

Categories to be evaluated, with specific criteria:

1. Composition
    - Framing and positioning in the frame
    - Use of space and cropping
    - Angle and perspective

2. Lighting
    - Quality of light (soft, harsh, even)
    - Direction of light (front, side, back)
    - Shadows and highlights

3. Clothing
    - Appropriateness for the intended purpose
    - Fit and style
    - Color coordination with the overall image

4. Expression
    - Authenticity and naturalness
    - Eye contact and engagement
    - Emotion conveyed

5. Background
    - Relevance and distraction level
    - Complementing or contrasting with the subject
    - Overall aesthetic contribution to the image

Return the output as a JSON array (don't return any Markdown), with each category's score, and feedback in an array. Ensure the feedback is no more than 2 sentences. For example:

Query: [image]

Result:
[
  {
    "category": "composition",
    "score": [score],
    "feedback": "[feedback based on specific criteria]"
  },
  {
    "category": "lighting",
    "score": [score],
    "feedback": "[feedback based on specific criteria]"
  },
  ...
]

Include specific suggestions for improvement in each category, based on the criteria, if applicable.
`;

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
