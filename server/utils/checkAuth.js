import jwt from "jsonwebtoken";

export const checkAuth = (request, response, next) => {
  // токен с фронта приходит строкой со словом Bearer. Вытаскиваем сам токен
  const token = (request.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      // Расшифровываем токен
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Добавляем в body фронт запроса userId для автоматизации запроса
      request.userId = decoded.id;
      next();
    } catch (error) {
      return response.json({
        message: "Нет доступа 1",
      });
    }
  } else {
    return response.json({
      message: "Нет доступа 2",
    });
  }
};
