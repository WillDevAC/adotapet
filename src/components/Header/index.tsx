import React, { useState, useEffect, useRef } from "react"
import styled from "./header.module.scss"

import NextImage from "next/image"

import { useMediaQuery } from "react-responsive"
import { DropdownProfile } from "../DropdownProfile"
import { List, QrCode } from "phosphor-react"

import { ReaderQRCode } from "@/components/QRCodeReader"
import { useRouter } from "next/router"

export const Header: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const [openDropdown, closeDropdown] = useState(false)
  const [QRCodeReader, setQRCodeReader] = useState(false)
  const [loadingOverlay, setLoadingOverlay] = useState(false)

  const router = useRouter()

  return (
    <>
      <div className={styled.header}>
        <NextImage
          src={isMobile ? "/icons/logo-mobile.svg" : "/icons/logo-desktop.svg"}
          width={140}
          height={40}
          alt="Logo"
          onClick={() => router.replace("/")}
        />

        <nav className={styled.Links}>
          <div
            className={styled.Links__Item}
            onClick={() => closeDropdown(!openDropdown)}
          >
            <List size={20} />
          </div>
          <div className={styled.Links__Item}>
            <QrCode size={20} onClick={() => setQRCodeReader(true)} />
          </div>
          <div className={styled.Links__Button}>
            <button onClick={() => router.push('/pet/losts')}>Perdidos</button>
          </div>
        </nav>
      </div>
      {openDropdown && (
        <div>
          <DropdownProfile
            closeDropdown={closeDropdown}
            LoadingOverlay={loadingOverlay}
            setLoadingOverlay={setLoadingOverlay}
          />
        </div>
      )}
      {QRCodeReader && <ReaderQRCode setQRCodeReader={setQRCodeReader} />}
    </>
  )
}
