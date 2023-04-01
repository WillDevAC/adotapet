import React, { useEffect, useState } from "react";

import styled from "./my-adoptions.module.scss";

import { MyAccountLayout } from "@/components/MyAccountLayout";
import { Layout } from "../Layout";
import { CardAdoption } from "@/components/CardAdoption";
import { getCookiesClient } from "@/functions/useCookies";
import { api } from "@/services/api";
import { IIdoption } from "@/interfaces/adoption";
import { DotLoaderOverlay } from "react-spinner-overlay";

export const MyAdoptionsPage: React.FC = () => {
  const token = getCookiesClient("next-auth-token");
  const [adoptions, setAdoptions] = useState<IIdoption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAdoptionsList = async () => {
    setIsLoading(true);
    const response = await api.get("/adoption/list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  };

  useEffect(() => {
    if (token) {
      getAdoptionsList()
        .then((listAdoptions) => {
          setAdoptions(listAdoptions.data);
        })
        .finally(() => {
          setIsLoading(false);
          console.log(adoptions)
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <MyAccountLayout
        title="Minhas adoções"
        path_name="minhas adoções"
        active="/my-adoptions"
      >
        <div className={styled.MyAdoptionsContainer}>
          {adoptions.length === 0 && (
            <span>Você ainda não possui nenhuma adoção...</span>
          )}
          {adoptions.map((adoption) => (
            <CardAdoption
              id={adoption.petAdopted.id}
              namePet={adoption.petAdopted.name}
              createdAt={adoption.createdAt}
              nameOng={adoption.petAdopted.user.name}
              sex={adoption.petAdopted.sex}
              reason={adoption.reason}
              //@ts-ignore
              status={adoption.reqStatus}
            />
          ))}
        </div>
        <DotLoaderOverlay loading={isLoading} color="#ec5161" />
      </MyAccountLayout>
    </Layout>
  );
};
