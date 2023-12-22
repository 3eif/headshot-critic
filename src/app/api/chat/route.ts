import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { imageUrl } = await req.json();

  const prompt = `
Given a LinkedIn profile picture, provide detailed feedback in a professional and constructive manner. Rate the following categories on a scale from 0 to 100, with 100 representing the best possible outcome. Each category contributes equally to a total score out of 100. Offer suggestions for improvement if applicable.

Categories and their weight towards the total score:
1. Composition (16.67%)
2. Lighting (16.67%)
3. Clothing (16.67%)
4. Expression (16.67%)
5. Background (16.67%)
6. Image Quality (16.67%)

Calculate the weighted average for these categories to provide an overall score out of 100. Then, give a summary of the overall impression the picture makes in a professional context, including any recommendations for adjustments to improve the professional impact of the picture.
`;

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    stream: true,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          {
            type: "image_url",
            image_url: {
              url: imageUrl,
            },
          },
        ],
      },
    ],
  });

  const stream = OpenAIStream(response);

  console.log(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
