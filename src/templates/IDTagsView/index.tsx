import React, { useEffect } from "react"

import { IPet } from "@/interfaces/pets"
import { QRCode } from "react-qrcode-logo"
import { Layout } from "../Layout"

import styled from "./id-tag-view.module.scss"
import { useRouter } from "next/router"
import Image from "next/image"

interface IPetPage {
  data: IPet
}

export const IDTagsViewPage: React.FC<IPetPage> = ({ data }) => {
  useEffect(() => {
    console.log(data.profilePicture)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const stringFormated = `https://prod-nine.vercel.app/id-tags/view/${data.id}`;
  const TOKEN_IMAGE = "https://adota-pet-production.up.railway.app"

  const router = useRouter()

  return (
    <Layout>
      <div className={styled.container}>
        <div className={styled.cart}>
          <div className={styled.header}>
            <div className={styled.header__content}>
              <div className={styled.picture}>
                {!data.profilePicture ? (
                  <img src="/icons/avatar.svg" alt="Logo" />
                ) : (
                  <>
                    <Image src={`${TOKEN_IMAGE}/pet/image/${data.profilePicture}`} alt="Logo" height={300} width={300} />
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={styled.header__body}>
            <div className={styled.info}>
              <b>Responsável do animal: </b>
              <span>{data.ong.name}</span>
            </div>
            <div className={styled.info}>
              <b>Nome do animal: </b>
              <span>{data.name}</span>
            </div>
            <div className={styled.info}>
              <b>Sexo: </b>
              <span>{data.sex}</span>
            </div>
            <div className={styled.info}>
              <b>Peso: </b>
              <span>{data.weight} kg</span>
            </div>
            <div className={styled.info}>
              <b>Status: </b>
              {data.lost ? <span>PERDIDO</span> : <span>REGISTRADO</span>}
            </div>
          </div>
          <div className={styled.actions}>
            <button onClick={() => router.push(`tel:+55${data.ong.phone}`)}>
              Falar com responsável
            </button>
          </div>
          <div className={styled.qr__code}>
            <QRCode
              value={stringFormated}
              logoImage="/icons/logo-mobile.svg"
              qrStyle="dots"
              removeQrCodeBehindLogo={true}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}
