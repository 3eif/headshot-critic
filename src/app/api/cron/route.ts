export const runtime = "edge";

import { utapi } from "@/server/uploadthing";

export async function GET() {
  const files = await utapi.listFiles({});

  await utapi.deleteFiles(files.map((f) => f.key));

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  return Response.json({ files });
}
