import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { checkIsAuth, loginUser } from "../app/auth/authSlice";
import { IsNotAuth } from "../components/IsNotAuth";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
  const isAuth = useSelector(checkIsAuth);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    setInfo(status);
    isAuth && navigate("/");
  }, [status, isAuth, navigate]);

  const habdleSubmit = () => {
    try {
      dispatch(loginUser({ username, password }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="form">
      <h1 className="text-xl font-semibold text-center">Авторизация</h1>
      <label className="text-xs text-gray-400">
        Логин
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Логин"
          className="input"
        />
      </label>
      <label className="text-xs text-gray-400">
        Пароль
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          className="input"
        />
      </label>

      <div className="mt-6 flex flex-col items-center justify-center gap-4">
        <button
          onClick={habdleSubmit}
          type="submit"
          className="btn inline-flex justify-center rounded-lg border border-transparent bg-black px-6 py-2 text-base font-medium text-white transition-all hover:opacity-80"
        >
          Войти
        </button>
        <Link
          className="px-6 py-2 text-base font-medium text-[#696969] transition-all hover:opacity-80"
          onClick={() => setInfo("")}
          to="/register"
        >
          Зарегистрироваться
        </Link>
      </div>
      {status && (
        <p className="mt-6 text-center text-base text-red-600">{info}</p>
      )}
    </form>
  );
};
