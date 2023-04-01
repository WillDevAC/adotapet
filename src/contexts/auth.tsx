import React, { createContext } from "react"
import { api } from "../services/api"
import { useRouter } from "next/router"
import { notify } from "@/functions/useToast"
import { removeLocalStorage, setLocalStorage } from "@/functions/useStorage"
import { removeCookie, setCookie } from "@/functions/useCookies"
import Swal from "sweetalert2"

interface AuthContextData {
  Login: (username: string, password: string) => Promise<void>
  Register: (
    name: string,
    email: string,
    password: string,
    setOpenModalLogin: Function,
    closeDropdown: Function,
    setLoadingOverlay: Function,
  ) => Promise<void>
  Logout: () => Promise<void>
}

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter()

  const Login = async (username: string, password: string) => {
    try {
      const response = await api.post("/api/auth/signin", {
        username,
        password,
      })

      if (response.data.role === "ROLE_ADMIN") {
        notify("error", "Acesso negado.")
        return
      } else {
        setCookie("next-auth-token", response.data.accessToken, 3600)
        setLocalStorage("next-auth-user", response.data.user)
        router.reload()
      }
    } catch (error) {
      notify("error", "Credenciais inválidas.")
    }
  }

  const Register = async (
    name: string,
    email: string,
    password: string,
    setOpenModalLogin: Function,
    closeDropdown: Function,
    setLoadingOverlay: Function,
  ) => {
    try {
      const response = await api.post("/config/user/register", {
        name,
        email,
        password,
      })

      if (response.status !== 200 && response.status !== 201) {
        notify("error", "Falha ao registrar usuário")
        return
      } else {
        setOpenModalLogin(false)
        closeDropdown(false)
        Swal.fire({
          title: "Sucesso!",
          text: "Cadastro realizado com sucesso!",
          icon: "success",
          confirmButtonText: "Continuar",
        }).then(() => {
          setLoadingOverlay(true)
          Login(email, password).then(() => {
            setLoadingOverlay(false)
          })
        })
      }
    } catch (error) {
      notify("error", "falha ao registrar usuário.")
    }
  }

  const Logout = async () => {
    removeCookie("next-auth-token")
    removeLocalStorage("next-auth-user")
    router.reload()
  }

  return (
    <AuthContext.Provider value={{ Login, Register, Logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
