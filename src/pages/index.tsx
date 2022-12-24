import { useCallback, useEffect, useMemo } from "react";
import { useAtom } from "jotai";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import UserDetailsAtom from "../atoms/UserDetailsAtom";
import type UserData from "../models/UserData";
import { getServerAuthSession } from "../server/common/get-server-auth-session";
import { prisma } from "../server/db/client";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/LoadingSpinner";
import WeightDataScreen from "../components/WeightDataList";
import AddWeightButton from "../components/AddWeightButton";
import { Line, ResponsiveLine } from "@nivo/line";

import type { Weight, WeightType } from "../models/WeightData";
import { lerpRange } from "../lib/util/lerp";
import WeightChart from "../components/WeightChart";

interface Props {
  userData: UserData;
}

const Home = ({ userData }: Props) => {
  const { isLoading, data, error } = useQuery(["weights"], () =>
    fetch("/api/weights").then((res) => res.json())
  );
  const [_, setUserData] = useAtom(UserDetailsAtom);

  useEffect(() => {
    setUserData(userData);
  }, []);

  const getNoDataScreen = useCallback(() => {
    if (isLoading) {
      return <LoadingSpinner />;
    } else if (error) {
      return <div>ERROR: {JSON.stringify(error)}</div>;
    }
  }, [isLoading, error]);

  return (
    <>
      <Head>
        <title>Weight Tracker</title>
        <meta name="description" content="Weight Tracking App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex h-full flex-col">
        {data && <WeightChart data={data} />}

        <AddWeightButton />

        <div className="flex grow items-center justify-center">
          {!data ? getNoDataScreen() : <WeightDataScreen data={data} />}
        </div>
      </main>
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
        avatarUrl: userData?.avatar_url,
      },
    },
  };
};

export default Home;
