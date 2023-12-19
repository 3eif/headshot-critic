import { submitLinkedinUrl } from "@/app/lib/actions";
import { ArrowUturnUpIcon } from "@heroicons/react/24/outline";
import { useFormState } from "react-dom";

export default function InputWithLabel() {
  const initialState = { message: null, errors: {} };


  return (
    <form action={submitLinkedinUrl}>
      <div className="mt-2 flex rounded-md shadow-sm">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <input
            type="url"
            name="linkedin-url"
            id="linkedin-url"
            className="block w-full rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
            placeholder="https://www.linkedin.com/in/seifabdelaziz/"
          />
        </div>
        <button
          type="button"
          className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <ArrowUturnUpIcon
            className="-ml-0.5 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          Submit
        </button>
      </div>
    </form>
  );
}
