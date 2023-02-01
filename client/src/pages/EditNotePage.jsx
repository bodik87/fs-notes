import React from "react";
import { useSelector } from "react-redux";
import { checkIsAuth } from "../app/auth/authSlice";
import { IsNotAuth } from "../components/IsNotAuth";

export const EditNotePage = () => {
  const isAuth = useSelector(checkIsAuth);
  if (!isAuth) {
    return <IsNotAuth />;
  }
  return <div>EditNotePage</div>;
};
