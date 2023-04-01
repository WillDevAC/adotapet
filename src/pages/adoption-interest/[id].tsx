import React from "react"

import { AdoptionProvider } from "@/contexts/adoption-interest"
import { AdoptionInterestPage } from "@/templates/AdoptionInterest"
import { parseCookies } from "nookies"
import { GetServerSideProps } from "next"
import withTokenExpirationCheck from "@/utils/TokenExpirationCheck"

const AdoptionInterest = () => {
  return (
    <AdoptionProvider>
      <AdoptionInterestPage />
    </AdoptionProvider>
  )
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

export default withTokenExpirationCheck(AdoptionInterest);
