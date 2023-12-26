"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Result from "@/app/ui/result/result";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  const imageUrlParam = searchParams.get("i");
  useEffect(() => {
    if (!imageUrlParam && session?.user?.image) {
      void router.replace(`/u?i=${session?.user?.image}`);
    }
  });

  return (
    <div className="">
      <Result
        imageUrl={imageUrlParam?.toString() ?? session?.user?.image ?? ""}
      />
    </div>
  );
}
