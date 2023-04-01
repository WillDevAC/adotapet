import React from "react"
import { InferGetServerSidePropsType } from "next"
import { IDTagsViewPage } from "@/templates/IDTagsView"

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

type ITag = InferGetServerSidePropsType<typeof getServerSideProps>

const IDTagsViewer = ({ responseData }: ITag) => {
  return <IDTagsViewPage data={responseData} />
}

export default IDTagsViewer
