"use client";

import OpenAI from "openai";
import { useChat } from "ai/react";
import { Suspense, useEffect } from "react";

// export const runtime = "edge";

// eslint-disable-next-line @next/next/no-async-client-component
export default function AiFeedback({
  imageUrl,
}: {
  imageUrl: string | undefined;
}) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat-with-vision",
  });

  useEffect(() => {
    let e: FormEvent<HTMLFormElement> = {
      preventDefault: () => {},
      target: {
        elements: {
          imageUrl: {
            value: imageUrl,
          },
        },
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    handleSubmit(e, {
      data: {
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Field_sparrow_in_CP_%2841484%29_%28cropped%29.jpg/733px-Field_sparrow_in_CP_%2841484%29_%28cropped%29.jpg",
      },
    });
  });

  return <div>{messages}</div>;
}

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
