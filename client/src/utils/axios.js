import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5002/api",
});

// добавим к каждому запросу отправку токена на сервер
instance.interceptors.request.use((config) => {
  config.headers.authorization = window.localStorage.getItem("token");

  return config;
});

export default instance;
