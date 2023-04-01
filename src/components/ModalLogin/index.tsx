import React, { useContext, useState } from "react"

import styled from "./modal.module.scss"
import { X } from "phosphor-react"
import { notify } from "@/functions/useToast"
import { AuthContext } from "@/contexts/auth"
import { ThreeDots } from "react-loader-spinner"
import { DotLoaderOverlay } from "react-spinner-overlay"

interface IModalLoginProps {
  setOpenModalLogin: Function
  closeDropdown: Function
  LoadingOverlay: boolean
  setLoadingOverlay: Function
}

enum ModalContent {
  LOGIN = "LOGIN",
  SIGNUP = "SIGNUP",
}

interface IFormLogin {
  [key: string]: string
}

interface IFormRegister {
  [key: string]: string
}

export const ModalLogin: React.FC<IModalLoginProps> = ({
  setOpenModalLogin,
  closeDropdown,
  LoadingOverlay,
  setLoadingOverlay,
}) => {
  const [modalContent, setModalContent] = useState(ModalContent.LOGIN)
  const [loginLoading, setLoginLoading] = useState(false)
  const [registerLoading, setRegisterLoading] = useState(false)

  const [loginData, setLoginData] = useState<IFormLogin>({
    email: "",
    password: "",
  })

  const [registerData, setRegisterData] = useState<IFormRegister>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const { Login, Register } = useContext(AuthContext)

  const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginData({ ...loginData, [name]: value })
  }

  const handleChangeRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRegisterData({ ...registerData, [name]: value })
  }

  const handleFormLoginSubmit = async () => {
    let emptyValuesForm = Object.values(loginData).some((obj) => obj == "")
    let validEmail = loginData["email"]
      .toLocaleLowerCase()
      .match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/i)

    if (emptyValuesForm) {
      notify("error", "Preencha os campos.")
      return
    }

    if (!validEmail) {
      notify("error", "Preencha um email válido.")
      return
    }

    setLoginLoading(true)
    const { email, password } = loginData

    if (email && password) {
      await Login(email, password).finally(() => {
        setLoginLoading(false)
      })
    } else {
      notify("error", "Falha ao fazer login.")
    }
  }

  const handleFormRegisterSubmit = async () => {
    let emptyValuesForm = Object.values(registerData).some((obj) => obj == "")
    let validEmail = registerData["email"]
      .toLocaleLowerCase()
      .match(/[a-z]+@[a-z]+\.com(\.br)*/)

    if (emptyValuesForm) {
      notify("error", "Preencha os campos.")
      return
    }

    if (!validEmail) {
      notify("error", "Preencha um email válido.")
      return
    }

    if (registerData["password"] !== registerData["confirmPassword"]) {
      notify("error", "As senhas não conferem")
      return
    }

    setRegisterLoading(true)

    const { username, email, password } = registerData

    if (username && email && password) {
      await Register(
        username,
        email,
        password,
        setOpenModalLogin,
        closeDropdown,
        setLoadingOverlay,
      ).finally(() => {
        setRegisterLoading(false)
      })
    } else {
      notify("error", "Erro interno.")
    }
  }

  const getTitle = (): string => {
    switch (modalContent) {
      case ModalContent.LOGIN:
        return "Entrar"
      case ModalContent.SIGNUP:
        return "Criar nova conta"
      default:
        return ""
    }
  }

  const getContent = (): React.ReactNode => {
    switch (modalContent) {
      case ModalContent.LOGIN:
        return (
          <>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              onBlur={(e) => handleChangeLogin(e)}
              autoComplete="false"
            />
            <input
              type="password"
              name="password"
              placeholder="Senha"
              onBlur={(e) => handleChangeLogin(e)}
              autoComplete="false"
            />
          </>
        )
      case ModalContent.SIGNUP:
        return (
          <>
            <input
              type="text"
              placeholder="Nome"
              name="username"
              onBlur={(e) => handleChangeRegister(e)}
              autoComplete="false"
            />
            <input
              type="text"
              placeholder="E-mail"
              name="email"
              onBlur={(e) => handleChangeRegister(e)}
              autoComplete="false"
            />
            <div className={styled.modal__form__group}>
              <input
                type="password"
                placeholder="Senha"
                name="password"
                onBlur={(e) => handleChangeRegister(e)}
                autoComplete="false"
              />
              <input
                type="password"
                placeholder="Confirmar senha"
                name="confirmPassword"
                onBlur={(e) => handleChangeRegister(e)}
                autoComplete="false"
              />
            </div>
          </>
        )
      default:
        return null
    }
  }

  const handleSetModalContent = (content: ModalContent) => {
    setModalContent(content)
  }

  return (
    <>
      <div id={styled.modal__container} className={styled.one}>
        <div className={styled.modal__background}>
          <div className={styled.modal}>
            <div className={styled.modal__content}>
              <div className={styled.modal__close}>
                <X
                  size={25}
                  color="#ec5161"
                  onClick={() => setOpenModalLogin(false)}
                />
              </div>
              <div className={styled.modal__title}>
                <h1>{getTitle()}</h1>
              </div>
              <div className={styled.modal__form}>{getContent()}</div>
              <div className={styled.modal__buttons}>
                {modalContent === ModalContent.LOGIN ? (
                  <button
                    onClick={() => handleFormLoginSubmit()}
                    disabled={loginLoading}
                  >
                    {loginLoading ? (
                      <ThreeDots height="40" width="40" color="#FFF" />
                    ) : (
                      "ENTRAR"
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => handleFormRegisterSubmit()}
                    disabled={registerLoading}
                  >
                    {registerLoading ? (
                      <ThreeDots height="40" width="40" color="#FFF" />
                    ) : (
                      "CADASTRAR"
                    )}
                  </button>
                )}
              </div>
              <div className={styled.modal__footer}>
                {modalContent === ModalContent.LOGIN ? (
                  <span
                    onClick={() => handleSetModalContent(ModalContent.SIGNUP)}
                  >
                    não tem uma conta? clique aqui.
                  </span>
                ) : (
                  <span
                    onClick={() => handleSetModalContent(ModalContent.LOGIN)}
                  >
                    já tem uma conta? faça login aqui.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <DotLoaderOverlay loading={LoadingOverlay} color="#ec5161" />
    </>
  )
}
