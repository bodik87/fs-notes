import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { checkIsAuth, registerUser } from "../app/auth/authSlice";
import {
  IF_REGISTERED,
  LOGIN,
  PASSWORD,
  REGISTRATION,
  SUBMIT,
} from "../assets/CONSTANTS";

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
      <h1 className="text-xl font-semibold text-center">{REGISTRATION}</h1>

      <label className="label">
        {LOGIN}
        <input
          type="text"
          className="input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={LOGIN}
        />
      </label>

      <label className="label">
        {PASSWORD}
        <input
          type="password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={PASSWORD}
        />
      </label>

      <div className="mt-6 flex flex-col items-center justify-center gap-4">
        <button onClick={habdleSubmit} type="submit" className="mainBtn">
          {SUBMIT}
        </button>

        <Link className="secondaryBtn" to="/login">
          {IF_REGISTERED}
        </Link>
      </div>

      {status && (
        <p className="mt-6 text-center text-base text-red-600">{info}</p>
      )}
    </form>
  );
};
