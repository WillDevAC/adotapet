import styled from "./adoption-pending.module.scss"
import step from "../AdoptionInterest/Steps/steps.module.scss"
import { textContent } from "./assets"
import { Layout } from "../Layout"
import Link from "next/link"

export const AdoptionPendingPage = () => {
  return (
    <Layout>
      <div className={styled.container}>
        <h1>
          Sua solicitação foi enviada! Pode ficar tranquilo que agora é com a
          ONG.
        </h1>
        <div className={styled.text__container}>
          {textContent.map((text) => {
            return <p key={text}>{text}</p>
          })}
        </div>
        <Link href={"/profile/my-adoptions"}>
          <button className={step.default__button}>Minhas adoções</button>
        </Link>
      </div>
    </Layout>
  )
}
