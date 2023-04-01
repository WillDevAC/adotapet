import * as RadioGroup from "@radix-ui/react-radio-group"
import steps from "../steps.module.scss"
import styled from "./third-step.module.scss"
import { Check, X } from "phosphor-react"
import { DefaultTooltip } from "@/components/Tooltip"
import { infoContent } from "./assets"
import { useContext } from "react"
import { AdoptionContext } from "@/contexts/adoption-interest"
import { Controller } from "react-hook-form"

export const ThirdStep = () => {
  const { setCurrentStep } = useContext(AdoptionContext)

  return (
    <div className={styled.container}>
      <div className={styled.header__container}>
        <h1>Você está ciente de todos os cuidados que o animal necessita?</h1>
        <DefaultTooltip content={infoContent} />
      </div>
      <Controller
        name="thirdStep"
        render={({ field: { onChange } }) => (
          <RadioGroup.Root
            onValueChange={onChange}
            defaultValue="SIM"
            className={steps.radio__container}
          >
            <RadioGroup.Item
              defaultChecked
              value="SIM"
              className={steps.radio__item}
            >
              <div className={steps.radio__item__tick}>
                <Check size={24} />
              </div>
              Sim
            </RadioGroup.Item>
            <RadioGroup.Item value="NÃO" className={steps.radio__item}>
              <div className={steps.radio__item__tick}>
                <X size={24} />
              </div>
              Não
            </RadioGroup.Item>
          </RadioGroup.Root>
        )}
      />
      <button
        onClick={() => setCurrentStep("fourthStep")}
        className={steps.default__button}
      >
        Continuar
      </button>
    </div>
  )
}
