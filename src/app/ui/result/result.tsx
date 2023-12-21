"use client";

import HeadshotImage from "./headshot-image";
import Link from "next/link";

export default function Result({ imageUrl }: { imageUrl: string | undefined }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Here's your headshot!</h1>
      <div className="mt-5">
        {imageUrl ? <HeadshotImage imageUrl={imageUrl} /> : <></>}
      </div>
      <Link href="/">
        <button
          type="button"
          className="px-4.5 w-full rounded-md bg-gradient-to-r from-blue-300 to-blue-400 py-3.5 text-sm font-semibold text-white shadow-sm hover:from-blue-400 hover:to-blue-500 "
        >
          Try another photo
        </button>
      </Link>
    </div>
  );
}