import { FilterContext } from "@/contexts/filter"
import React, { useContext } from "react"

import styled from "./card-filter-pet.module.scss"

interface IPetFilter {
  title: string
  type: "Port" | "Sex"
}

export const CardFilterPet: React.FC<IPetFilter> = ({ title, type }) => {
  const { handleChangeFilterCheckbox } = useContext(FilterContext)

  return (
    <div className={styled.CardFilter}>
      <div className={styled.CardFilter__Header}>{title}</div>
      <div className={styled.CardFilter__Body}>
        {type === "Port" && (
          <>
            <div className={styled.CardFilter__Group}>
              <input
                type="checkbox"
                value={1}
                onClick={() =>
                  handleChangeFilterCheckbox({
                    id: 1,
                    sizeName: "Pequeno",
                  })
                }
              />{" "}
              Pequeno
            </div>
            <div className={styled.CardFilter__Group}>
              <input
                type="checkbox"
                value={2}
                onClick={() =>
                  handleChangeFilterCheckbox({
                    id: 2,
                    sizeName: "Médio",
                  })
                }
              />{" "}
              Médio
            </div>
            <div className={styled.CardFilter__Group}>
              <input
                type="checkbox"
                value={3}
                onClick={() =>
                  handleChangeFilterCheckbox({
                    id: 3,
                    sizeName: "Grande",
                  })
                }
              />{" "}
              Grande
            </div>
          </>
        )}
        {type === "Sex" && (
          <>
            <div className={styled.CardFilter__Group}>
              <input
                type="checkbox"
                value={"Macho"}
                onClick={() => handleChangeFilterCheckbox("Macho")}
              />{" "}
              Macho
            </div>
            <div className={styled.CardFilter__Group}>
              <input
                type="checkbox"
                value={"Fêmea"}
                onClick={() => handleChangeFilterCheckbox("Fêmea")}
              />{" "}
              Fêmea
            </div>
            <div className={styled.CardFilter__Group}>
              <input
                type="checkbox"
                value={"Indefinido"}
                onClick={() => handleChangeFilterCheckbox("Indefinido")}
              />{" "}
              Indefinido
            </div>
          </>
        )}
      </div>
    </div>
  )
}
