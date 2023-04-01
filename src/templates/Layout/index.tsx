import React from "react"

import { Header } from "@/components/Header"

import styled from "./layout.module.scss"

interface ILayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className={styled.home}>{children}</main>
    </>
  )
}
