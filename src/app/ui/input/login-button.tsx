"use client";

import { signIn, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  return (
    <button
      type="button"
      className="px-4.5 w-full rounded-md bg-gradient-to-r from-blue-300 to-blue-400 py-3.5 text-sm font-semibold text-white shadow-sm hover:from-blue-400 hover:to-blue-500 "
      onClick={() => {
        if (session) {
          console.log(session?.user?.image);
        } else {
          void signIn("linkedin");
        }
      }}
    >
      Use my LinkedIn profile
    </button>
  );
}
