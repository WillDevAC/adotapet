import { CardPet } from "@/components/CardPet";
import { ITag } from "@/interfaces/tags";
import { api } from "@/services/api";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { DotLoaderOverlay } from "react-spinner-overlay";
import { Layout } from "../Layout";

import styled from "./lost-page.module.scss";

export const LostPage: React.FC = () => {
  const router = useRouter();

  const [pet, setPet] = useState<ITag[]>([]);
  const [loading, setLoading] = useState(false);

  const getPetList = async () => {
    setLoading(true);
    const response = await api.get("/pet/feed/lost");
    return response;
  };

  useEffect(() => {
    getPetList()
      .then((response) => {
        setPet(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <div className={styled.lostBreadcrumb}>
        <b onClick={() => router.replace("/")}>Início</b> {">"} animais_perdidos
      </div>
      <div className={styled.Title}>
        <h1>Lista de perdidos</h1>
      </div>
      <div className={styled.not}>
              {pet.length <= 0 && <span>Nenhum animal perdido foi encontrado.</span>}
      </div>
      <div className={styled.Main}>
        {pet.map((pet) => (
          <CardPet
            id={pet.id}
            ong={pet.owner.name}
            pet={pet.name}
            profilePicture={pet.profilePicture}
            sex={pet.sex}
            key={pet.id}
            variant='lost'
          />
        ))}
      </div>
      <DotLoaderOverlay loading={loading} color="#ec5161" />
    </Layout>
  );
};
