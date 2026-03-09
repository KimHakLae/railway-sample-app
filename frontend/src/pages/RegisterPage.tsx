import RegisterForm from "../components/RegisterForm";

export default function RegisterPage(){
  return(

    <div className="flex h-screen items-center justify-center bg-gray-100">

      <div className="w-screen max-w-md bg-white p-8 rounded-xl shadow">

        <h1 className="!text-3xl font-bold text-center mb-6">
          Register
        </h1>

        <RegisterForm />

        <p className="text-center mt-4 text-sm">
          Already have an account?
          <a
            href="/"
            className="text-blue-500 ml-1"
          >
            Login
          </a>
        </p>

      </div>

    </div>

  );

}