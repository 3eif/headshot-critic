"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";

export default function UploadPhoto() {
  const router = useRouter();

  return (
    <>
      <UploadDropzone
        className="ut-label:text-md mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 ut-button:bg-blue-400 ut-label:font-semibold ut-label:text-blue-400 ut-readying:bg-blue-500"
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          if (res[0]?.url === undefined) {
            alert("Upload Failed");
            return;
          }
          void router.push(`/u?i=${res[0]?.url}`);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
        config={{
          mode: "auto",
          appendOnPaste: true,
        }}
      />
      {/* <div className="col-span-full">
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <PhotoIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-400"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
      </div> */}
    </>
  );
}
