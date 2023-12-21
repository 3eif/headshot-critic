"use client";

import { useSearchParams } from "next/navigation";
import Result from "@/app/ui/result/result";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  return (
    <Result
      imageUrl={searchParams.get("i")?.toString() ?? session?.user?.image ?? ""}
    />
  );
}
