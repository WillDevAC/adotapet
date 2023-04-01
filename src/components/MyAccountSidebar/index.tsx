import React, { useContext } from "react"

import styled from "./sidebar.module.scss"

import {
  Gauge,
  Lifebuoy,
  PawPrint,
  QrCode,
  UserCircleGear,
} from "phosphor-react"
import { useRouter } from "next/router"
import Swal from "sweetalert2"
import { AuthContext } from "@/contexts/auth"

interface IMyAccountSiderProps {
  active: "/my-account" | "/my-adoptions" | "/my-tags" | "/profile-data"
}

export const MyAccountSidebar: React.FC<IMyAccountSiderProps> = ({
  active = "",
}) => {
  const router = useRouter();

  const { Logout } = useContext(AuthContext);

  const HandleLogout = () => {
    Swal.fire({
      title: 'Deseja realmente sair?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Sim, desconectar',
    }).then((result) => {
      if (result.isConfirmed) {
        Logout();
      }
    })
  }

  const handleCentral = () => {
    Swal.fire({
      title: 'Central de ajuda',
      text: 'Atendimento das 6 às 18h, de segunda a sexta-feira. no telefone: (68) 996041893',
      showDenyButton: false,
      showCancelButton: false,
      confirmButtonText: 'Ok',
    })
  }

  return (
    <>
      <div className={styled.MyAccountSidebarWrapper}>
        <div className={styled.myAccountSidebar}>
          <ul className={styled.MyAccountSidebarLinks}>
            <li
              id={active === "/my-account" ? styled.active : styled.normal}
              onClick={() => router.replace("/profile/my-account")}
            >
              <Gauge size={20} />
              Resumo
            </li>
            <li
              id={active === "/my-adoptions" ? styled.active : styled.normal}
              onClick={() => router.replace("/profile/my-adoptions")}
            >
              <PawPrint size={20} />
              Adoções
            </li>
            <li
              id={active === "/my-tags" ? styled.active : styled.normal}
              onClick={() => router.replace("/id-tags/list")}
            >
              <QrCode size={20} />
              ID Tags
            </li>
            <p id={styled.close} onClick={() => HandleLogout()}>Desconectar</p>
          </ul>
        </div>
        <div className={styled.myAccountSidebarSupport} onClick={() => handleCentral()}>
          <Lifebuoy size={25} color="#666"/>
          Central de ajuda
        </div>
      </div>
    </>
  )
}
