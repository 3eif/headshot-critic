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

import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import InputWithLabel from "./ui/input/input-with-label";
import UploadPhoto from "./ui/input/upload-photo";
import SubmitForm from "./ui/input/submit-form";

export default async function Page() {
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white">
      <div className="relative isolate px-6 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#CFEDFB] to-[#00A0DC] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Headshot Critic
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Upload your headshot via your LinkedIn profile or by uploading an
              image and we&apos;ll give you feedback on it.
            </p>
            <SubmitForm />
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[2310/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#CFEDFB] to-[#00A0DC] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
