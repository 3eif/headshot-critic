"use client";

import Image from "next/image";

export default function HeadshotImage({ imageUrl }: { imageUrl: string }) {
  return (
    <Image
      src={imageUrl}
      width={600}
      height={600}
      className="rounded-md"
      alt="headshot"
    />
  );
}
