const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`
})

/** 모든 식재료 종류 조회 (총 재고량 포함) */
export const getIngredients = async () => {
  const res = await fetch(`${API_URL}/api/ingredients/types`, {
    headers: authHeader()
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.error || data.message || "식재료 종류 조회 실패")
  return data
}

/** 식재료 종류 등록 */
export const createIngredient = async (body: any) => {
  const res = await fetch(`${API_URL}/api/ingredients/types`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader()
    },
    body: JSON.stringify(body)
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.error || data.message || "식재료 종류 등록 실패")
  return data
}

/** 식재료 종류 수정 */
export const updateIngredient = async (id: number, body: any) => {
  const res = await fetch(`${API_URL}/api/ingredients/types/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader()
    },
    body: JSON.stringify(body)
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.error || data.message || "식재료 종류 수정 실패")
  return data
}

/** 식재료 종류 삭제 */
export const deleteIngredient = async (id: number) => {
  const res = await fetch(`${API_URL}/api/ingredients/types/${id}`, {
    method: "DELETE",
    headers: authHeader()
  })

  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || data.message || "식재료 종류 삭제 실패")
  }
}
