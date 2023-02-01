import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { getMe } from "./app/auth/authSlice";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { NotePage } from "./pages/NotePage";
import { AddNotePage } from "./pages/AddNotePage";
import { EditNotePage } from "./pages/EditNotePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path=":id" element={<NotePage />} />
        <Route path=":id/edit" element={<EditNotePage />} />
        <Route path="new" element={<AddNotePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
