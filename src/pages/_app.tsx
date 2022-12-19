import type { AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";

import Navbar from "../components/Navbar";
import UserDetailsAtom from "../atoms/UserDetailsAtom";

import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  const [userData, _] = useAtom(UserDetailsAtom);

  return (
    <SessionProvider session={session}>
      {router.route !== "/_error" && (
        <Navbar avatarUrl={userData?.avatarUrl} signOutCallback={signOut} />
      )}
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default MyApp;
