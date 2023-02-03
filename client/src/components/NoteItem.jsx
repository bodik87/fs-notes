import React from "react";
import { Link } from "react-router-dom";
import { EDITED } from "../assets/CONSTANTS";

export const NoteItem = ({ note }) => {
  return (
    <Link
      to={`/${note?._id}`}
      style={{ backgroundColor: note?.color }}
      className="w-full sm:min-w-[300px] sm:max-w-[400px] h-fit px-4 py-3 rounded-lg shadow-[0_2px_4px_1px_rgba(0,0,0,0.1)] border border-black/20"
    >
      <h1 className="font-semibold text-2xl">{note?.title}</h1>
      <h2 className="mt-1 text-base">
        {note?.body.slice(0, 200)}
        {note?.body.length > 200 && "..."}
      </h2>
      <h3 className="mt-3 text-xs text-black/60 text-right">
        {EDITED}: {note?.updatedAt}
      </h3>
    </Link>
  );
};
