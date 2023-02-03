import axios from "../utils/axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { checkIsAuth } from "../app/auth/authSlice";
import { IsNotAuth } from "../components/IsNotAuth";
import { removeNote } from "../app/notes/notesSlice";

export const NotePage = () => {
  const [note, setNote] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchNote = useCallback(async () => {
    const { data } = await axios.get(`/notes/${id}`);
    setNote(data);
  }, [id]);

  useEffect(() => {
    fetchNote();
  }, [id]);

  const removeNoteHandler = () => {
    try {
      dispatch(removeNote(id));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const isAuth = useSelector(checkIsAuth);
  if (!isAuth) {
    return <IsNotAuth />;
  }

  if (!note) {
    return <p>Загрузка...</p>;
  }

  return (
    <article className="w-screen h-screen transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all">
      <h1 className="font-semibold text-2xl">{note.title}</h1>
      <h2 className="mt-1 text-base">{note.body}</h2>
      <h3 className="mt-2 text-xs text-black/80">Изменено: {note.updatedAt}</h3>

      <div className="mt-4 flex gap-4">
        <Link
          to={`/${id}/edit`}
          className="btn inline-flex justify-center rounded-lg border border-transparent bg-black px-6 py-2 text-base font-medium text-white transition-all hover:opacity-80"
        >
          Изменить
        </Link>
        <button
          type="button"
          onClick={removeNoteHandler}
          className="btn inline-flex justify-center rounded-lg border border-transparent bg-white px-6 py-2 text-base font-medium text-[#ff0000] transition-all hover:opacity-80"
        >
          Удалить
        </button>
      </div>
    </article>
  );
};
