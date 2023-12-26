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
  Analyze a headshot and provide a structured evaluation in the form of a JSON object. Rate each of the following categories on a scale from 0 to 100, where 100 represents excellence. Include detailed, professional, and constructive feedback for each category. Calculate a weighted average based on the scores to give a total score out of 100. Conclude with a summary of the overall impression in a professional context and suggest any improvements to enhance the professional impact of the photo.
  
  Categories to be evaluated, each contributing equally (16.67%) to the total score:
  1. Composition
  2. Lighting
  3. Clothing
  4. Expression
  5. Background
  6. Image Quality
  
  Only return the output as a JSON object, with each category's score, feedback, and the total score. For example:
  
  \`\`\`json
  {
    "total": [total_score],
    "composition": {
      "score": [score],
      "feedback": "[feedback]"
    },
    "lighting": {
      "score": [score],
      "feedback": "[feedback]"
    },
    ...
    "summary": "[Overall impression and recommendations]"
  }
  \`\`\`
  
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
    max_tokens: 500,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
