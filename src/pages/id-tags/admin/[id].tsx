import React from "react";
import { InferGetServerSidePropsType } from "next";
import { IDTagsViewPageAdmin } from "@/templates/IDTagsViewAdmin";
import withTokenExpirationCheck from "@/utils/TokenExpirationCheck";
import { parseCookies } from "nookies";

export async function getServerSideProps(context: any) {
  const id = context.params.id;
  const cookies = parseCookies(context);

  if (!cookies["ADOTAPET_PRODUCTION_next-auth-token"]) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const response = await fetch(
    `https://adota-pet-production.up.railway.app/pet/${id}/non-logged`
  );
  const responseData = await response.json();

  return {
    props: {
      responseData,
    },
  };
}

type ITag = InferGetServerSidePropsType<typeof getServerSideProps>;

const IDTagsViewerAdmin = ({ responseData }: ITag) => {
  return <IDTagsViewPageAdmin data={responseData} />;
};

export default withTokenExpirationCheck(IDTagsViewerAdmin);
