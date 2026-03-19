import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { login } from "../../api/auth";
import { getUserFromToken } from "../../utils/auth"

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await login(email, password);

      // 토큰 저장
      localStorage.setItem("token", data.token)

      // 🔥 사용자 정보 확인
      const user = getUserFromToken()

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
        className="premium-input"
        placeholder="이메일 주소"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        autoFocus
      />

      <input
        type="password"
        className="premium-input"
        placeholder="비밀번호"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      {error && (
        <p className="text-red-500 dark:text-red-400 text-sm">
          {error}
        </p>
      )}
      <button
        className="
          w-full
          bg-gradient-to-r from-brand-500 to-brand-600
          hover:from-brand-600 hover:to-brand-700
          dark:from-brand-600 dark:to-brand-700
          dark:hover:from-brand-500 dark:hover:to-brand-600
          text-white
          py-3 rounded-2xl
          font-black text-sm
          shadow-lg shadow-brand-500/30
          dark:shadow-brand-900/40
          transition-all duration-300
          active:scale-[0.98]
        "
      >
        로그인
      </button>

    </form>

  );
}