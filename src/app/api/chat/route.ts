import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { kv } from "@vercel/kv";
import { Ratelimit } from "@upstash/ratelimit";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? "",
});

export async function POST(req: Request) {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    const ip = req.headers.get("x-forwarded-for");
    const ratelimit = new Ratelimit({
      redis: kv,
      // rate limit to 5 requests per 10 seconds
      limiter: Ratelimit.slidingWindow(5, "1d"),
    });

    const { success, limit, reset, remaining } = await ratelimit.limit(
      `ratelimit_${ip}`,
    );

    if (!success) {
      return new Response("You have reached your request limit for the day.", {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      });
    }
  } else {
    console.log(
      "KV_REST_API_URL and KV_REST_API_TOKEN env vars not found, not rate limiting...",
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { prompt } = await req.json();

  const imagePrompt = `
Analyze my headshot and provide a structured evaluation in the form of a JSON array. Rate each of the following categories on a scale from 0 to 100, where 100 represents excellence, 90-100 indicates amazing, 80-90 signifies good, 70-80 denotes okay, 60-70 implies that it needs some work, and 50< implies that it needs a lot of work. Include detailed, professional, and constructive feedback for each category.

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
    - Relevance and distraction level, an interesting background is fine
    - Complementing or contrasting with the subject
    - Overall aesthetic contribution to the image

Return the output as a JSON array (don't return any Markdown), with each category's score, and feedback in an array. Ensure the feedback is directed to the user by using "you" instead of "subject" and ensure that the feedback is no more than 2 sentences. For example:

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
    temperature: 0.2,
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
