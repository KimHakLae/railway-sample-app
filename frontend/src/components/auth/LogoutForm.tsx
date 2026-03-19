import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../ui/SnackbarProvider";

export default function LogoutForm() {
  const navigate = useNavigate();
  const { showSnackbar, hideSnackbar } = useSnackbar();
  const [confirming, setConfirming] = useState(false);

  const handleLogout = () => {
    if (confirming) return;
    setConfirming(true);

    showSnackbar("정말 로그아웃하시겠습니까?", {
      type: "info",
      duration: null,
      action: (
        <div className="flex gap-2 items-center pt-1">
          {/* 취소 버튼 */}
          <button
            onClick={() => {
              setConfirming(false);
              hideSnackbar();
            }}
            className="
              px-4 py-1.5 rounded-lg text-xs font-bold
              bg-white dark:bg-slate-800/10 hover:bg-white dark:bg-slate-800/20
              text-white border border-white/20
              transition-all active:scale-95
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
              px-4 py-1.5 rounded-lg text-xs font-bold
              bg-red-500 hover:bg-red-600
              text-white shadow-lg shadow-red-900/20
              transition-all active:scale-95
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
        px-4 py-1.5 rounded-xl text-xs font-extrabold
        bg-red-50 text-red-600 border border-red-100
        shadow-sm transition-all
        hover:bg-red-500 hover:text-white
        active:scale-95
      "
    >
      로그아웃
    </button>

  );
}