import React from "react"

import styled from "./my-account.module.scss"

import { MyAccountLayout } from "@/components/MyAccountLayout"
import { BoxAccountDetails } from "@/components/BoxAccountDetails"
import { CardAccountNotVerified } from "@/components/CardAccountNotVerified"

import { Layout } from "@/templates/Layout"

export const MyAccountPage: React.FC = () => {
  return (
    <Layout>
      <MyAccountLayout
        title="Minha conta"
        path_name="minha conta"
        active="/my-account"
      >
        <div className={styled.profileWrapper}>
          <BoxAccountDetails />
          <CardAccountNotVerified />
        </div>
      </MyAccountLayout>
    </Layout>
  )
}
