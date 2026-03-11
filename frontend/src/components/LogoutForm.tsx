import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "./ui/SnackbarProvider";

export default function LogoutForm() {
  const navigate = useNavigate();
  const { showSnackbar, hideSnackbar } = useSnackbar();
  const [confirming, setConfirming] = useState(false);

  const handleLogout = () => {
    if (confirming) return;
    setConfirming(true);

    showSnackbar("정말 로그아웃하시겠습니까?", {
      type: "info",
      duration: null, // 사용자가 선택할 때까지 유지
      action: (
        <div className="flex gap-2 items-center">
          <button
            onClick={() => {
              setConfirming(false);
              hideSnackbar(); // ✅ 스낵바 닫기
            }}
            className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 !text-xs hover:bg-gray-100"
          >
            취소
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
              hideSnackbar(); // ✅ 스낵바 닫기
            }}
            className="px-3 py-1 rounded-md !bg-red-500 text-white !text-xs hover:bg-red-600"
          >
            로그아웃
          </button>
        </div>
      ),
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="!bg-red-500 hover:bg-red-600 text-white !px-3 !py-1.5 !rounded-md !text-xs shadow"
    >
      로그아웃
    </button>
  );
}