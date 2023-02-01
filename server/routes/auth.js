import { Router } from "express";
import { register, login, getMe } from "../controllers/auth.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

// роуты - эндпоинты для того или иного действия

// Register http://localhost:5002/api/auth/register
router.post("/register", register);

// Login http://localhost:5002/api/auth/login
router.post("/login", login);

// Get Me - получение своего профиля http://localhost:5002/api/auth/me
// этот роут будет отрабатывать при перезагрузке страницы, чтоб мы не перелогинивались
router.get("/me", checkAuth, getMe);

export default router;
