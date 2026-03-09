export const login = async (email:string,password:string) => {

  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`,{
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

  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({email,password})
  });

  return res.json();
};