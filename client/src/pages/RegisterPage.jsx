import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { checkIsAuth, registerUser } from "../app/auth/authSlice";

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { status } = useSelector((state) => state.auth);
  const isAuth = useSelector(checkIsAuth);
  const navigate = useNavigate();
  const [info, setInfo] = useState("");

  useEffect(() => {
    setInfo(status);
    isAuth && navigate("/");
  }, [status, isAuth, navigate]);

  const habdleSubmit = () => {
    try {
      dispatch(registerUser({ username, password }));
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="form">
      <h1 className="text-xl font-semibold text-center">Регистрация</h1>
      <label className="text-xs text-gray-400">
        Логин
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Имя пользователя"
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
          Подтвердить
        </button>
        <Link
          className="px-6 py-2 text-base font-medium text-[#696969] transition-all hover:opacity-80"
          to="/login"
        >
          Уже зарегистрированы?
        </Link>
      </div>
      {status && (
        <p className="mt-6 text-center text-base text-red-600">{info}</p>
      )}
    </form>
  );
};
