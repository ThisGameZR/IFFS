import React from "react";
import { useRouter } from "next/router";
import Layout from "layouts/project/Layout";
import Head from "next/head";
import { fetchGetProjects } from "fetch/project";
import { useUser } from "context/UserProvider";
import { useQuery } from "react-query";
import ContainerProvider from "context/ContainerProvider";
import Analytic from "components/project/Analytic";
import Document from "components/project/Document";

export default function index() {
  const router = useRouter();
  const { id } = router.query;
  const { currentUser } = useUser();
  const { data: projects } = useQuery("projects", () => fetchGetProjects(currentUser?.id!), {
    enabled: !!currentUser,
    useErrorBoundary: true,
  });
  const project = projects?.find((project) => project.id === id);
  const { document, page } = router.query;
  const currentDocument = project?.documents?.find((doc) => doc.id === document);
  const currentPage = currentDocument?.pages?.find((p) => p.id === page);
  return (
    <>
      <Head>
        {currentDocument && currentPage ? (
          <title>{project?.name + " - " + currentDocument?.name + " - " + currentPage?.name}</title>
        ) : (
          <title>{project?.name}</title>
        )}
      </Head>
      <ContainerProvider>
        <Layout project={project!}>
          <Document />
          <Analytic />
        </Layout>
      </ContainerProvider>
    </>
  );
}

import { getSession } from "next-auth/react";

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
