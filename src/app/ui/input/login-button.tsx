"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function LoginButton() {
  const { data: session } = useSession();
  // const pathname = usePathname()
  const router = useRouter();

  return (
    <button
      type="button"
      className="px-4.5 w-full rounded-md bg-gradient-to-r from-blue-300 to-blue-400 py-3.5 text-sm font-semibold text-white shadow-sm hover:from-blue-400 hover:to-blue-500 "
      onClick={async () => {
        if (!session) {
          void signIn("linkedin", { callbackUrl: `/u` });
        } else {
          void signOut();
          router.push(`/u?i=${session?.user?.image}`);
        }
      }}
    >
      Use my LinkedIn profile
    </button>
  );
}
