"use client";

import { signIn, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginButton() {
  const { data: session } = useSession();
  const [clickedLogin, setClickedLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (clickedLogin) {
      router.push(`/u?i=${session?.user?.image}`);
      setClickedLogin(false);
    }
  }, [session]);

  return (
    <button
      type="button"
      className="px-4.5 w-full rounded-md bg-gradient-to-r from-blue-300 to-blue-400 py-3.5 text-sm font-semibold text-white shadow-sm hover:from-blue-400 hover:to-blue-500 "
      onClick={async () => {
        if (session) {
          void router.push(`/u?i=${session?.user?.image}`);
        } else {
          void signIn("linkedin", { redirect: false });
          setClickedLogin(true);
        }
      }}
    >
      Use my LinkedIn profile
    </button>
  );
}
