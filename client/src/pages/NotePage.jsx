import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";
import { checkIsAuth } from "../app/auth/authSlice";
import { IsNotAuth } from "../components/IsNotAuth";
import { removeNote } from "../app/notes/notesSlice";
import { DELETE, EDIT, EDITED } from "../assets/CONSTANTS";

export const NotePage = () => {
  const [note, setNote] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.notes);

  if (isLoading) {
    return <p className="text-center">Загрузка...</p>;
  }

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

  return (
    <article
      style={{ backgroundColor: note.color }}
      className="absolute inset-0 pt-20 p-6 overflow-auto"
    >
      <h1 className="font-semibold text-2xl">{note.title}</h1>
      <h2 className="mt-4 text-base">{note.body}</h2>
      <h3 className="mt-6 text-xs text-right text-black/80">
        {EDITED}: {note.updatedAt}
      </h3>

      <div className="btnsRow">
        <button type="button" onClick={removeNoteHandler} className="deleteBtn">
          {DELETE}
        </button>
        <Link to={`/${id}/edit`} className="mainBtn">
          {EDIT}
        </Link>
      </div>
    </article>
  );
};
