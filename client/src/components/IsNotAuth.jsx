import React from "react";
import { Link } from "react-router-dom";
import { NEED_AUTHORIZATION } from "../assets/CONSTANTS";

export const IsNotAuth = () => {
  return (
    <Link
      to={"/login"}
      className="block mt-20 font-semibold text-center text-2xl underline underline-offset-2 text-red-600 hover:text-black transition-all"
    >
      {NEED_AUTHORIZATION}
    </Link>
  );
};
