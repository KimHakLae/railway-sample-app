import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getUserFromToken } from "../utils/auth";
import LogoutForm from "../components/LogoutForm";
import Container from "../components/ui/Container";
import { APP_VERSION } from "../utils/version";
import VersionHistory from "../components/VersionHistory";

export default function Layout() {
  const user = getUserFromToken();
  const navigate = useNavigate();
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      {/* 🔝 고정 상단바 (Glassmorphism 적용) */}
      <header
        className="fixed top-0 left-0 right-0 h-14
                   bg-white/80 backdrop-blur-md border-b border-gray-100
                   flex items-center z-50 transition-all"
      >
        <Container className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center
                        rounded-xl hover:bg-gray-100 transition-colors
                        text-gray-500 hover:text-black"
              aria-label="뒤로 가기"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>

            {user?.is_admin && (
              <span className="px-2 py-1 bg-red-50 text-red-600 text-[10px] font-bold rounded-md ring-1 ring-red-200 uppercase tracking-wider">
                Admin Mode
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
             <LogoutForm />
          </div>
        </Container>
      </header>

      {/* 🔽 본문 (푸터를 위해 flex-1 사용) */}
      <main className="flex-1 pt-14 pb-12">
        <Container className="py-8">
          <Outlet />
        </Container>
      </main>

      {/* 🏷️ 푸터 (버전 정보 표시) */}
      <footer className="bg-white border-t border-gray-100 py-6">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-gray-400 text-sm">
            © 2026 Railway Inventory System
          </div>
          
          <button 
            onClick={() => setShowHistory(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm font-medium text-gray-500 group-hover:text-black">
              App Version: <span className="text-brand-600 font-bold">{APP_VERSION}</span>
            </span>
          </button>
        </Container>
      </footer>

      {/* 버전 연혁 모달 */}
      {showHistory && <VersionHistory onClose={() => setShowHistory(false)} />}
    </div>
  );
}