type Params = [string, RequestInit?]

const BASE_URL = '/api/inflet'

export default async function fetcher<JSON = unknown>([input, init]: Params): Promise<JSON> {
  const res = await fetch(BASE_URL + input, {
    ...init,
    headers: {
      ...init?.headers,
      Authentication: sessionStorage.getItem('token') || localStorage.getItem('token') || '',
    },
  })

  // 如果状态码不在 200-299 的范围内，
  // 我们仍然尝试解析并抛出它。
  if (!res.ok) {
    const error= new Error('An error occurred while fetching the data.')
    const info = { code: res.status, reason: '' }
    try {
      const resJSON = await res.json()
      console.log({resJSON})
      info.code = resJSON?.code || 500
      info.reason = resJSON?.message || '系统繁忙，请稍后再试'
    } catch (e) {
      console.log({e})
    }
    // 将额外的信息附加到错误对象上。最终会被 catch 语句捕获
    throw {
      name: error.name,
      message: error.message,
      stack: error.stack,
      info,
      status: res.status,
    } as API.Err
  }

  const { data } = await res.json()

  return data
}
