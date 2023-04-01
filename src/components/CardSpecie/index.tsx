import React, { useContext } from "react"

import styled from "./specie.module.scss"

import { PawPrint, Dog, Cat } from "phosphor-react"
import { FilterContext } from "@/contexts/filter"

interface ICardSpecieProps {
  icon: "all" | "dog" | "cat"
  title: string
  id: number
}

export const CardSpecie: React.FC<ICardSpecieProps> = ({
  icon = "",
  title = "",
  id = 0,
}) => {
  const { handleChangeFilterCard } = useContext(FilterContext)

  return (
    <div
      className={styled.card}
      onClick={() => handleChangeFilterCard(title, id)}
    >
      <div className={styled.card__icon}>
        {icon === "all" && <PawPrint size={25} color="#ec5161" />}
        {icon === "dog" && <Dog size={25} color="#ec5161" />}
        {icon === "cat" && <Cat size={25} color="#ec5161" />}
      </div>
      <div className={styled.card__title}>{title}</div>
    </div>
  )
}
