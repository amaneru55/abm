import React from 'react'
import { SWRConfig } from "swr";
import fetcher from "@utils/fetcher.ts";
import toast from "react-hot-toast";
import * as EPaths from '@shared/enums/paths'

const SWRProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const handleErr = ({ info, status }: API.Err, id: string) => {
    if (!info || !status) return

    if (status === 404) {
      toast.error('未连接到服务器', { id })
      return
    }

    if (status === 504) {
      toast.error('网络连接超时', { id })
      return
    }

    if (status === 401) {
      if (window.top === window.self) {
        if (location.pathname === '/' + EPaths.Primary.LOGIN) {
          toast.error('登录已过期，请重新登录', { id })
          return
        }
        localStorage.removeItem('token')
        const msg = info?.reason || '登录已过期，请重新登录'
        const searchParams = new URLSearchParams({ msg, type: 'error' })
        window.location.replace('/' + EPaths.Primary.LOGIN + '?' + searchParams.toString())
        return
      } else {
        postMessage({ type: 'error', msg: info?.reason || '登录已过期，请重新登录' }, '*')
      }
    }

    toast.error(info?.reason || '系统错误，请稍后再试', { id })
  }

  return (
    <SWRConfig
      value={{
        fetcher,
        onError: handleErr,
        onErrorRetry: (error: API.Err, _, __, revalidate, { retryCount }) => {
          // 400, 401 404 500 时不重试。
          if ([400, 401, 404, 500].includes(error.status)) {
            return
          }

          // 最多重试 10 次。
          if (retryCount > 1) return

          // 5秒后重试。
          setTimeout(() => revalidate({ retryCount: retryCount }), 5000)
        }
      }}
    >
      {children}
    </SWRConfig>
  )
}

export default SWRProvider
