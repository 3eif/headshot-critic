import LoginButton from "./login-button";
import UploadPhoto from "./upload-photo";

export default async function SubmitForm() {
  return (
    <div className="mt-10 items-center justify-center gap-x-6">
      <UploadPhoto />
      <p className="mt-2 text-sm text-gray-500" id="email-description">
        Photos are automatically deleted after 24 hours. Recommended for higher
        quality results.
      </p>
      <p className="my-5">Or</p>
      <LoginButton />
    </div>
  );
}
