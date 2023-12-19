import InputWithLabel from "./input-with-label";
import UploadPhoto from "./upload-photo";

export default function SubmitForm() {
  return (
    <div className="mt-10 items-center justify-center gap-x-6">
      <InputWithLabel />
      <p className="my-5">Or</p>
      <UploadPhoto />
      <p className="mt-2 text-sm text-gray-500" id="email-description">
        Photos are automatically deleted after 24 hours.
      </p>
    </div>
  );
}
