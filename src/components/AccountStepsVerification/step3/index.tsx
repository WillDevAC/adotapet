import { Controller, useForm } from "react-hook-form"

type StepTwoProps = {
  control: any
  errors: any
}

import styled from "@/templates/ProfileVerification/profile-verification.module.scss"

export const Step3 = ({ control }: StepTwoProps) => {
  return (
    <>
      <div className={styled.groupInput}>
        <div className={styled.input}>
          <span>Endereço completo: </span>
          <Controller
            name="endereco"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <input
                type="text"
                id="endereco"
                placeholder="Endereço"
                {...field}
              />
            )}
          />
        </div>
      </div>
      <div className={styled.GroupThreeInputs}>
        <div className={styled.input}>
          <span>Quantidade de tempo livre: </span>
          <Controller
            name="tempo_livre"
            control={control}
            rules={{ required: true }}
            defaultValue="1"
            render={({ field }) => (
              <select className={styled.select} id="tempo_livre" {...field}>
                <option value="1">1 hora</option>
                <option value="2">2 horas</option>
                <option value="3">+3 horas</option>
              </select>
            )}
          />
        </div>
        <div className={styled.input}>
          <span>Possui criança em casa? </span>
          <Controller
            name="crianca_casa"
            control={control}
            rules={{ required: true }}
            defaultValue="1"
            render={({ field }) => (
              <select className={styled.select} id="crianca_casa" {...field}>
                <option value="1">Sim</option>
                <option value="0">Não</option>
              </select>
            )}
          />
        </div>
        <div className={styled.input}>
          <span>Possui animal em casa? </span>
          <Controller
            name="animal_casa"
            control={control}
            rules={{ required: true }}
            defaultValue="1"
            render={({ field }) => (
              <select className={styled.select} id="animal_casa" {...field}>
                <option value="1">Sim</option>
                <option value="0">Não</option>
              </select>
            )}
          />
        </div>
      </div>
    </>
  )
}
