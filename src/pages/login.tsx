import type { GetServerSideProps } from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import LoadingSpinner from "../components/LoadingSpinner";
import { getServerAuthSession } from "../server/common/get-server-auth-session";

type Inputs = {
  email: string;
  password: string;
};

interface Props {
  error?: string;
}

const LoginPage = ({ error }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!loading) {
      setLoading(true);

      await signIn("credentials", {
        email: data.email,
        password: data.password,
      });
    }
  };

  const errorDisplay = (errorMessage: string) => {
    return (
      <div className="rounded bg-red-100 p-1 text-center text-xs">
        Invalid username and/or password!
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Weight Tracker - Login</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Weight Tracker
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                  {...register("email")}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                  {...register("password")}
                />
              </div>
            </div>

            {errors.email || errors.password ? (
              errorDisplay(errors.email?.message ?? "")
            ) : (
              <></>
            )}

            {error && errorDisplay(error)}

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {loading ? <LoadingSpinner /> : <span>Sign In</span>}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res, query } = context;
  const session = await getServerAuthSession({ req, res });

  if (session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      error: query["error"] ?? null,
    },
  };
};

export default LoginPage;
