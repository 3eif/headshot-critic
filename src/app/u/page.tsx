"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Result from "@/app/ui/result/result";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Page() {
  // const router = useRouter();
  // const searchParams = useSearchParams();

  // const imageUrlParam = searchParams.get("i");
  // useEffect(() => {
  //   if (!imageUrlParam ) {
  //     const { data: session } = useSession();
  //     if(session?.user?.image) void router.replace(`/u?i=${session?.user?.image}`);
  //   }
  // });

  return (
    <Result imageUrl="https://utfs.io/f/676c9204-b43d-4b1d-9a06-2630618c1566-4j3nsw.jpg" />
  );
}
