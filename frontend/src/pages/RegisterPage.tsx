import RegisterForm from "../components/RegisterForm";
import Card from "../components/ui/Card";
import Container from "../components/ui/Container";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] py-12">
      <Container className="max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-500 text-white shadow-xl shadow-brand-100 mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="17" y1="11" x2="23" y2="11"/></svg>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-2">
            Register
          </h1>
          <p className="text-gray-500">Join our community and manage smart</p>
        </div>

        <Card className="p-8">
          <RegisterForm />

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-sm">
              Already have an account?
              <a
                href="/"
                className="ml-2 font-semibold text-brand-600 hover:text-brand-700 transition-colors"
              >
                Sign In
              </a>
            </p>
          </div>
        </Card>
      </Container>
    </div>
  );
}