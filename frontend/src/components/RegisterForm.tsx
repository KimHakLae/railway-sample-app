import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { register } from "../api/auth"
import { useSnackbar } from "../components/ui/SnackbarProvider" // ✅ 스낵바

export default function RegisterForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("") // ✅ 에러 상태
  const navigate = useNavigate()
  const { showSnackbar } = useSnackbar() // ✅ 훅 사용

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("") // 제출 시 초기화

    try {
      await register(email, password)

      // ✅ alert 대신 스낵바
      showSnackbar("회원가입 요청이 완료되었습니다!\n관리자 승인 후 이용 가능합니다.", {
        type: "success",
        duration: 4000,
      })
      navigate("/") // 회원가입 성공 시 로그인 페이지 이동
    } catch (err: any) {
      setErrorMessage(err.message) // 입력 밑에 노출
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="email"
          placeholder="이메일 주소"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="premium-input"
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="premium-input"
        />
      </div>

      {/* ✅ 에러 메시지 노출 */}
      {errorMessage && (
        <p className="text-red-500 text-sm">{errorMessage}</p>
      )}

      <button
        className="
          w-full
          !bg-gradient-to-r from-blue-500 to-blue-600
          text-white
          p-2 rounded
          font-semibold
          shadow
          transition
          hover:from-blue-600 hover:to-blue-700
          active:scale-95
        "
      >
        Register
      </button>
    </form>
  )
}