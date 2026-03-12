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
          {/* 취소 버튼 */}
          <button
            onClick={() => {
              setConfirming(false);
              hideSnackbar();
            }}
            className="
              px-3 py-1 rounded-md !text-xs
              border border-gray-300
              text-gray-700
              shadow-sm
              transition
              hover:bg-gray-100 hover:shadow
              active:scale-95
            "
          >
            취소
          </button>

          {/* 로그아웃 버튼 */}
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
              hideSnackbar();
            }}
            className="
              px-3 py-1 rounded-md !text-xs
              bg-gradient-to-r from-red-500 to-red-600
              text-white font-semibold
              shadow
              transition
              hover:from-red-600 hover:to-red-700
              active:scale-95
            "
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
      className="
        !px-3 !py-1.5 !rounded-md !text-xs
        bg-gradient-to-r from-red-500 to-red-600
        text-white
        font-semibold
        shadow
        transition
        hover:from-red-600 hover:to-red-700
        active:scale-95
      "
    >
      로그아웃
    </button>
  );
}