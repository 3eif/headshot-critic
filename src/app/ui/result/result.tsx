"use client";

import { signOut } from "next-auth/react";
import HeadshotImage from "./headshot-image";
import AiFeedback from "./ai-feedback";

export default function Result({ imageUrl }: { imageUrl: string | undefined }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <section aria-labelledby="details-heading">
        <div className="mt-16 grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-8">
          <div>
            {imageUrl && <HeadshotImage imageUrl={imageUrl} />}
            <button
              type="button"
              className="mt-4 w-full rounded-md bg-gradient-to-r from-blue-300 to-blue-400 py-3.5 text-sm font-semibold text-white shadow-sm hover:from-blue-400 hover:to-blue-500"
              onClick={() => {
                void signOut({ callbackUrl: "/" });
              }}
            >
              Try another photo
            </button>
          </div>
          <AiFeedback imageUrl={imageUrl!} />
        </div>
      </section>
    </div>
  );
}
