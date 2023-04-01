import { Controller, useForm } from "react-hook-form"

type StepTwoProps = {
  control: any
  errors: any
}

import styled from "@/templates/ProfileVerification/profile-verification.module.scss"

export const Step2 = ({ control }: StepTwoProps) => {
  return (
    <>
      <div className={styled.groupInput}>
        <div className={styled.input}>
          <span>Profissão: </span>
          <Controller
            name="profissao"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <input
                type="text"
                id="profissao"
                placeholder="Profissão"
                {...field}
              />
            )}
          />
        </div>
      </div>
      <div className={styled.GroupThreeInputs}>
        <div className={styled.input}>
          <span>Faixa de renda: </span>
          <Controller
            name="faixa_renda"
            control={control}
            rules={{ required: true }}
            defaultValue="1500"
            render={({ field }) => (
              <select className={styled.select} id="faixa_renda" {...field}>
                <option value="1500">Entre 0 a 1500 mil</option>
                <option value="5000">Entre 2000 a 5000 mil</option>
                <option value="6000">+5000 mil</option>
              </select>
            )}
          />
        </div>
        <div className={styled.input}>
          <span>Tipo de residência: </span>
          <Controller
            name="tipo_residencia"
            control={control}
            rules={{ required: true }}
            defaultValue="propria"
            render={({ field }) => (
              <select className={styled.select} id="tipo_residencia" {...field}>
                <option value="propria">Própria</option>
                <option value="alugada">Alugada</option>
              </select>
            )}
          />
        </div>
      </div>
    </>
  )
}
