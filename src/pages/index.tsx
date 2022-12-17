import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { getServerAuthSession } from "../server/common/get-server-auth-session";
import { prisma } from "../server/db/client";

interface Props {
  userData: any;
}

const Home = ({ userData }: Props) => {
  return (
    <>
      <Head>
        <title>Weight Tracker</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>LA</main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerAuthSession({ req, res });

  if (!session?.user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const userData = await prisma.users.findFirst({
    where: {
      id: session.user?.id,
    },
  });

  return {
    props: {
      userData: {
        id: userData?.id,
        firstName: userData?.first_name,
        lastName: userData?.last_name,
        email: userData?.email,
        sex: userData?.sex,
        dob: userData?.dob?.toUTCString(),
      },
    },
  };
};

export default Home;