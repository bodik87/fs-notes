import Note from "../models/Note.js";
import User from "../models/User.js";

export const createNote = async (request, response) => {
  try {
    const { title, color, body, isFavorite } = request.body;
    const user = await User.findById(request.userId);

    const newNote = new Note({
      username: user.username,
      title,
      color,
      body,
      isFavorite,
      author: request.userId,
    });

    await newNote.save();
    await User.findByIdAndUpdate(request.userId, {
      $push: { notes: newNote },
    });

    response.json({
      newNote,
      message: "Заметка создана успешно.",
    });
  } catch (error) {
    console.log(error);
    response.json({ message: "Ошибка при создании заметки." });
  }
};

export const getAll = async (request, response) => {
  try {
    // const notes = await Note.find().sort("-updatedAt");
    const notes = await Note.find();
    const favoriteNotes = await Note.find().sort("-isFavorite");

    if (!notes) {
      return response.json({ message: "Заметки отсутствуют." });
    }

    response.json({ notes, favoriteNotes });
  } catch (error) {
    console.log(error);
    response.json({ message: "Ошибка при получении заметок." });
  }
};

export const getMyNotes = async (request, response) => {
  try {
    const user = await User.findById(request.userId);

    const list = await Promise.all(
      user.notes.map((note) => {
        return Note.findById(note._id);
      })
    );
    response.json(list);
  } catch (error) {
    console.log(error);
    response.json({ message: "Ошибка при получении заметок." });
  }
};

export const getById = async (request, response) => {
  try {
    // const notes = await Note.find().sort("-updatedAt");
    const note = await Note.findByIdAndUpdate(request.params.id);

    response.json(note);
  } catch (error) {
    console.log(error);
    response.json({ message: "Ошибка при получении заметок." });
  }
};

export const removeNote = async (request, response) => {
  try {
    const note = await Note.findByIdAndDelete(request.params.id);
    if (!note) return response.json({ message: "Такого поста нет." });

    await User.findByIdAndUpdate(request.userId, {
      $pull: { notes: request.params.id },
    });

    response.json({ message: "Пост удален." });
  } catch (error) {
    console.log(error);
    response.json({ message: "Ошибка при удалении заметки." });
  }
};

export const updateNote = async (request, response) => {
  try {
    const { title, color, body, isFavorite, id } = request.body;
    const note = await Note.findById(id);

    note.title = title;
    note.color = color;
    note.body = body;
    note.isFavorite = isFavorite;

    response.json(note);
  } catch (error) {
    console.log(error);
    response.json({ message: "Ошибка при удалении заметки." });
  }
};
