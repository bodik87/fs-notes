import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  const goHome = () => navigate("/");

  useEffect(() => {
    setTimeout(() => {
      goHome();
    }, 3000);
  }, []);

  return (
    <div
      id="error-page"
      className="h-screen flex flex-col items-center justify-center"
    >
      <h1 className="text-2xl">Упс! 😕</h1>
      <p>Страница не найдена.</p>
      <p>Вы вернетесь на главную страницу через 3 секунды.</p>
    </div>
  );
}
