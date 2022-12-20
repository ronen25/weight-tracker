import type { AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Navbar from "../components/Navbar";
import UserDetailsAtom from "../atoms/UserDetailsAtom";

import "../styles/globals.css";

const queryClient = new QueryClient();

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  const [userData, _] = useAtom(UserDetailsAtom);

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        {router.route !== "/_error" && (
          <Navbar avatarUrl={userData?.avatarUrl} signOutCallback={signOut} />
        )}
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;
