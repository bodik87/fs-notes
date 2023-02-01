import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { checkIsAuth, logout } from "../app/auth/authSlice";

export const Navigation = () => {
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const home = location.pathname === "/";

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    navigate("/");
  };

  const activeStyle = { color: "red" };
  return (
    <nav className="mb-3 flex justify-between items-center">
      {home ||
      location.pathname === "/login" ||
      location.pathname === "/register" ? (
        <h1 className="font-bold text-white px-3 py-2 rounded-lg bg-black">
          NOTES
        </h1>
      ) : (
        <Link
          to={"/"}
          className="font-bold text-white px-3 py-2 rounded-lg bg-black"
        >
          На главную
        </Link>
      )}
      {isAuth && (
        <button className="mr-2" onClick={logoutHandler}>
          Выйти
        </button>
      )}
    </nav>
  );
};
