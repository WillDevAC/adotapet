import React from "react"

import { CodesandboxLogo } from "phosphor-react"
import { useRouter } from "next/router"

import styled from "../CardAccountNotVerified/account-notverified.module.scss"

export const CardIDTagInformation: React.FC = () => {
  const router = useRouter()

  return (
    <>
      <div className={styled.NotVerifiedCard}>
        <div className={styled.NotVerifiedCardHeader}>
          <span>ID Tags</span>
          <p>NOVIDADE</p>
        </div>
        <div className={styled.NotVerifiedConfiability}>
          <CodesandboxLogo size={50} />
          <span>
            Com os{" "}
            <b onClick={() => router.replace("/id-tags/list")}>ID Tags,</b> você
            nunca mais vai precisar se preocupar com a saidinha do seu pet
          </span>
        </div>
      </div>
    </>
  )
}
