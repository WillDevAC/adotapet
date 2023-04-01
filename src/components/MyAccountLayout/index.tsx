import React from "react"

import { useRouter } from "next/router"
import { MyAccountSidebar } from "../MyAccountSidebar"

import styled from "./account.module.scss"

interface IMyAccountLayoutProps {
  children: React.ReactNode
  title: string
  path_name: string
  active: "/my-account" | "/my-adoptions" | "/my-tags" | "/profile-data"
}

export const MyAccountLayout: React.FC<IMyAccountLayoutProps> = ({
  children,
  title,
  path_name,
  active,
}) => {
  const router = useRouter()

  return (
    <>
      <div className={styled.myAccount}>
        <h1>{title}</h1>
        <span>
          <a onClick={() => router.replace("/")}>início</a> {">"} {path_name}
        </span>
      </div>
      <div className={styled.myAccountGrid}>
        <MyAccountSidebar active={active} />
        <div className={styled.myAccountMain}>{children}</div>
      </div>
    </>
  )
}
