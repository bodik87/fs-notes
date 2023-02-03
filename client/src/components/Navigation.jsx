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
    navigate("/login");
  };

  return (
    <nav className="sticky backdrop-blur-2xl p-4 mb-3 flex justify-between items-center z-10">
      {home ||
      location.pathname === "/login" ||
      location.pathname === "/register" ? (
        <h1 className="px-3 py-2 bg-black font-bold text-white rounded-lg select-none">
          NOTES
        </h1>
      ) : (
        <Link
          to={"/"}
          className="py-2 flex items-center gap-2 font-bold text-black rounded-lg select-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          На главную
        </Link>
      )}
      {isAuth && (
        <button onClick={logoutHandler} title="Выход">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
        </button>
      )}
    </nav>
  );
};
