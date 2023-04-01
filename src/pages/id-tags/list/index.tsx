import { IDTagsListPage } from "@/templates/IDTagsList"
import withTokenExpirationCheck from "@/utils/TokenExpirationCheck"
import { GetServerSideProps } from "next"
import { parseCookies } from "nookies"

import React from "react"

const IDTagsList: React.FC = () => {
  return <IDTagsListPage />
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

export default withTokenExpirationCheck(IDTagsList)
