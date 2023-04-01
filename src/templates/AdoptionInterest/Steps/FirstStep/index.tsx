import { useContext } from "react"
import { textContent, userAgreementText } from "./assets"

import styled from "./first-step.module.scss"
import steps from "../steps.module.scss"
import { AdoptionContext } from "@/contexts/adoption-interest"

export const FirstStep = () => {
  const { setCurrentStep, userAgreement, setUserAgreement } =
    useContext(AdoptionContext)

  return (
    <div className={styled.adoption__form__container}>
      <h1>Formulário de interesse em adoção</h1>
      <div className={styled.adoption__form__content}>
        {textContent.map((slug) => {
          return <p key={slug}>{slug}</p>
        })}
      </div>
      <div className={styled.adoption__user__agreement}>
        <input
          onChange={() => setUserAgreement(!userAgreement)}
          checked={userAgreement}
          type="checkbox"
        />
        <p>{userAgreementText}</p>
      </div>
      <button
        onClick={() => setCurrentStep("secondStep")}
        disabled={!userAgreement}
        className={steps.default__button}
        type="button"
      >
        Continuar
      </button>
    </div>
  )
}
