import { Controller } from "react-hook-form"

import InputMask from "react-input-mask"

type StepOneProps = {
  control: any
  errors: any
}

import styled from "@/templates/ProfileVerification/profile-verification.module.scss"

export const Step1 = ({ control, errors }: StepOneProps) => {
  return (
    <>
      <div className={styled.groupInput}>
        <div className={styled.input}>
          <span id="info-icon">CPF: </span>
          <Controller
            name="cpf"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <InputMask
                type="text"
                id="cpf"
                placeholder="CPF"
                mask={"999.999.999-99"}
                {...field}
              />
            )}
          />
        </div>
      </div>
      <div className={styled.GroupThreeInputs}>
        <div className={styled.input}>
          <span>Telefone: </span>
          <Controller
            name="telefone"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <InputMask
                type="text"
                id="telefone"
                placeholder="Telefone"
                mask={"(99) 99999-9999"}
                {...field}
              />
            )}
          />
        </div>
        <div className={styled.input}>
          <span>Data de nascimento: </span>
          <Controller
            name="nascimento"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <input
                type="date"
                id="nascimento"
                placeholder="Data de nascimento"
                {...field}
              />
            )}
          />
        </div>
      </div>
    </>
  )
}
