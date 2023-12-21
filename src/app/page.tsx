// import OpenAI from "openai";
// import { OpenAIStream } from "ai";
// import { Suspense } from "react";

// // Optional, but recommended: run on the edge runtime.
// // See https://vercel.com/docs/concepts/functions/edge-functions
// export const runtime = "edge";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY!,
// });

// export default async function Page({
//   searchParams,
// }: {
//   // note that using searchParams opts your page into dynamic rendering. See https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional
//   searchParams: Record<string, string>;
// }) {
//   // Request the OpenAI API for the response based on the prompt
//   const response = await openai.chat.completions.create({
//     model: "gpt-4",
//     stream: true,
//     messages: [
//       {
//         role: "user",
//         content:
//           searchParams["prompt"] ??
//           "Generate a story about a bee and a wasp becoming friends",
//       },
//     ],
//   });

//   // Convert the response into a friendly text-stream
//   const stream = OpenAIStream(response);

//   const reader = stream.getReader();

//   // We recursively render the stream as it comes in
//   return (
//     <div>
//       <div>
//         <label
//           htmlFor="email"
//           className="block text-sm font-medium leading-6 text-gray-900"
//         >
//           Email
//         </label>
//         <div className="mt-2">
//           <input
//             type="email"
//             name="email"
//             id="email"
//             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
//             placeholder="you@example.com"
//           />
//         </div>
//       </div>
//       <Suspense>
//         <Reader reader={reader} />
//       </Suspense>
//     </div>
//   );
// }

// async function Reader({
//   reader,
// }: {
//   reader: ReadableStreamDefaultReader<any>;
// }) {
//   const { done, value } = await reader.read();

//   if (done) {
//     return null;
//   }

//   const text = new TextDecoder().decode(value);

//   return (
//     <span>
//       {text}
//       <Suspense>
//         <Reader reader={reader} />
//       </Suspense>
//     </span>
//   );
// }

import SubmitForm from "./ui/input/submit-form";
import { getServerSession } from "next-auth/next";
import SessionProvider from "@/app/session-provider";

export default async function Page() {
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const session = await getServerSession();

  return (
    <SessionProvider session={session}>
      <SubmitForm />
    </SessionProvider>
  );
}
