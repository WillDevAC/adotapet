import React, { useContext, useEffect, useState } from "react"

import styled from "./home.module.scss"

import { CardSpecie } from "@/components/CardSpecie"
import { CardFilterPet } from "@/components/CardFilterPet"
import { useMediaQuery } from "react-responsive"

import { Layout } from "../Layout"
import { api } from "@/services/api"
import { IPet } from "@/interfaces/pets"

import { CardPet } from "@/components/CardPet"
import { DotLoaderOverlay } from "react-spinner-overlay"
import { FilterContext } from "@/contexts/filter"

export const HomePage: React.FC = () => {
  const [LoadingOverlay, setLoadingOverlay] = useState<boolean>(false)
  const [pets, setPets] = useState<IPet[]>([])

  const isMobile = useMediaQuery({ maxWidth: 767 })

  const { selectedOptions } = useContext(FilterContext)

  const getPetList = async () => {
    setLoadingOverlay(true)
    const response = await api.get("/user/profile/pet/feed-non-logged")
    return response
  }

  const getPetListFilter = async () => {
    setLoadingOverlay(true)

    const { specie, size, sex } = selectedOptions

    const response = await api.post("/pet/filter/multiparam/non-logged", {
      specie: specie,
      size: size,
      sex: sex,
    })
    return response
  }

  useEffect(() => {
    console.log(selectedOptions)
  }, [selectedOptions])

  useEffect(() => {
    const isAllPropertiesFilterEmpty = Object.values(selectedOptions).every(
      (val) => val.length === 0,
    )

    if (isAllPropertiesFilterEmpty) {
      getPetList()
        .then((pet_list) => {
          setPets(pet_list.data)
        })
        .finally(() => {
          setLoadingOverlay(false)
        })
    } else {
      getPetListFilter()
        .then((pet_list) => {
          setPets(pet_list.data)
        })
        .finally(() => {
          setLoadingOverlay(false)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptions])

  return (
    <Layout>
      <section className={styled.specieList}>
        <CardSpecie icon="all" title="Mostrar todos" id={0} />
        <CardSpecie icon="dog" title="Cachorros" id={1} />
        <CardSpecie icon="cat" title="Gatos" id={2} />
      </section>
      <section className={styled.MainWrapper}>
        {!isMobile && (
          <div className={styled.Filters}>
            <CardFilterPet title="Porte" type="Port" />
            <CardFilterPet title="Sexo" type="Sex" />
          </div>
        )}
        <main className={styled.MainContent}>
          {pets.length <= 0 && !LoadingOverlay ? (
            <span>Ooops... Nenhum animal encontrado.</span>
          ) : (
            <>
              {pets.map((pet) => (
                <CardPet
                  profilePicture={pet.profilePicture}
                  key={pet.id}
                  id={pet.id}
                  ong={pet.ong.name}
                  pet={pet.name}
                  sex={pet.sex}
                />
              ))}
            </>
          )}
        </main>
      </section>
      <DotLoaderOverlay loading={LoadingOverlay} color="#ec5161" />
    </Layout>
  )
}
