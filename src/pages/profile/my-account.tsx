import { MyAccountPage } from "@/templates/MyAccount"
import { GetServerSideProps } from "next"
import { parseCookies } from "nookies"

import withTokenExpirationCheck from "@/utils/TokenExpirationCheck"
import React from "react"

const MyAccount: React.FC = () => {
  return <MyAccountPage />
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

export default withTokenExpirationCheck(MyAccount)
