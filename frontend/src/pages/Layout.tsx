import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { getUserFromToken } from "../utils/auth";
import LogoutForm from "../components/auth/LogoutForm";
import Container from "../components/ui/Container";
import { APP_VERSION } from "../utils/version";
import VersionHistory from "../components/common/VersionHistory";

export default function Layout() {
  const user = getUserFromToken();
  const navigate = useNavigate();
  const location = useLocation();
  const [showHistory, setShowHistory] = useState(false);

  const navItems = [
    { label: "식재료 관리", path: "/inventory", icon: "🍱" },
    { label: "식재료 종류", path: "/items", icon: "📑" },
    { label: "내 노트", path: "/notes", icon: "📝" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      {/* 🔹 상단 헤더 (Modern & Sticky) */}
      <header
        className="sticky top-0 w-full h-16
                   bg-white/80 backdrop-blur-xl
                   border-b border-gray-100
                   flex items-center z-50 transition-all duration-300 shadow-sm"
      >
        <Container className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center
                        rounded-2xl bg-gray-50 text-gray-400
                        hover:bg-brand-50 hover:text-brand-600
                        transition-all active:scale-90 shadow-sm"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
              </svg>
            </button>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`
                    px-4 py-2 rounded-xl text-sm font-black transition-all duration-300
                    ${location.pathname === item.path 
                      ? "bg-brand-50 text-brand-700 shadow-sm shadow-brand-100" 
                      : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"}
                  `}
                >
                  <span className="mr-2 text-xs opacity-70">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>

            {user?.is_admin && (
              <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-red-50 border border-red-100 text-[10px] font-black text-red-500 tracking-wider uppercase">
                Admin Mode
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <LogoutForm />
          </div>
        </Container>
      </header>

      {/* 🔽 본문 */}
      <main className="flex-1 pb-12">
        <Container className="py-8">
          <Outlet />
        </Container>
      </main>

      {/* 🏷️ 푸터 */}
      <footer className="bg-white border-t border-gray-100 py-6">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-gray-400 text-sm">
            © 2026 Railway Cooking App
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

      {showHistory && <VersionHistory onClose={() => setShowHistory(false)} />}
    </div>
  );
}