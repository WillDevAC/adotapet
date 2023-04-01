import React from "react"
import { InferGetServerSidePropsType } from "next"
import { PetPageAdmin } from "@/templates/PetViewAdmin"

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
  return <PetPageAdmin data={responseData} />
}

export default Pet
