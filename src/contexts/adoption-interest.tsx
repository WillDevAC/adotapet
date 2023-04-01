import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react"

export type ISteps = "firstStep" | "secondStep" | "thirdStep" | "fourthStep"

interface IAdoptionContext {
  userAgreement: boolean
  setUserAgreement: Dispatch<SetStateAction<boolean>>
  currentStep: ISteps
  setCurrentStep: Dispatch<SetStateAction<ISteps>>
}

interface Children {
  children: ReactNode
}

export const AdoptionContext = createContext({} as IAdoptionContext)

export const AdoptionProvider = ({ children }: Children) => {
  const [currentStep, setCurrentStep] = useState<ISteps>("firstStep")
  const [userAgreement, setUserAgreement] = useState(false)

  return (
    <AdoptionContext.Provider
      value={{ currentStep, setCurrentStep, userAgreement, setUserAgreement }}
    >
      {children}
    </AdoptionContext.Provider>
  )
}
