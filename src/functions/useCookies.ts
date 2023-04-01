import { setCookie as setNookie, destroyCookie, parseCookies } from "nookies"

const COOKIES_KEY = "ADOTAPET_PRODUCTION"

export const setCookie = (
  key: string,
  value: string,
  expiration: number,
): void => {
  setNookie(null, `${COOKIES_KEY}_${key}`, value, {
    maxAge: expiration, // tempo de expiração em segundos
    path: "/",
  })
}

export const removeCookie = (key: string): void => {
  destroyCookie(null, `${COOKIES_KEY}_${key}`, {
    path: "/",
  })
}

export const getCookiesClient = (key: string) => {
  const cookies = parseCookies()
  const cookieValue = cookies[`${COOKIES_KEY}_${key}`]

  if (cookieValue) {
    return cookieValue
  } else {
    return undefined
  }
}
