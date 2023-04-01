import React, { createContext, useState } from "react"

import { FilterContextType, IFilter } from "@/interfaces/filters"
import { Size } from "@/interfaces/categories"

interface FilterProviderProps {
  children?: React.ReactNode
}

const initialFilter: IFilter = {
  specie: [],
  size: [],
  sex: [],
}

export const FilterContext = createContext({} as FilterContextType)

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [selectedOptions, setSelectedOptions] = useState<IFilter>(initialFilter)

  const handleChangeFilterCheckbox = (value: string | Size) => {
    const { size, sex } = selectedOptions

    if (typeof value === "string") {
      const updatedSex = sex.includes(value)
        ? sex.filter((item) => item !== value)
        : [...sex, value]
      setSelectedOptions({ ...selectedOptions, sex: updatedSex })
    } else {
      const sizeIndex = size.findIndex((item) => item.id === value.id)
      const updatedSize =
        sizeIndex !== -1
          ? [...size.slice(0, sizeIndex), ...size.slice(sizeIndex + 1)]
          : [...size, { id: value.id }]
      setSelectedOptions({ ...selectedOptions, size: updatedSize })
    }
  }

  const handleChangeFilterCard = (cardName: string, id: number) => {
    const { specie } = selectedOptions

    if (id === 0) {
      setSelectedOptions({
        ...selectedOptions,
        specie: [],
      })
    } else {
      const specieIndex = specie.findIndex((item) => item.id === id)
      if (specie.length === 0 || specieIndex === -1) {
        setSelectedOptions({ ...selectedOptions, specie: [{ id }] })
      } else {
        setSelectedOptions({ ...selectedOptions, specie: [] })
      }
    }
  }

  return (
    <FilterContext.Provider
      value={{
        selectedOptions,
        setSelectedOptions,
        handleChangeFilterCheckbox,
        handleChangeFilterCard,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}
