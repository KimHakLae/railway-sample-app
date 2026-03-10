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

/** 재고 목록 조회 */
export const getInventories = async () => {
  const res = await fetch(`${API_URL}/inventory`,{
    headers: authHeader()
  })

  const data = await res.json()
  if(!res.ok) throw new Error(data.message || "재고 조회 실패")
  return data
}

/** 재고 등록 */
export const createInventory = async (body:any) => {
  const res = await fetch(`${API_URL}/inventory`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      ...authHeader()
    },
    body: JSON.stringify(body)
  })

  const data = await res.json()
  if(!res.ok) throw new Error(data.message || "재고 등록 실패")
  return data
}

/** 재고 수정 */
export const updateInventory = async (id:number, body:any) => {
  const res = await fetch(`${API_URL}/inventory/${id}`,{
    method:"PUT",   // ✅ 수정은 PUT
    headers:{
      "Content-Type":"application/json",
      ...authHeader()
    },
    body: JSON.stringify(body)
  })

  const data = await res.json()
  if(!res.ok) throw new Error(data.message || "재고 수정 실패")
  return data
}

/** 재고 삭제 */
export const deleteInventory = async (id:number) => {
  const res = await fetch(`${API_URL}/inventory/${id}`,{
    method:"DELETE",
    headers: authHeader()
  })

  if(!res.ok){
    const data = await res.json()
    throw new Error(data.message || "재고 삭제 실패")
  }
}

/** 긴급 토글 */
export const toggleUrgentInventory = async (id:number) => {
  const res = await fetch(`${API_URL}/inventory/${id}/urgent`,{
    method:"PATCH",
    headers:{
      "Content-Type":"application/json",
      ...authHeader()
    }
  })

  if(!res.ok){
    const data = await res.json()
    throw new Error(data.message || "긴급 변경 실패")
  }
}