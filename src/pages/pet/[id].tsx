import React from "react"
import { PetPage } from "@/templates/PetView"
import { InferGetServerSidePropsType } from "next"

export async function getServerSideProps(context: any) {
  const id = context.params.id

  const response = await fetch(
    `https://adota-pet-production.up.railway.app/pet/${id}/non-logged`,
  )
  const responseData = await response.json()

  return {
    props: {
      responseData,
    },
  }
}

type IPet = InferGetServerSidePropsType<typeof getServerSideProps>

const Pet = ({ responseData }: IPet) => {
  return <PetPage data={responseData} />
}

export default Pet
