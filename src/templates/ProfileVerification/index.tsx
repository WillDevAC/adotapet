import { Coins, IdentificationCard, PawPrint } from "phosphor-react"

import LoadingBar from "react-top-loading-bar"

import { api } from "@/services/api"
import { cpf } from "cpf-cnpj-validator"
import { setLocalStorage } from "@/functions/useStorage"
import { getCookiesClient } from "@/functions/useCookies"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Layout } from "../Layout"
import { useRouter } from "next/router"

import { Step1 } from "@/components/AccountStepsVerification/step1"
import { Step2 } from "@/components/AccountStepsVerification/step2"
import { Step3 } from "@/components/AccountStepsVerification/step3"

import styled from "./profile-verification.module.scss"
import Swal from "sweetalert2"

import dynamic from "next/dynamic"

const DotLoaderOverlay = dynamic(
  () =>
    import("react-spinner-overlay").then((module) => module.DotLoaderOverlay),
  { ssr: false },
)

interface FormData {
  cpf: string
  endereco: string
  telefone: string
  profissao: string
  nascimento: string
  faixa_renda: string
  tipo_residencia: string
  tempo_livre: string
  animal_casa: string
  crianca_casa: string
}

const StepsTitle = (step: number) => {
  return (
    <div className={styled.Informations}>
      {step == 1 && (
        <>
          <h1>Complete seu perfil</h1>
          <span>
            Preencha com atenção, uma vez verificado você não terá a
            possibilidade de edição.
          </span>
        </>
      )}
      {step == 2 && (
        <>
          <h1>Faixa de renda</h1>
          <span>
            Esse dado é importante para garantir uma melhor recomendação para
            você.
          </span>
        </>
      )}
      {step == 3 && (
        <>
          <h1>Falta pouco!</h1>
          <span>
            Preencha com atenção, em alguns casos pode ser necessário que a ONG
            entre em contato.
          </span>
        </>
      )}
    </div>
  )
}

const StepsBox = (step: number, setStep: Function) => {
  return (
    <div className={styled.StepsWrapper}>
      <div
        className={styled.StepsBox}
        id={step === 1 ? styled.active : styled.normal}
        title="Dados pessoais"
      >
        <IdentificationCard size={30} />
      </div>
      <div
        className={styled.StepsBox}
        id={step === 2 ? styled.active : styled.normal}
        title="Dados de renda"
      >
        <Coins size={30} />
      </div>
      <div
        className={styled.StepsBox}
        id={step === 3 ? styled.active : styled.normal}
        title="Dados de endereço"
      >
        <PawPrint size={30} />
      </div>
    </div>
  )
}

const StepsActions = (
  step: number,
  handleNextStep: Function,
  handlePrevStep: Function,
) => {
  const router = useRouter()

  return (
    <div className={step === 3 ? styled.StepsActions2 : styled.StepsActions}>
      {step === 1 ? (
        <button id={styled.disabled} onClick={() => router.replace("/")}>
          Cancelar
        </button>
      ) : (
        <button onClick={() => handlePrevStep()}>Voltar</button>
      )}
      {step === 3 ? (
        <button type="submit">Finalizar</button>
      ) : (
        <button onClick={() => handleNextStep()}>Próximo</button>
      )}
    </div>
  )
}

export const ProfileVerificationPage = () => {
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(30)
  const [loading, setLoading] = useState<boolean>(false)

  const { control, handleSubmit, formState, getValues } = useForm<FormData>({
    mode: "onChange",
  })

  const router = useRouter()

  const { errors } = formState

  const handleNextStep = () => {
    const values = getValues()

    if (step === 1) {
      if (!values.cpf || !values.telefone || !values.nascimento) {
        Swal.fire("Ooops...", "Preencha os dados do formulário.", "question")
        return
      } else {
        if (
          values.cpf.replace(/\D/g, "").length < 11 ||
          values.telefone.replace(/\D/g, "").length < 11 ||
          values.nascimento.replace(/\D/g, "").length < 8
        ) {
          Swal.fire("Ooops...", "Preencha os dados corretamente.", "question")
        } else {
          let age =
            new Date().getFullYear() - new Date(values.nascimento).getFullYear()

          if (age < 18) {
            Swal.fire(
              "Ooops...",
              "Você precisa ter mais de 18 anos.",
              "question",
            )
            return
          }

          if (!cpf.isValid(values.cpf)) {
            Swal.fire("Ooops...", "CPF inválido.", "question")
            return
          }
          setProgress(progress + 30)
          setStep(step + 1)
        }
      }
    }

    if (step == 2) {
      if (!values.profissao || !values.faixa_renda || !values.tipo_residencia) {
        Swal.fire("Ooops...", "Preencha os dados do formulário.", "question")
        return
      } else {
        setProgress(progress + 30)
        setStep(step + 1)
        return
      }
    }
  }

  const handlePrevStep = () => {
    setProgress(progress - 30)
    setStep(step - 1)
  }

  const onSubmit = async (data: FormData) => {
    const token = getCookiesClient("next-auth-token")

    //passed all validations.
    const {
      cpf,
      endereco,
      telefone,
      profissao,
      nascimento,
      faixa_renda,
      tipo_residencia,
      tempo_livre,
      animal_casa,
      crianca_casa,
    } = data

    if (token) {
      setLoading(true)
      const response = await api
        .put(
          "/user/profile/update",
          {
            cpf: cpf,
            phone: telefone,
            birthDate: nascimento,
            job: profissao,
            income: parseInt(faixa_renda),
            typeResidence: tipo_residencia,
            freeTime: parseInt(tempo_livre),
            childAtHome: Boolean(parseInt(crianca_casa)),
            petAtHome: Boolean(parseInt(animal_casa)),
            fullAddress: endereco,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .finally(() => setLoading(false))

      if (response.status === 200) {
        Swal.fire({
          title: "Sucesso!",
          text: "Conta verificada com sucesso!",
          icon: "success",
          confirmButtonText: "Continuar",
        }).then(() => {
          setLocalStorage("next-auth-user", response.data)
          router.replace("/profile/my-account")
        })
      } else {
        Swal.fire("Ooops...", "Ocorreu um erro ao atualizar o perfil!", "error")
      }
    }
  }
  return (
    <>
      <Layout>
        {!loading && (
          <LoadingBar
            color="#f11946"
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
            height={4}
          />
        )}
        <div className={styled.StepsContainer}>
          {StepsBox(step, setStep)}
          {StepsTitle(step)}

          <form className={styled.Form} onSubmit={handleSubmit(onSubmit)}>
            {step == 1 && <Step1 control={control} errors={errors} />}
            {step == 2 && <Step2 control={control} errors={errors} />}
            {step == 3 && <Step3 control={control} errors={errors} />}
            {step === 3 && StepsActions(step, handleNextStep, handlePrevStep)}
          </form>
          {step !== 3 && StepsActions(step, handleNextStep, handlePrevStep)}
        </div>
        <DotLoaderOverlay loading={loading} color="#ec5161" />
      </Layout>
    </>
  )
}
