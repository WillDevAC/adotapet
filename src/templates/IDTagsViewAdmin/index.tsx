import React, { ChangeEvent, useRef, useState } from "react";

import { IPet } from "@/interfaces/pets";
import { QRCode } from "react-qrcode-logo";
import { Layout } from "../Layout";

import styled from "./id-tag-view.module.scss";
import { useRouter } from "next/router";
import { useReactToPrint } from "react-to-print";
import { api } from "@/services/api";
import Swal from "sweetalert2";
import { DotLoaderOverlay } from "react-spinner-overlay";
import Image from "next/image";
import { getCookiesClient } from "@/functions/useCookies";

interface IPetPage {
  data: IPet;
}

export const IDTagsViewPageAdmin: React.FC<IPetPage> = ({ data }) => {
  const componentRef = useRef();
  const stringFormated = `https://prod-nine.vercel.app/id-tags/view/${data.id}`;
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const TOKEN_IMAGE = "https://adota-pet-production.up.railway.app";

  const router = useRouter();

  const { id } = router.query;

  const handlePrint = useReactToPrint({
    //@ts-ignore
    content: () => componentRef.current,
  });

  const handleClick = async () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true);
      const response = await api.post(
        `/pet/${id}/profile-image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          title: "Sucesso!",
          text: "Foto do animal atualizada!",
          icon: "success",
          confirmButtonText: "Continuar",
        }).then(() => {
          setIsUploading(false);
          router.reload();
        });
      }

      console.log(response.data);
    } catch (error) {
      setIsUploading(false);
      console.error(error);
    }
  };

  const token = getCookiesClient("next-auth-token");

  const changeStatus = async () => {
    setIsUploading(true)
    try {
      const response = await api.post(
        `/user/profile/pet-registered/${data.id}/make-lost`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

        Swal.fire({
          title: "Sucesso!",
          text: "Status do animal atualizado!",
          icon: "success",
          confirmButtonText: "Continuar",
        }).then(() => {
          router.reload();
        });
    } catch (error) {
      Swal.fire({
        title: "Erro!",
        text: "Erro ao atualizar status do animal!",
        icon: "error",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Layout>
      {/* @ts-ignore */}
      <div className={styled.container} ref={componentRef}>
        <div className={styled.cart}>
          <div className={styled.header}>
            <div className={styled.header__content}>
              <div className={styled.picture} onClick={handleClick}>
                {!data.profilePicture ? (
                  <img src="/icons/avatar.svg" alt="Logo" />
                ) : (
                  <>
                    <Image
                      src={`${TOKEN_IMAGE}/pet/image/${data.profilePicture}`}
                      alt="Logo"
                      height={300}
                      width={300}
                    />
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  style={{ display: "none" }}
                />
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
            <div className={styled.actions__buttons}>
              <button onClick={handlePrint}>Imprimir TAG</button>
              {!data.lost && (
                <button id={styled.lost} onClick={() => changeStatus()}>
                  Marcar como perdido
                </button>
              )}
              {data.lost && (
                <button id={styled.registered} onClick={() => changeStatus()}>
                  Marcar como registrado
                </button>
              )}
            </div>
            <span onClick={() => router.replace("/id-tags/list")}>Voltar</span>
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
      <DotLoaderOverlay loading={isUploading} color="#ec5161" />
    </Layout>
  );
};
