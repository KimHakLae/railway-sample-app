import LoginForm from "../components/auth/LoginForm";
import Card from "../components/ui/Card";
import Container from "../components/ui/Container";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] py-12">
      <Container className="max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-500 text-white shadow-xl shadow-brand-100 mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-2">
            Railway Inventory
          </h1>
          <p className="text-gray-500">Smart inventory & notes for your workspace</p>
        </div>

        <Card className="p-8">
          <LoginForm />

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-sm">
              Don't have an account?
              <a
                href="/register"
                className="ml-2 font-semibold text-brand-600 hover:text-brand-700 transition-colors"
              >
                Create Account
              </a>
            </p>
          </div>
        </Card>
      </Container>
    </div>
  );
}