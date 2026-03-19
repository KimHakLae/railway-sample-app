const API_URL = import.meta.env.VITE_API_URL || ""

export const login = async (email:string,password:string) => {

  const res = await fetch(`${API_URL}/api/auth/login`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({email,password})
  });

  if(!res.ok){
    const data = await res.json()
    throw new Error(data.message || "로그인 실패");
  }

  return res.json();
};

export const register = async (email:string,password:string) => {

  const res = await fetch(`${API_URL}/api/auth/register`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({email,password})
  });

  const data = await res.json()

  if (!res.ok) {
    // 400: 이미 존재, 500: 서버 에러 등 처리
    throw new Error(data.message || "회원가입 실패")
  }

  return data
};