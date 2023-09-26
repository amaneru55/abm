import toast from "react-hot-toast";
import * as EPaths from '@shared/enums/paths'

const BASE_URL = '/api/inflet'
export default async function apiFetcher<JSON = unknown>(input: RequestInfo, init?: RequestInit): Promise<JSON | undefined> {
  try {
    const _input = typeof input === 'string' ? BASE_URL + input : input
    const res = await fetch(_input, {
      ...init,
      headers: {
        ...(init?.headers || {}),
        Authentication: sessionStorage.getItem('token') || localStorage.getItem('token') || '',
      }
    })
    if (!res.ok) {
      const info = { code: res.status, reason: '系统繁忙，请稍后再试' }
      console.log(res)
      try {
        const resJSON = await res.json()
        info.reason = resJSON?.message || '系统繁忙，请稍后再试'
      } catch (e) {
        console.log({ e })
      }
      if (res.status === 401) {
        localStorage.removeItem('token')
        if (location.pathname !== `/${EPaths.Primary.LOGIN}`) {
          location.href = `/${EPaths.Primary.LOGIN}?type=error&message=${info.reason}`
        } else {
          toast.error(info.reason)
        }
        return
      }
      toast.error(info.reason)
      return undefined
    }

    const { data } = await res.json()
    return data
  } catch (e) {
    console.error(e)
    return undefined
  }
}
