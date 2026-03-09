import { useState } from "react";
import { register } from "../api/auth";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage(){

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const handleSubmit = async (e:React.FormEvent)=>{

    e.preventDefault();

    await register(email,password);

    alert("회원가입 요청이 완료되었습니다!\n관리자 승인 후 이용 가능합니다.");

    window.location.href="/";

  };

  return(

    <div className="flex h-screen items-center justify-center bg-gray-100">

      <div className="w-screen max-w-md bg-white p-8 rounded-xl shadow">

        <h1 className="!text-3xl font-bold text-center mb-6">
          Register
        </h1>

        <RegisterForm />

      </div>

    </div>

  );

}