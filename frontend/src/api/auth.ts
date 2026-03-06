export const login = async (email:string,password:string) => {

  const res = await fetch("http://localhost:3000/auth/login",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({email,password})
  });

  if(!res.ok){
    throw new Error("login failed");
  }

  return res.json();
};

export const register = async (email:string,password:string) => {

  const res = await fetch("http://localhost:3000/auth/register",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({email,password})
  });

  return res.json();
};