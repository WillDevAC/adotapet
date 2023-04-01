import jwtDecode from "jwt-decode"

import { useRouter } from "next/router"
import { ComponentType, useEffect } from "react"
import { removeLocalStorage } from "@/functions/useStorage"
import { getCookiesClient, removeCookie } from "@/functions/useCookies"

const withTokenExpirationCheck = (WrappedComponent: ComponentType<any>) => {
  const HOC = (props: any) => {
    const router = useRouter()

    useEffect(() => {
      const token = getCookiesClient("next-auth-token")
      if (token) {
        const decoded = jwtDecode<{ exp: number }>(token)
        const currentTime = Date.now() / 1000

        if (decoded.exp < currentTime) {
          removeCookie("next-auth-token")
          removeLocalStorage("next-auth-user")
          router.reload()
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <WrappedComponent {...props} />
  }

  return HOC
}

export default withTokenExpirationCheck
