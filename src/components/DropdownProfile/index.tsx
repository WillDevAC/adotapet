import React, { useContext, useState } from "react";

import styled from "./dropdown.module.scss";

import { SignOut } from "phosphor-react";
import { ModalLogin } from "../ModalLogin";
import { getLocalStorage } from "@/functions/useStorage";
import { useRouter } from "next/router";

import { AuthContext } from "@/contexts/auth";
import { getCookiesClient } from "@/functions/useCookies";

import Img from "next/image";
import Swal from "sweetalert2";

interface IDropdownProfileProps {
  closeDropdown: Function;
  LoadingOverlay: boolean;
  setLoadingOverlay: Function;
}

export const DropdownProfile: React.FC<IDropdownProfileProps> = ({
  closeDropdown,
  LoadingOverlay,
  setLoadingOverlay,
}) => {
  const [modalLogin, setOpenModalLogin] = useState(false);

  const token = getCookiesClient("next-auth-token");
  const user = getLocalStorage("next-auth-user");

  const router = useRouter();

  const { Logout } = useContext(AuthContext);

  const HandleLogout = () => {
    Swal.fire({
      title: "Deseja realmente sair?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Sim, desconectar",
    }).then((result) => {
      if (result.isConfirmed) {
        Logout();
      }
    });
  };

  return (
    <div className={styled.dropdown}>
      {token ? (
        <div className={styled.dropdown__logged}>
          <div
            className={styled.dropdown__logged__user}
            onClick={() => router.push("/profile/my-account")}
          >
            <Img
              src="/icons/avatar.svg"
              alt="Avatar"
              width={64}
              height={64}
              priority
            />
            <div className={styled.dropdown__logged__info}>
              <span>Olá, {user.name?.split(" ")[0] ?? "N/A"}!</span>
              <p>VER MINHA CONTA</p>
            </div>
          </div>
          <ul className={styled.dropdown__list}>
            <li
              className={styled.line}
              onClick={() => router.push("/profile/my-adoptions")}
            >
              Minhas Adoções
            </li>
            <li onClick={() => router.push("/id-tags/list")}>ID Tags</li>
            <li onClick={() => HandleLogout()}>
              <SignOut size={20} />
              Desconectar
            </li>
          </ul>
        </div>
      ) : (
        <ul className={styled.dropdown__list}>
          <li onClick={() => setOpenModalLogin(true)}>Login</li>
          <li>Politica de privacidade</li>
        </ul>
      )}
      {modalLogin && (
        <ModalLogin
          setOpenModalLogin={setOpenModalLogin}
          closeDropdown={closeDropdown}
          LoadingOverlay={LoadingOverlay}
          setLoadingOverlay={setLoadingOverlay}
        />
      )}
    </div>
  );
};
