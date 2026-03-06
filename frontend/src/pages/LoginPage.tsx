import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">

      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">

        <h1 className="text-2xl font-bold text-center mb-6">
          My Notes
        </h1>

        <LoginForm />

        <p className="text-center mt-4 text-sm">
          Don't have an account?
          <a
            href="/register"
            className="text-blue-500 ml-1"
          >
            Register
          </a>
        </p>

      </div>

    </div>
  );
}