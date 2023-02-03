import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FAVORITE_NOTES, LOADING, NOTES } from "../assets/CONSTANTS";
import { NoteItem } from "../components/NoteItem";
import axios from "../utils/axios";

export const HomePage = () => {
  const [notesArray, setNotesArray] = useState([]);
  const { isLoading } = useSelector((state) => state.notes);

  if (isLoading) {
    return <p className="text-center">{LOADING}</p>;
  }

  const fetchNotes = async () => {
    const { data } = await axios.get(`/notes/users/me`);
    setNotesArray(data);
  };

  fetchNotes();

  const favoriteNotes = notesArray.filter((note) => note.isFavorite);
  const notes = notesArray.filter((note) => note.isFavorite === false);

  return (
    <div className="px-4 pb-10">
      {favoriteNotes && (
        <Fragment>
          <h2 className="ml-2 mb-1 font-semibold select-none">
            {FAVORITE_NOTES}
          </h2>
          <div className="flex flex-wrap gap-2">
            {favoriteNotes.map((note, i) => (
              <NoteItem key={i} note={note} />
            ))}
          </div>
        </Fragment>
      )}

      {notes && (
        <Fragment>
          <h2 className="ml-2 mb-1 mt-6 text-sm font-semibold opacity-75 select-none">
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
