import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Контроллеры - функции для конкретного эндпоита(роута)

// ===>>> REGISTER NEW USER
export const register = async (request, response) => {
  try {
    const { username, password } = request.body; // получаем юзера от фронта через его пост-запрос

    // обращаемся к БД и спрашиваем есть ли в ней пользователь из запроса
    const isUsed = await User.findOne({ username });

    if (isUsed) {
      return response.json({
        message: "Пользователь с таким именем уже существует.",
      });
    }

    // Если такого пользователя нет - создаем нового пользователя с хешированным паролем в БД
    const salt = bcrypt.genSaltSync(10); // указываем сложность шифрования
    const hash = bcrypt.hashSync(password, salt); // хешируем пароль

    const newUser = new User({
      username,
      password: hash,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    // записываем созданного юзера в БД монгус
    await newUser.save();

    // После записи в БД на фронт мы отправляем ответ на фротн об успешной регистрации
    response.json({
      newUser,
      token,
      message: "Регистрация прошла успешно.",
    });
  } catch (error) {
    response.json({ message: "Ошибка при создании пользователя!" });
  }
};

// ===>>> LOGIN
export const login = async (request, response) => {
  try {
    const { username, password } = request.body;

    // ищем в БД существует ли пользователь
    const user = await User.findOne({ username });
    if (!user) {
      return response.json({ message: "Такого пользователя не существует." });
    }

    // если пользователь есть - проверяем хешированный пароль найденного юзера с паролем от фронта
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return response.json({ message: "Неверный пароль." });
    }

    // если пользователь есть - создаем ему токен и шифруем аго специальной фразой
    // создаем токен на базе id
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    // Возвращаем на фронт успешные данные
    response.json({
      token,
      user,
      message: "Вы вошли в систему",
    });
  } catch (error) {
    response.json({ message: "Ошибка при авторизации." });
  }
};

// Get Me - получение своего профиля (проверяем есть ли токен)
export const getMe = async (request, response) => {
  try {
    const user = await User.findById(request.userId);

    if (!user) {
      return response.json({ message: "Такого пользователя не существует." });
    }

    // создаем токен на базе id
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    response.json({
      user,
      token,
    });
  } catch (error) {
    response.json({ message: "Нет доступа." });
  }
};
