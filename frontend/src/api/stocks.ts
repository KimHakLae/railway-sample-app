const API_URL_BASE = import.meta.env.VITE_API_URL || ""
const API_URL = `${API_URL_BASE}/api/ingredients/stocks`

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`
})

/** 특정 식재료의 모든 재고 조회 */
export const getStocks = async (ingredientId?: number) => {
  const url = ingredientId ? `${API_URL}?ingredientId=${ingredientId}` : API_URL
  const res = await fetch(url, {
    headers: authHeader()
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || "식재료 재고 조회 실패")
  return data
}

/** 식재료 재고 등록 */
export const createStock = async (body: any) => {
  const res = await fetch(API_URL, {
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
  const res = await fetch(`${API_URL}/${id}`, {
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
  const res = await fetch(`${API_URL}/${id}`, {
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
  const res = await fetch(`${API_URL}/${id}/urgent`, {
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
