"use client";

import Image from "next/image";

export default function HeadshotImage({ imageUrl }: { imageUrl: string }) {
  return (
    <Image
      src="https://media.licdn.com/dms/image/D5603AQG37173Xc_mIg/profile-displayphoto-shrink_800_800/0/1691381507360?e=1708560000&v=beta&t=tlLO3nqPQYtu8pTEoybwUxXc33NJz8_zfml8rUtVxl8"
      width={600}
      height={600}
      className="rounded-md"
      alt="headshot"
    />
  );
}
