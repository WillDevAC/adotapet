import React from "react"

import styled from "./card-adoption.module.scss"

import { Info, X } from "phosphor-react"
import { useRouter } from "next/router";
import Swal from "sweetalert2";

interface ICardOptionProps {
  id: number | string;
  namePet: string
  sex: string
  nameOng: string
  createdAt: string
  status: "ENVIADO" | "EM ANÁLISE" | "ACEITO" | "NÃO ACEITO"
  reason?: string
}

export const CardAdoption: React.FC<ICardOptionProps> = ({
  namePet,
  sex,
  nameOng,
  createdAt,
  status,
  id,
  reason
}) => {

  const router = useRouter();

  const handleReason = () => {
    Swal.fire({
      icon: 'error',
      title: 'Poxa vida, que pena!',
      text: reason + '.',
    })
  }

  return (
    <div className={styled.MyAdoptionsCard}>
      <div className={styled.AdoptionsDetails}>
        <div className={styled.details}>
          <span>Nome do animal:</span>
          <b>{namePet}</b>
          <span>Sexo:</span>
          <b>{sex}</b>
        </div>
        <div className={styled.adoptionsOngDetails}>
          <div className={styled.detailsOng}>
            <span>Anunciante:</span>
            <b>{nameOng}</b>
            <span>Criado em:</span>
            <b>{createdAt}</b>
          </div>
        </div>
      </div>
      <div className={styled.adoptionsActions}>
        <button onClick={() => router.push(`/pet/admin/${id}?status=${status}`)}>
          <Info size={20}/>
          Mais detalhes
        </button>
        { status === "NÃO ACEITO" && (
          <button onClick={() => handleReason()}>
            Ver motivo
          </button>
        )}
      </div>
      {status === "ENVIADO" && (
        <div className={styled.AdoptionsStatus} id={styled.submitted}>
          Aguardando
        </div>
      )}
      {status === "EM ANÁLISE" && (
        <div className={styled.AdoptionsStatus} id={styled.in_analysis}>
          Em análise
        </div>
      )}
      {status === "ACEITO" && (
        <div className={styled.AdoptionsStatus} id={styled.accepted}>
          Aprovada
        </div>
      )}
      {status === "NÃO ACEITO" && (
        <div className={styled.AdoptionsStatus} id={styled.rejected}>
          Reprovada
        </div>
      )}
    </div>
  )
}
