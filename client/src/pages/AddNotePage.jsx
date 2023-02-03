import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkIsAuth } from "../app/auth/authSlice";
import { createNote } from "../app/notes/notesSlice";
import Colors from "../components/Colors";
import { IsNotAuth } from "../components/IsNotAuth";

export const AddNotePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#FFF475");
  const [body, setBody] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  const submitHandler = () => {
    try {
      dispatch(createNote({ title, color, body, isFavorite }));
      setTitle("");
      setBody("");
      setIsFavorite(false);
    } catch (error) {
      console.log(error);
    }
  };

  const clearFormHandler = () => {
    setTitle("");
    setBody("");
    setIsFavorite(false);
  };

  const isAuth = useSelector(checkIsAuth);
  if (!isAuth) {
    return <IsNotAuth />;
  }

  const onSubmitFormHandler = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <form onSubmit={onSubmitFormHandler} className="form">
      <label className="text-xs text-gray-400">
        Заголовок
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Введите заголовок"
          className="noteInput"
        />
      </label>

      <label className="text-xs text-gray-400">
        Текст заметки
        <textarea
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Заметка..."
          className="noteInput h-40"
        />
      </label>
      <label className="mt-2 flex w-full flex-col items-center text-xs text-gray-400">
        Цвет фона
        <Colors setColor={setColor} />
      </label>
      <label className="mt-6 flex w-full justify-center items-center pb-3 text-xs text-gray-400">
        Избранное
        <input
          type="checkbox"
          className="w-5 h-5 ml-2"
          checked={isFavorite}
          onChange={(event) => setIsFavorite(event.target.checked)}
        />
      </label>
      <div className="mt-4 flex justify-center gap-4">
        <button
          type="submit"
          onClick={submitHandler}
          className="btn inline-flex justify-center rounded-lg border border-transparent bg-black px-6 py-2 text-base font-medium text-white transition-all hover:opacity-80"
        >
          Создать
        </button>
        <button
          type="button"
          onClick={clearFormHandler}
          className="btn inline-flex justify-center rounded-lg border border-transparent bg-white px-2 py-2 text-base font-medium text-[#696969] transition-all hover:opacity-80"
        >
          Отменить
        </button>
      </div>
    </form>
  );
};
