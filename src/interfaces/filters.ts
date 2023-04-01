import { Size } from "@/interfaces/categories"
import { Dispatch, SetStateAction } from "react"

export interface IFilterProps {
  id: number
}

export interface IFilter {
  specie: IFilterProps[]
  size: IFilterProps[]
  sex: string[]
}

export interface FilterContextType {
  selectedOptions: IFilter
  setSelectedOptions: Dispatch<SetStateAction<IFilter>>
  handleChangeFilterCheckbox: (value: string | Size) => void
  handleChangeFilterCard: (cardName: string, id: number) => void
}
