import { createSlice } from "@reduxjs/toolkit";

const LS_NOTES_KEY = "localNotes";

const initialState = JSON.parse(localStorage.getItem(LS_NOTES_KEY)) ?? [
  {
    id: 1,
    title: "My first note",
    color: "#30B3F6",
    body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, autem deserunt labore veritatis dicta et, temporibus eligendi facere at non cum atque quam! Nesciunt maxime odit doloremque eum quasi! Placeat. ",
  },
  {
    id: 2,
    title: "Second note",
    color: "#62E1AC",
    body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, autem deserunt labore veritatis dicta et.",
  },
  {
    id: 3,
    title: "Note 3",
    color: "#F28B82",
    body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, autem deserunt labore veritatis dicta et, temporibus eligendi facere at non cum atque quam! Nesciunt maxime odit doloremque eum quasi! Placeat. ",
  },
];

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes.push(action.payload);
      localStorage.setItem(LS_NOTES_KEY, JSON.stringify(state));
    },
    deleteNote: (state, action) => {
      state.notes.filter((note) => note.id !== action.payload);
      localStorage.setItem(LS_NOTES_KEY, JSON.stringify(state));
    },
    updateNote: (state, action) => {
      state.notes.map(
        (note) =>
          note.id === action.payload.id &&
          ((note.title = action.payload.title),
          (note.color = action.payload.color),
          (note.body = action.payload.body))
      );
      localStorage.setItem(LS_NOTES_KEY, JSON.stringify(state));
    },
  },
});

export const { addNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;
