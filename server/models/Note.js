import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "#FFF475",
    },
    body: {
      type: String,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  // для отметок времени
  { timestamps: true }
);

export default mongoose.model("Note", NoteSchema);
