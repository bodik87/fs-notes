import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { checkIsAuth } from "../app/auth/authSlice";
import { IsNotAuth } from "../components/IsNotAuth";

export const HomePage = () => {
  const notes = useSelector((state) => state.notes);

  const isAuth = useSelector(checkIsAuth);
  if (!isAuth) {
    return <IsNotAuth />;
  }

  if (!notes.length) {
    return (
      <p className="mt-6 text-center text-base text-red-600">
        Заметки отсутствуют
      </p>
    );
  }

  return (
    <div className="grid gap-2 grid-cols-fluid">
      {notes.map((item) => (
        <button
          key={item.id}
          type="button"
          style={{ backgroundColor: item.color }}
          className="shadow-[0_4px_14px_0px_rgba(0,0,0,0.1)] p-4 bg-white min-w-[300px] rounded-lg border border-black/10 bg-opacity-20 text-sm text-left font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <h1 className="font-semibold text-2xl">{item.title}</h1>
          <h2 className="mt-1">{item.body}</h2>
        </button>
      ))}
      <Link
        className="fixed right-4 bottom-4 w-14 h-14 backdrop-blur-2xl flex items-center justify-center rounded-full bg-black/20"
        to={"new"}
      >
        +
      </Link>
    </div>
  );
};
