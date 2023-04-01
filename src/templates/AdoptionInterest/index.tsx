import { AdoptionContext, ISteps } from "@/contexts/adoption-interest"
import { getCookiesClient } from "@/functions/useCookies"
import { api } from "@/services/api"
import * as RadioGroup from "@radix-ui/react-radio-group"
import { useRouter } from "next/router"
import { Cat, House, PawPrint, UsersThree } from "phosphor-react"
import { useContext, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { DotLoaderOverlay } from "react-spinner-overlay"
import Swal from "sweetalert2"
import { Layout } from "../Layout"
import styled from "./adoption-interest.module.scss"

import { FirstStep } from "./Steps/FirstStep"
import { FourthStep } from "./Steps/FourthStep"
import { SecondStep } from "./Steps/SecondStep"
import { ThirdStep } from "./Steps/ThirdStep"

interface IStepSections {
  icon: any
  currentStep: ISteps
}

const stepSections: IStepSections[] = [
  {
    icon: PawPrint,
    currentStep: "firstStep",
  },
  {
    icon: UsersThree,
    currentStep: "secondStep",
  },
  {
    icon: Cat,
    currentStep: "thirdStep",
  },
  {
    icon: House,
    currentStep: "fourthStep",
  },
]

const currentFormStep = {
  firstStep: <FirstStep />,
  secondStep: <SecondStep />,
  thirdStep: <ThirdStep />,
  fourthStep: <FourthStep />,
}

interface IAdoptionInterestForm {
  secondStep: string
  thirdStep: string
  fourthStep: string
}

export const AdoptionInterestPage = () => {
  const { currentStep, setCurrentStep, userAgreement } =
    useContext(AdoptionContext)

  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const token = getCookiesClient("next-auth-token")

  const methods = useForm<IAdoptionInterestForm>({
    defaultValues: {
      secondStep: "SIM",
      thirdStep: "SIM",
      fourthStep: "SIM",
    },
  })

  const will = `/user/profile/pet/${router.query["id"]}/adoption-requests`

  const onSubmit = async (data: IAdoptionInterestForm) => {
    const payload = {
      questionAnswer: [
        {
          question: { id: 1 },
          text: data.secondStep,
        },
        {
          question: { id: 2 },
          text: data.thirdStep,
        },
        {
          question: { id: 3 },
          text: data.fourthStep,
        },
      ],
    }

    setIsLoading(true)

    api
      .post(
        `/user/profile/pet/${router.query["id"]}/adoption-requests`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then(() =>
        Swal.fire({
          icon: "success",
          title: "Sucesso!",
          text: "A solicitação foi feita com sucesso e agora está pendente.",
        }),
      )
      .then(() => router.replace("/adoption-pending"))
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocorreu um erro inesperado ou a solicitação já existe.",
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Layout>
      <section className={styled.adoption__steps}>
        <RadioGroup.Root className={styled.adoption__steps__container}>
          {stepSections.map((section, id) => {
            const Icon = section.icon
            return (
              <RadioGroup.Item
                className={styled.adoption__steps__icon}
                onClick={() => {
                  setCurrentStep(section.currentStep)
                  console.log(section.currentStep)
                }}
                disabled={!userAgreement && currentStep === "firstStep"}
                checked={section.currentStep == currentStep}
                value={section.currentStep}
                key={id}
              >
                <Icon size={32} />
                <div />
              </RadioGroup.Item>
            )
          })}
        </RadioGroup.Root>
      </section>
      <div className={styled.adoption__current__step}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormProvider {...methods}>
            {currentFormStep[currentStep]}
          </FormProvider>
        </form>
      </div>
      <DotLoaderOverlay loading={isLoading} color="#ec5161" />
    </Layout>
  )
}
