import React, { useEffect, useRef, useState } from "react"

import { MyAccountLayout } from "@/components/MyAccountLayout"
import { Layout } from "../Layout"
import styled from "./id-tag-list.module.scss"
import useModal from "@/functions/useModal"
import Image from "next/image"
import Modal from "@/components/ModalNewIDTag"

import { Eye, PawPrint, Plus, QrCode, TrashSimple } from "phosphor-react"
import { api } from "@/services/api"
import { getCookiesClient } from "@/functions/useCookies"
import { ITag } from "@/interfaces/tags"
import { DotLoaderOverlay } from "react-spinner-overlay"
import { useRouter } from "next/router"

import Swal from "sweetalert2"
import { QRCode } from "react-qrcode-logo"

interface ITagRegister {
  name: string
  weight: string
  size: string
  sex: string
  description: string
}

export const IDTagsListPage: React.FC = () => {
  const [modalType, setModalType] = useState("true")
  const { isOpen, toggle } = useModal()
  const [tags, setTags] = useState<ITag[]>([])
  const [loading, setLoading] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState("")

  const componentRef = useRef()

  const router = useRouter()

  const token = getCookiesClient("next-auth-token")

  const [tagRegister, setTagRegister] = useState<ITagRegister>({
    name: "",
    weight: "",
    size: "1",
    sex: "Macho",
    description: "",
  })

  const getTags = async () => {
    setLoading(true)
    const response = await api.get("/user/profile/list-registered", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  }

  useEffect(() => {
    getTags()
      .then((tag_list) => {
        setTags(tag_list.data)
      })
      .finally(() => {
        setLoading(false)
        console.log(tags)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChangeTagData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTagRegister({ ...tagRegister, [name]: value })
  }

  const handleSelectTagData = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setTagRegister({ ...tagRegister, [name]: value })
  }

  const handleTextAreaTagData = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTagRegister({ ...tagRegister, [name]: value })
  }

  const modalOpenAdd = () => {
    setModalType("true")
    toggle()
  }

  const deletePet = async (id: string | number) => {
    const response = await api.delete(`/pet/${id}`);
    return response;
  }

  const handleDelete = (id: string | number) => {
    Swal.fire({
      title: 'Deseja realmente excluir?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        deletePet(id).then(() => {
          Swal.fire('excluído com sucesso!', '', 'success')
          getTags()
            .then((response) => {
              setTags(response.data)
            })
            .finally(() => {
              setLoading(false)
            })
        })
      }
    })
  }

  const handleFormSubmit = async () => {
    let emptyValuesForm = Object.values(tagRegister).some((obj) => obj == "")

    if (emptyValuesForm) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Preencha todos os campos!",
      })
      return
    }

    const isNumber = /^\d*\.?\d*$/.test(tagRegister["weight"])

    if (!isNumber) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Preencha um peso válido!",
      })
      return
    }

    if (tagRegister["name"].length < 3) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Preencha um nome válido!",
      })
      return
    }

    if (tagRegister["description"].length < 7) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "A descrição precisa ter no minimo 7 caracteres!",
      })
      return
    }

    setLoading(true);
    try {
      const response = await api.post(
        "/user/profile/register-pet",
        {
          name: tagRegister["name"],
          description: tagRegister["description"],
          size: {
            id: parseInt(tagRegister["size"]),
          },
          sex: tagRegister["sex"],
          weight: parseInt(tagRegister["weight"]),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (response.status === 200 || response.status === 201) {
        toggle()
        getTags()
          .then((response) => {
            setTags(response.data)
          })
          .finally(() => {
            setLoading(false)
            Swal.fire({
              icon: "success",
              title: "Sucesso!",
              text: "ID-Tag cadastrada com sucesso!",
            })
          })
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocorreu um erro ao cadastrar o id-tag!",
      })
    }
  }

  return (
    <>
      <Layout>
        <MyAccountLayout
          title="Meus ID-Tags"
          path_name="Meus ID-Tags"
          active="/my-tags"
        >
          <div className={styled.IDTagsList}>
            {tags.map((tag) => (
              <div key={tag.id} className={styled.IDTagCard}>
                <div className={styled.IDTagImage}>
                  <Image
                    src="/icons/wallpaper.jpg"
                    alt="Pet"
                    width={800}
                    height={800}
                  />
                  <div className={styled.IDTagImageBackground}>
                    <span>
                      <PawPrint size={33} color="#FFF" />
                    </span>
                  </div>
                </div>
                <div className={styled.IDTagBody}>
                  <div className={styled.IDTagDetails}>
                    <span>Nome do animal: </span>
                    <h4>{tag.name}</h4>
                  </div>
                  <div className={styled.IDTagDetailsWithActions}>
                    <div className={styled.details}>
                      <span>Porte: </span>
                      <h4>{tag.size.sizeName}</h4>
                    </div>
                    <div className={styled.actions}>
                      <button
                        title="Excluir"
                        onClick={() => handleDelete(tag.id)}
                      >
                        <TrashSimple size={20} />
                      </button>
                      <button title="Ver detalhes" onClick={() => router.push(`/id-tags/admin/${tag.id}`)}>
                        <Eye size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className={styled.IDTagCardAdd} onClick={() => modalOpenAdd()}>
              <Plus size={25} />
              Criar nova tag
            </div>
          </div>
        </MyAccountLayout>
      </Layout>
      <Modal isOpen={isOpen} toggle={toggle}>
        <div className={styled.content}>
          <div className={styled.content__title}>
            <h2>
              <QrCode size={30} />
              CRIAR NOVA TAG.
            </h2>
            <span>Preencha com atenção os dados abaixo.</span>
          </div>
          <div className={styled.form}>
            <div className={styled.form__group}>
              <label>Nome do animal:</label>
              <input
                type="text"
                name="name"
                onChange={(e) => handleChangeTagData(e)}
              />
            </div>
            <div className={styled.form__group}>
              <label>Peso: </label>
              <input
                type="text"
                name="weight"
                onChange={(e) => handleChangeTagData(e)}
              />
            </div>
            <div className={styled.form__group__two}>
              <div className={styled.two}>
                <label>Porte: </label>
                <select
                  className={styled.select}
                  name="size"
                  onChange={(e) => handleSelectTagData(e)}
                >
                  <option value={1}>Pequeno</option>
                  <option value={2}>Médio</option>
                  <option value={3}>Grande</option>
                </select>
              </div>
              <div className={styled.two}>
                <label>Sexo: </label>
                <select
                  className={styled.select}
                  name="sex"
                  onChange={(e) => handleSelectTagData(e)}
                >
                  <option value="Macho">Macho</option>
                  <option value="Fêmea">Fêmea</option>
                </select>
              </div>
            </div>
            <div className={styled.form__group}>
              <label>Descrição: </label>
              <textarea
                cols={5}
                rows={2}
                className={styled.text__area}
                name="description"
                onChange={(e) => handleTextAreaTagData(e)}
              />
            </div>
            <div className={styled.form__actions}>
              <button onClick={() => handleFormSubmit()}>Registrar</button>
            </div>
          </div>
        </div>
      </Modal>
      <DotLoaderOverlay loading={loading} color="#ec5161" />
      <div style={{ display: "none" }}>
        {/* @ts-ignore */}
        <div ref={componentRef}>
          <QRCode
            value={`${qrCodeUrl}`}
            logoImage="/icons/logo-mobile.svg"
            qrStyle="dots"
            removeQrCodeBehindLogo={true}
          />
        </div>
      </div>
    </>
  )
}
