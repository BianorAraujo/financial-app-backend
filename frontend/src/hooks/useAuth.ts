import { useNavigate } from "react-router-dom";

export function useAuth() {
  const navigate = useNavigate();

  function login(token: string) {
    localStorage.setItem("token", token);
    navigate("/dashboard");
  }

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return {
    login,
    logout,
    token: localStorage.getItem("token"),
  };
}