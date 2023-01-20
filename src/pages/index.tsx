import { useCallback, useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import UserDetailsAtom from '../stores/UserDetailsAtom';
import type UserData from '../models/UserData';
import { getServerAuthSession } from '../server/common/get-server-auth-session';
import { prisma } from '../server/db/client';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../components/LoadingSpinner';
import WeightDataList from '../components/WeightDataList';
import AddWeightButton from '../components/AddWeight/AddWeightButton';

import WeightChart from '../components/WeightChart';
import AddWeightModal from '../components/AddWeight/AddWeightModal';

interface Props {
  userData: UserData;
}

type CurrentlyVisibleModal = 'addWeight' | null;

const Home = ({ userData }: Props) => {
  const { isLoading, data, error } = useQuery(['weights'], () =>
    fetch('/api/weights').then((res) => res.json())
  );
  const [_, setUserData] = useAtom(UserDetailsAtom);
  const [visibleModal, setVisibleModal] = useState<CurrentlyVisibleModal>(null);

  useEffect(() => {
    setUserData(userData);
  }, []);

  const getNoDataScreen = useCallback(() => {
    if (isLoading) {
      return <LoadingSpinner />;
    } else if (error) {
      return <div>ERROR: {JSON.stringify(error ?? 'An error occurred')}</div>;
    }
  }, [isLoading, error]);

  const onAddWeightClick = () => {
    setVisibleModal('addWeight');
  };

  const onDeleteWeightClick = (value: Date) => {
    console.log(value);
  };

  return (
    <>
      <Head>
        <title>Weight Tracker</title>
        <meta name='description' content='Weight Tracking App' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex h-full flex-col items-center'>
        <AddWeightModal
          open={visibleModal === 'addWeight'}
          setOpen={(value: boolean) => {
            value ? setVisibleModal('addWeight') : setVisibleModal(null);
          }}
        />

        {data && <WeightChart data={data} />}

        <div className='my-3 w-full border-t-2'></div>

        <div className='w-full px-2 sm:w-96 sm:px-0'>
          <AddWeightButton onClick={onAddWeightClick} />
        </div>

        <div className='flex grow items-center justify-center'>
          {!data ? getNoDataScreen() : <WeightDataList data={data} />}
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
        destination: '/login',
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
