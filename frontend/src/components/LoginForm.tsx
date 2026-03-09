import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { login } from "../api/auth";
import { getUserFromToken } from "../utils/auth"

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await login(email, password);
      console.log(data)

      // 토큰 저장
      localStorage.setItem("token", data.token)

      // 🔥 사용자 정보 확인
      const user = getUserFromToken()

      console.log(user)

      if (user?.is_admin) {
        navigate("/admin")   // 관리자 페이지
      } else {
        navigate("/user")   // 일반 사용자
      }
    } catch (e: any) {
      setError(e.message);
    }
  };

  return(

    <form onSubmit={handleSubmit} className="space-y-4">

      <input
        className="w-full border rounded p-2"
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        autoFocus
      />

      <input
        type="password"
        className="w-full border rounded p-2"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}

      <button
        className="w-full !bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Login
      </button>

    </form>

  );
}