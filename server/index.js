import express, { request, response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoute from "./routes/auth.js";
import noteRoute from "./routes/notes.js";

mongoose.set("strictQuery", false);
const app = express();
dotenv.config();

// CONSTANTS
const PORT = process.env.PORT || 5003;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

// MIDDLEWARES
app.use(cors()); // позволит отправлять запросы с разных IP
app.use(express.json()); // для понимания Экспрессом формата JSON от фронта

// ENDPOINTS
app.use("/api/auth", authRoute); // при запросе на "/api/auth" будут отрабатываться все роуты из authRoute
app.use("/api/notes", noteRoute);

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${USER}:${PASSWORD}@cluster0.k6ppzhv.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    );
    app.listen(PORT, () => console.log(`Server on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}
start();
