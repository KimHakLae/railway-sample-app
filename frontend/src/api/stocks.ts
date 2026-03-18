const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`
})

/** 식재료 재고 목록 조회 */
export const getStocks = async () => {
  const res = await fetch(`${API_URL}/api/ingredients/stocks`, {
    headers: authHeader()
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || "식재료 재고 조회 실패")
  return data
}

/** 식재료 재고 등록 */
export const createStock = async (body: any) => {
  const res = await fetch(`${API_URL}/api/ingredients/stocks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader()
    },
    body: JSON.stringify(body)
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || "식재료 재고 등록 실패")
  return data
}

/** 식재료 재고 수정 */
export const updateStock = async (id: number, body: any) => {
  const res = await fetch(`${API_URL}/api/ingredients/stocks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader()
    },
    body: JSON.stringify(body)
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || "식재료 재고 수정 실패")
  return data
}

/** 식재료 재고 삭제 */
export const deleteStock = async (id: number) => {
  const res = await fetch(`${API_URL}/api/ingredients/stocks/${id}`, {
    method: "DELETE",
    headers: authHeader()
  })

  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.message || "식재료 재고 삭제 실패")
  }
}

/** 긴급 상태 토글 */
export const toggleUrgentStock = async (id: number) => {
  const res = await fetch(`${API_URL}/api/ingredients/stocks/${id}/urgent`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...authHeader()
    }
  })

  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.message || "긴급 상태 변경 실패")
  }
}
