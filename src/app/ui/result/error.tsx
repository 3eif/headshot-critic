import { XCircleIcon } from "@heroicons/react/20/solid";

export default function Error({ error }: { error: string }) {
  return (
    <div className="mb-5 items-start rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-left text-sm font-medium text-red-800">
            An error occurred while generating your feedback:
          </h3>
          <div className="mt-2 text-left text-sm text-red-700">
            <p>{error}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
