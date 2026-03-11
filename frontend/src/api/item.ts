const API_URL = import.meta.env.VITE_API_URL

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`
})

/** 재고 항목 조회 */
export const getItems = async () => {
  const res = await fetch(`${API_URL}/item`,{
    headers: authHeader()
  })

  const data = await res.json()
  if(!res.ok) throw new Error(data.message || "재고 항목 조회 실패")
  return data
}

/** 재고 항목 등록 */
export const createItem = async (body:any) => {
  const res = await fetch(`${API_URL}/inventory`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      ...authHeader()
    },
    body: JSON.stringify(body)
  })

  const data = await res.json()
  if(!res.ok) throw new Error(data.message || "재고 항목 등록 실패")
  return data
}