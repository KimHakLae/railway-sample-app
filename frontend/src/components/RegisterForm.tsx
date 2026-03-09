import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { register } from "../api/auth"

export default function RegisterForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("") // ✅ 에러 상태
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("") // 제출 시 초기화

    try {
      await register(email, password)

      alert("회원가입 요청이 완료되었습니다!\n관리자 승인 후 이용 가능합니다.");
      navigate("/login") // 회원가입 성공 시 로그인 페이지 이동
    } catch (err: any) {
      setErrorMessage(err.message) // 입력 밑에 노출
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      {/* ✅ 에러 메시지 노출 */}
      {errorMessage && (
        <p className="text-red-500 text-sm">{errorMessage}</p>
      )}

      <button
        type="submit"
        className="w-full !bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
      >
        Register
      </button>
    </form>
  )
}