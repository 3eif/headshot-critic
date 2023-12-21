"use client";

import { useSearchParams } from "next/navigation";
import Result from "@/app/ui/result/result";

export default function Page() {
  const searchParams = useSearchParams();

  return <Result imageUrl={searchParams.get("i")?.toString()} />;
}
