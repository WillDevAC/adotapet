import React from "react"

import { ProfileVerificationPage } from "@/templates/ProfileVerification"

import { GetServerSideProps, NextPage } from "next"
import withTokenExpirationCheck from "@/utils/TokenExpirationCheck"

import { parseCookies } from "nookies"

const ProfileVerification: NextPage = () => {
  return <ProfileVerificationPage />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context)

  if (!cookies["ADOTAPET_PRODUCTION_next-auth-token"]) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default withTokenExpirationCheck(ProfileVerification)
