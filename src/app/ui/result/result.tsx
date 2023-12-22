"use client";

import { signOut } from "next-auth/react";
import HeadshotImage from "./headshot-image";
import AiFeedback from "./ai-feedback";

export default function Result({ imageUrl }: { imageUrl: string | undefined }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Here's your headshot!</h1>
      <div className="mt-5">
        {imageUrl ? <HeadshotImage imageUrl={imageUrl} /> : <></>}
      </div>
      <button
        type="button"
        className="px-4.5 w-full rounded-md bg-gradient-to-r from-blue-300 to-blue-400 py-3.5 text-sm font-semibold text-white shadow-sm hover:from-blue-400 hover:to-blue-500 "
        onClick={() => {
          void signOut({ callbackUrl: "/" });
        }}
      >
        Try another photo
      </button>
      <AiFeedback imageUrl={imageUrl} />
    </div>
  );
}
