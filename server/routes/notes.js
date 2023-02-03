import { Router } from "express";
import {
  createNote,
  getAll,
  getMyNotes,
  getById,
  removeNote,
  updateNote,
} from "../controllers/notes.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

// Create note localhost/api/notes
router.post("/", checkAuth, createNote);

// GetAll note localhost/api/notes
router.get("/", getAll);

// Get users note localhost/api/notes/users/me
router.get("/users/me", checkAuth, getMyNotes);

// Get note by Id localhost/api/notes/:id
router.get("/:id", getById);

// Remove note localhost/api/notes/:id
router.delete("/:id", checkAuth, removeNote);

// Update note localhost/api/notes/:id
router.patch("/:id", checkAuth, updateNote);

export default router;
