import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { checkIsAuth } from "../app/auth/authSlice";
import { updateNote } from "../app/notes/notesSlice";
import {
  ADD_TO_FAVORITE,
  COLORS,
  DISABLE,
  ENTER_TITLE,
  NOTE_PLASEHOLDER,
  NOTE_TEXT,
  TITLE,
  UPDATE,
} from "../assets/CONSTANTS";
import Colors from "../components/Colors";
import { IsNotAuth } from "../components/IsNotAuth";
import axios from "../utils/axios";

export const EditNotePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#FFF475");
  const [body, setBody] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  const fetchNote = useCallback(async () => {
    const { data } = await axios.get(`/notes/${id}`);
    setTitle(data.title);
    setColor(data.color);
    setBody(data.body);
    setIsFavorite(data.isFavorite);
  }, [id]);

  useEffect(() => {
    fetchNote();
  }, [id]);

  const submitHandler = () => {
    try {
      dispatch(updateNote({ title, color, body, isFavorite, id }));
    } catch (error) {
      console.log(error);
    }
  };

  const clearFormHandler = () => {
    setTitle("");
    setBody("");
    setIsFavorite(false);
  };

  const onSubmitFormHandler = (event) => {
    event.preventDefault();
    navigate("/");
  };

  const isAuth = useSelector(checkIsAuth);
  if (!isAuth) {
    return <IsNotAuth />;
  }

  return (
    <form onSubmit={onSubmitFormHandler} className="form">
      <label className="label">
        {TITLE}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={ENTER_TITLE}
          className="noteInput"
        />
      </label>

      <label className="label">
        {NOTE_TEXT}
        <textarea
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={NOTE_PLASEHOLDER}
          className="noteInput h-40"
        />
      </label>
      <label className="label mt-2 flex w-full flex-col items-center">
        {COLORS}
        <Colors activeColor={color} setColor={setColor} />
      </label>
      <label className="label mt-6 pb-6 flex w-full justify-center items-center">
        {ADD_TO_FAVORITE}
        <input
          type="checkbox"
          className="w-5 h-5 ml-2"
          checked={isFavorite}
          onChange={(event) => setIsFavorite(event.target.checked)}
        />
      </label>
      <div className="btnsRow">
        <button
          type="button"
          onClick={clearFormHandler}
          className="secondaryBtn"
        >
          {DISABLE}
        </button>
        <button type="submit" onClick={submitHandler} className="mainBtn">
          {UPDATE}
        </button>
      </div>
    </form>
  );
};
