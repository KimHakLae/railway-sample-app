import { useState } from "react";
import { login } from "../api/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await login(email, password);

      localStorage.setItem("token", data.token);

      window.location.href = "/notes";
    } catch {
      setError("이메일 또는 비밀번호가 틀렸습니다.");
    }
  };

  return(

    <form onSubmit={handleSubmit} className="space-y-4">

      <input
        className="w-full border rounded p-2"
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
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