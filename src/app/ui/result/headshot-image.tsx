"use server";

import Image from "next/image";

export default async function HeadshotImage({
  imageUrl,
}: {
  imageUrl: string;
}) {
  return <img src={imageUrl} width={500} height={500} alt="headshot" />;
}
