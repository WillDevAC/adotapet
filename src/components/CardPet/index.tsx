import Image from "next/image";
import { useRouter } from "next/router";
import { GenderFemale, GenderMale, GenderNeuter } from "phosphor-react";
import React, { useState } from "react";
import { RotatingLines } from "react-loader-spinner";

import styled from "./card-pet.module.scss";

interface ICardPet {
  id: string | number;
  ong: string;
  profilePicture: string;
  pet: string;
  sex: string;
  variant?: string;
}

export const CardPet: React.FC<ICardPet> = ({
  ong,
  profilePicture,
  pet,
  sex,
  id,
  variant,
}) => {
  const TOKEN_IMAGE = "https://adota-pet-production.up.railway.app";
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleViewAdoption = () => {
    setLoading(true);
    router.push(`/pet/${id}`);
  };

  return (
    <>
      <div className={styled.card}>
        <div className={styled.card__Image}>
          <Image
            src={`${TOKEN_IMAGE}/pet/image/${profilePicture}`}
            width={180}
            height={180}
            alt="sem foto definida"
            loading="lazy"
            blurDataURL={"/icons/blur.jpg"}
            placeholder="blur"
          />
        </div>
        <div className={styled.card__body}>
          <div className={styled.card__details}>
            <span>{ong}</span>
            <h1>{pet}</h1>
            <span>
              RIO BRANCO, AC
              <span>
                {sex === "Macho" && (
                  <GenderFemale size={20} color="#17479e" alt="Fêmea" />
                )}
                {sex === "Fêmea" && (
                  <GenderMale size={20} color="#f7b1b6" alt="Macho" />
                )}
                {sex === "Indefinido" && (
                  <GenderNeuter size={20} alt="Sexo indefinido" />
                )}
              </span>
            </span>
          </div>
          <div className={styled.card__actions}>
            {variant !== "lost" ? (
              <button onClick={() => handleViewAdoption()} disabled={loading}>
                {loading ? (
                  <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    width="13"
                  />
                ) : (
                  "Adotar"
                )}
              </button>
            ): (
              <button onClick={() => router.push(`/id-tags/view/${id}`)}>Detalhes</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
