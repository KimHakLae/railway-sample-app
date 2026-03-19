import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { getUserFromToken } from "../utils/auth";
import LogoutForm from "../components/auth/LogoutForm";
import Container from "../components/ui/Container";
import { APP_VERSION } from "../utils/version";
import VersionHistory from "../components/common/VersionHistory";
import BottomNav from "../components/common/BottomNav";
import { ThemeToggle } from "../components/common/ThemeToggle";

export default function Layout() {
  const user = getUserFromToken();
  const navigate = useNavigate();
  const location = useLocation();
  const [showHistory, setShowHistory] = useState(false);

  const navItems = [
    { label: "식재료 관리", path: "/inventory", icon: "🍱" },
    { label: "식재료 종류", path: "/items", icon: "📑" },
    { label: "레시피 관리", path: "/recipes", icon: "📖" },
    { label: "내 노트", path: "/notes", icon: "📝" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] dark:bg-slate-900 transition-colors duration-300">
      {/* 🔹 상단 헤더 (Modern & Sticky) */}
      <header
        className="sticky top-0 w-full h-16
                   bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl
                   border-b border-gray-100 dark:border-slate-800
                   flex items-center z-50 transition-all duration-300 shadow-sm"
      >
        <Container className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => (location.pathname === '/user' ? null : navigate(-1))}
              className={`w-10 h-10 flex items-center justify-center
                        rounded-2xl bg-gray-50 dark:bg-slate-800 text-gray-400 
                        hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-slate-700 dark:hover:text-brand-400
                        transition-all active:scale-90 shadow-sm ${location.pathname === '/user' ? 'opacity-0 cursor-default' : ''}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
              </svg>
            </button>

            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => navigate("/user")}
                className={`
                  px-4 py-2 rounded-xl text-sm font-black transition-all duration-300
                  ${location.pathname === "/user" 
                    ? "bg-brand-50 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 shadow-sm shadow-brand-100 dark:shadow-none" 
                    : "text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800"}
                `}
              >
                🏠 홈
              </button>
              {user?.is_admin && (
                <button
                  onClick={() => navigate("/admin")}
                  className={`
                    px-4 py-2 rounded-xl text-sm font-black transition-all duration-300
                    ${location.pathname.startsWith("/admin") 
                      ? "bg-red-50 dark:bg-red-900/40 text-red-700 dark:text-red-300 shadow-sm shadow-red-100 dark:shadow-none" 
                      : "text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-slate-800"}
                  `}
                >
                  🛠 관리
                </button>
              )}
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`
                    px-4 py-2 rounded-xl text-sm font-black transition-all duration-300
                    ${location.pathname === item.path 
                      ? "bg-brand-50 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 shadow-sm shadow-brand-100 dark:shadow-none" 
                      : "text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800"}
                  `}
                >
                  <span className="mr-2 text-xs opacity-70">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>

            {user?.is_admin && (
              <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-800/50 text-[10px] font-black text-red-500 dark:text-red-400 tracking-wider uppercase">
                Admin Mode
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LogoutForm />
          </div>
        </Container>
      </header>

      {/* 🔽 본문 - 하단 모바일 바에 가리지 않게 pb-32 추가 */}
      <main className="flex-1 pb-32 md:pb-12">
        <Container className="py-8">
          <Outlet />
        </Container>
      </main>

      {/* 모바일 하단 네비게이션 */}
      <BottomNav />

      {/* 🏷️ 푸터 (모바일에서도 보이도록 위치 조정) */}
      <footer className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 py-4 md:py-8 mb-20 md:mb-0 transition-colors">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-gray-400 dark:text-gray-500 text-[10px] md:text-sm order-2 sm:order-1">
            © 2026 Railway Cooking App
          </div>
          
          <button 
            onClick={() => setShowHistory(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors group order-1 sm:order-2"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] md:text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white">
              App Version: <span className="text-brand-600 dark:text-brand-400 font-bold">{APP_VERSION}</span>
            </span>
          </button>
        </Container>
      </footer>

      {showHistory && <VersionHistory onClose={() => setShowHistory(false)} />}
    </div>
  );
}