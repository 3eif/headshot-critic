"use server";

import HeadshotImage from "./headshot-image";

export default async function Result({
  imageUrl,
}: {
  imageUrl: string | undefined;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Here's your headshot!</h1>
      <div className="mt-5">
        <HeadshotImage imageUrl={imageUrl!} />
      </div>
    </div>
  );
}
