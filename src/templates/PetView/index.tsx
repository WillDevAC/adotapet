import React, { useEffect, useState } from "react"
import { Layout } from "../Layout"

import styled from "./pet-view.module.scss"

import dynamic from "next/dynamic"

import {
  Calendar,
  GenderNeuter,
  IdentificationCard,
  Info,
  MapPin,
  ShareNetwork,
  Syringe,
} from "phosphor-react"
import { useRouter } from "next/router"
import { IPet } from "@/interfaces/pets"
import Image from "next/image"
import { IImage } from "@/interfaces/images"
import { getLocalStorage } from "@/functions/useStorage"
import Swal from "sweetalert2"
import { api } from "@/services/api"
import { IVacines } from "@/interfaces/vacines"

const ReactViewer = dynamic(() => import("react-viewer"), { ssr: false })

interface IPetPage {
  data: IPet
}

export const PetPage: React.FC<IPetPage> = ({ data }) => {
  const [visible, setVisible] = useState(false)
  const [pet, setPet] = useState({} as IPet)
  const [images, setImages] = useState<IImage[]>([]);
  const [vacines, setVacines] = useState<IVacines[]>([]); // [Vacine]

  const router = useRouter()


  const getVacinesPet = async () => {
    const response = await api.get(`/pet/${data.id}/vaccine`);
    return response;
  }

  useEffect(() => {
    setPet(data);
    setImages(data.images);
    getVacinesPet().then((vacines) => {
      setVacines(vacines.data)
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const TOKEN_IMAGE = "https://adota-pet-production.up.railway.app"

  const handleShareCopy = () => {
    navigator.clipboard
      .writeText(`https://prod-nine.vercel.app${router.asPath}`)
      .then(() => {
        Swal.fire("Sucesso!", "Link copiado com sucesso.", "success")
      })
  }

  const handleAdoption = () => {
    const user = getLocalStorage("next-auth-user")

    if (user && user.verified) {
      router.push(`/adoption-interest/${data.id}`)
      return
    }

    if (!user) {
      Swal.fire("Ooops...", "Você precisa estar logado!", "question")
      return
    }

    if (user && !user.verified) {
      Swal.fire({
        title: "Ooops...",
        text: "Você precisa verificar sua conta",
        icon: "info",
        confirmButtonText: "Verificar agora",
      }).then(() => {
        router.replace('/profile/verification')
      })
      return
    }
  }

  return (
    <Layout>
      <div className={styled.breadcrumbs}>
        <b onClick={() => router.replace("/")}>Início</b> {">"} visualizar-pet{" "}
        {">"} {data.name}
      </div>
      <div className={styled.grid}>
        <div className={styled.leftGrid}>
          <div className={styled.imageSlider} onClick={() => setVisible(true)}>
            <Image
              src={`${TOKEN_IMAGE}/pet/image/${pet.profilePicture}`}
              height={500}
              width={500}
              alt="Slider Photo"
              blurDataURL={"/icons/blur.jpg"}
              placeholder="blur"
            />
          </div>
          <div className={styled.imagesSlider}>
            {images.map((image) => (
              <div
                key={image.id}
                className={styled.images}
                onClick={() => setVisible(true)}
              >
                <Image
                  src={`${TOKEN_IMAGE}/pet/image-gallery/${image.path}`}
                  alt="Slider photo"
                  height={500}
                  width={500}
                  blurDataURL={"/icons/blur.jpg"}
                  placeholder="blur"
                />
              </div>
            ))}
          </div>
        </div>
        <div className={styled.rightGrid}>
          <div className={styled.title}>
            <div className={styled.title__description}>
              <h1>{data.name}</h1>
              <span>
                {data.specie.specieName} | {data.size.sizeName} | Disponivel
              </span>
            </div>
            <div className={styled.title__buttons}>
              <button onClick={() => handleShareCopy()}>
                <ShareNetwork size={17} />
                Compartilhar
              </button>
            </div>
          </div>
          <div className={styled.description}>
            <div className={styled.group}>
              <IdentificationCard size={25} />
              Anunciante: <span>{data.ong.name}</span>
            </div>
            <div className={styled.group}>
              <Calendar size={25} />
              Publicado em: <span>{data.createdAt}</span>
            </div>
            <div className={styled.group}>
              <MapPin size={25} />
              Localização: <span>RIO BRANCO, ACRE</span>
            </div>
          </div>
          <h3>Sobre o animal</h3>
          <div className={styled.description}>
            <div className={styled.group}>
              <Syringe size={25} />
              Vacinação:
              { vacines.map((vacine) => (
                <a href={`https://adota-pet-production.up.railway.app/pet/file-vaccine/${vacine.path}`} target={"__BLANK"}>[Visualizar]</a>
              )) }
            </div>
            <div className={styled.group}>
              <Info size={25} />
              Peso: <span>{data.weight}kg</span>
            </div>
            <div className={styled.group}>
              <GenderNeuter size={25} />
              Sexo: <span>{data.sex}</span>
            </div>
          </div>
          <div className={styled.actions}>
            <button onClick={() => handleAdoption()}>Adotar</button>
            <button onClick={() => router.push(`tel:+55${data.ong.phone}`)}>
              Fale com a ONG
            </button>
          </div>
        </div>
      </div>
      <ReactViewer
        visible={visible}
        onClose={() => setVisible(false)}
        images={images.map((image) => ({
          src: `${TOKEN_IMAGE}/pet/image-gallery/${image.path}`,
          alt: "",
        }))}
      />
    </Layout>
  )
}
