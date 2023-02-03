import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  notes: [],
  favoriteNotes: [],
  isLoading: false,
  info: null,
};

export const createNote = createAsyncThunk(
  "notes/createNote",
  async ({ title, color, body, isFavorite }) => {
    try {
      const { data } = await axios.post("/notes", {
        title,
        color,
        body,
        isFavorite,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async ({ title, color, body, isFavorite, id }) => {
    try {
      const { data } = await axios.patch(`/notes/${id}`, {
        title,
        color,
        body,
        isFavorite,
        id,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllNotes = createAsyncThunk("notes/getAllNotes", async () => {
  try {
    const { data } = await axios.get("/notes");
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const removeNote = createAsyncThunk("notes/removeNote", async (id) => {
  try {
    const { data } = await axios.delete(`/notes/${id}`, id);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: {
    // Создание заметки
    [createNote.pending]: (state) => {
      state.isLoading = true;
    },
    [createNote.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.notes.push(action.payload.newNote);
    },
    [createNote.rejected]: (state) => {
      state.isLoading = false;
    },

    // Получение заметок от всех пользователей
    [getAllNotes.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllNotes.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.notes = action.payload.notes; // из контролеров
      state.favoriteNotes = action.payload.favoriteNotes; // из контролеров
    },
    [getAllNotes.rejected]: (state) => {
      state.isLoading = false;
    },

    // Удаление заметки
    [removeNote.pending]: (state) => {
      state.isLoading = true;
    },
    [removeNote.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.notes = state.notes.filter(
        (note) => note._id !== action.payload._id
      );
    },
    [removeNote.rejected]: (state) => {
      state.isLoading = false;
    },

    // Обновление заметки
    [updateNote.pending]: (state) => {
      state.isLoading = true;
    },
    [updateNote.fulfilled]: (state, action) => {
      state.isLoading = false;
      const index = state.notes.findIndex(
        (note) => note._id === action.payload._id
      );
      state.info = state.notes;
      state.notes[index] = action.payload;
    },
    [updateNote.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default notesSlice.reducer;
