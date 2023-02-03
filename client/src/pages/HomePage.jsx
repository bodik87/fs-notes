import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { EMPTY, FAVORITE_NOTES, LOADING, NOTES } from "../assets/CONSTANTS";
import { NoteItem } from "../components/NoteItem";
import axios from "../utils/axios";

export const HomePage = () => {
  const [notesArray, setNotesArray] = useState([]);
  const { isLoading } = useSelector((state) => state.notes);

  const fetchNotes = async () => {
    const { data } = await axios.get(`/notes/users/me`);
    setNotesArray(data);
  };
  useEffect(() => {
    fetchNotes();
  }, [isLoading]);

  const favoriteNotes = notesArray.filter((note) => note?.isFavorite);
  const notes = notesArray.filter((note) => note?.isFavorite === false);

  if (isLoading) {
    return <p className="text-center">{LOADING}</p>;
  }

  return (
    <div className="px-4 pb-10">
      {notesArray.length === 0 && (
        <p className="mt-32 text-2xl text-center">{EMPTY}</p>
      )}
      {favoriteNotes.length > 0 && (
        <Fragment>
          <h2 className="ml-2 mb-1 font-semibold select-none">
            {FAVORITE_NOTES}
          </h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {favoriteNotes.map((note, i) => (
              <NoteItem key={i} note={note} />
            ))}
          </div>
        </Fragment>
      )}

      {notes.length > 0 && (
        <Fragment>
          <h2 className="ml-2 mb-1 text-sm font-semibold opacity-75 select-none">
            {NOTES}
          </h2>
          <div className="flex flex-wrap gap-2">
            {notes.map((note, i) => (
              <NoteItem key={i} note={note} />
            ))}
          </div>
        </Fragment>
      )}

      <Link
        className="fixed right-4 bottom-4 w-14 h-14 backdrop-blur-2xl flex items-center justify-center rounded-full bg-black/10 text-black text-2xl"
        to={"new"}
      >
        +
      </Link>
    </div>
  );
};
