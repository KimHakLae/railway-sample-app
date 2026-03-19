import LoginForm from "../components/auth/LoginForm";
import Card from "../components/ui/Card";
import Container from "../components/ui/Container";
import { ThemeToggle } from "../components/common/ThemeToggle";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-slate-900 py-12 transition-colors duration-300 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <Container className="max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-500 text-white shadow-xl shadow-brand-100 dark:shadow-none mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Z"/></svg>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white mb-2">
            Railway 요리 비서
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">식재료 관리와 레시피 노트를 스마트하게</p>
        </div>

        <Card className="p-8">
          <LoginForm />

          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-800 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              계정이 없으신가요?
              <a
                href="/register"
                className="ml-2 font-bold text-brand-600 hover:text-brand-700 transition-colors"
              >
                회원가입 하기
              </a>
            </p>
          </div>
        </Card>
      </Container>
    </div>
  );
}