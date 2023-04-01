import React from "react"

import { UserFocus } from "phosphor-react"
import { getLocalStorage } from "@/functions/useStorage"
import { useRouter } from "next/router"

import styled from "./account-notverified.module.scss"
import { CardIDTagInformation } from "../CardIdTagsInformation"

export const CardAccountNotVerified: React.FC = () => {
  const user = getLocalStorage("next-auth-user")
  const router = useRouter()

  return (
    <>
      <div className={styled.AccountNotVerified}>
        <div className={styled.NotVerifiedCard}>
          <div className={styled.NotVerifiedCardHeader}>
            <span>Complete seu perfil</span>
            {user?.verified ? <p>100% completo.</p> : <p>50% completo.</p>}
          </div>
          <div className={styled.NotVerifiedConfiability}>
            <UserFocus size={50} />
            {user?.verified ? (
              <span>
                Agora sua conta está verificada. você pode adotar e aproveitar
                os beneficios da nossa plataforma.
              </span>
            ) : (
              <span>
                Preencha seus{" "}
                <b onClick={() => router.replace("/profile/verification")}>
                  dados pessoais,
                </b>{" "}
                assim você ganhará maior confiabilidade dentro da plataforma!
              </span>
            )}
          </div>
        </div>
        <CardIDTagInformation />
      </div>
    </>
  )
}
