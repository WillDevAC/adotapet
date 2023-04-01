import React from "react"

import Img from "next/image"
import styled from "./box-account.module.scss"

import { getLocalStorage } from "@/functions/useStorage"
import { useRouter } from "next/router"

export const BoxAccountDetails: React.FC = () => {
  const user = getLocalStorage("next-auth-user")
  const router = useRouter()

  console.log(user)
  return (
    <>
      <div className={styled.ProfileInfo}>
        <div className={styled.ProfileInfo__details}>
          <Img
            src="/icons/avatar.svg"
            alt="Avatar"
            width={64}
            height={64}
            priority
          />
          <div className={styled.ProfileInfo__more}>
            <h3>Olá, {user?.name?.split(" ")[0] ?? "N/A"}! </h3>
            <span>Seja bem vindo(a) a sua conta do ADOTAPET!</span>
          </div>
        </div>
        <div className={styled.Profile__actions}>
          {user?.verified === true ? (
            <button onClick={() => router.replace("/")}>
              Ver feed de adoção
            </button>
          ) : (
            <button onClick={() => router.replace("/profile/verification")}>
              Completar perfil
            </button>
          )}
        </div>
      </div>
    </>
  )
}
