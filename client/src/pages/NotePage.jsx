import React from "react";
import { useSelector } from "react-redux";
import { checkIsAuth } from "../app/auth/authSlice";
import { IsNotAuth } from "../components/IsNotAuth";

export const NotePage = () => {
  const isAuth = useSelector(checkIsAuth);
  if (!isAuth) {
    return <IsNotAuth />;
  }
  return (
    <article className="w-screen h-screen transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all">
      <h1 className="text-lg font-medium leading-6 text-gray-900">title</h1>
      <div className="mt-2">
        <p className="text-sm text-gray-500">body</p>
      </div>

      <div className="mt-4 flex gap-4">
        <button
          type="button"
          className="btn inline-flex justify-center rounded-lg border border-transparent bg-black px-6 py-2 text-base font-medium text-white transition-all hover:opacity-80"
        >
          Back
        </button>
        <button
          type="button"
          className="btn inline-flex justify-center rounded-lg border border-transparent bg-white px-6 py-2 text-base font-medium text-[#696969] transition-all hover:opacity-80"
        >
          Got it, thanks!
        </button>
      </div>
    </article>
  );
};
