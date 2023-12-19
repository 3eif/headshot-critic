export default function InputWithLabel() {
  return (
    <div>
      <div className="mt-2">
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
          <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
            https://www.linkedin.com/in/
          </span>
          <input
            type="text"
            name="linkedin-url"
            id="linkedin-url"
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="seifabdelaziz"
          />
        </div>
      </div>
    </div>
  );
}
