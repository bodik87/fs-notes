import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axios";

export const HomePage = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const { data } = await axios.get(`/notes/users/me`);
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, [notes.length]);

  if (!notes) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className="grid gap-2 grid-cols-fluid">
      <h2 className="ml-2 font-semibold">Избранные заметки</h2>
      {notes.length &&
        notes?.map(
          (item, i) =>
            item?.isFavorite && (
              <Link
                key={i}
                to={`/${item?._id}`}
                style={{ backgroundColor: item?.color }}
                className="shadow-[0_4px_14px_0px_rgba(0,0,0,0.1)] p-4 bg-white min-w-[300px] rounded-lg border border-black/10 bg-opacity-20 text-sm text-left font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                <h1 className="font-semibold text-2xl">{item?.title}</h1>
                <h2 className="mt-1 text-base">{item?.body}</h2>
                <h3 className="mt-2 text-xs text-black/80">
                  Изменено: {item?.updatedAt}
                </h3>
              </Link>
            )
        )}
      <h2 className="ml-2 mt-6 text-sm font-semibold opacity-75">Заметки</h2>{" "}
      {notes.length &&
        notes.map(
          (item, i) =>
            !item?.isFavorite && (
              <Link
                key={i}
                to={`/${item?._id}`}
                style={{ backgroundColor: item?.color }}
                className="shadow-[0_4px_14px_0px_rgba(0,0,0,0.1)] p-4 bg-white min-w-[300px] rounded-lg border border-black/10 bg-opacity-20 text-sm text-left font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                <h1 className="font-semibold text-2xl">{item?.title}</h1>
                <h2 className="mt-1 text-base">{item?.body}</h2>
                <h3 className="mt-2 text-xs text-black/80">
                  Изменено: {item?.updatedAt}
                </h3>
              </Link>
            )
        )}
      <Link
        className="fixed right-4 bottom-4 w-14 h-14 backdrop-blur-2xl flex items-center justify-center rounded-full bg-black/20"
        to={"new"}
      >
        +
      </Link>
    </div>
  );
};
