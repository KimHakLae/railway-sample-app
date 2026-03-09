import { useNavigate } from "react-router-dom"

export default function LogoutForm() {
  const navigate = useNavigate()

  const handleLogout = () => {
    if (!confirm("로그아웃 하시겠습니까?")) return
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <button
      onClick={handleLogout}
      className="!bg-red-500 hover:bg-red-600 text-white !px-3 !py-1.5 !rounded-md !text-xs shadow"
    >
      로그아웃
    </button>
  )
}