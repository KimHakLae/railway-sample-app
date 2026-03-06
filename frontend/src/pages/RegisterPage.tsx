import { useState } from "react";
import { register } from "../api/auth";

export default function RegisterPage(){

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const handleSubmit = async (e:React.FormEvent)=>{

    e.preventDefault();

    await register(email,password);

    alert("회원가입 성공!");

    window.location.href="/";

  };

  return(

    <div className="flex h-screen items-center justify-center bg-gray-100">

      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">

        <h1 className="text-2xl font-bold text-center mb-6">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            className="w-full border rounded p-2"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full border rounded p-2"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Register
          </button>

        </form>

      </div>

    </div>

  );

}