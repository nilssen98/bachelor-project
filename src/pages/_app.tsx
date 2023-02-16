import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "../utils/api";
import { ChakraProvider, cookieStorageManager } from "@chakra-ui/react";
import theme from "../theme";
import Layout from "../components/layout";
import type { ReactElement, ReactNode } from "react";
import React from "react";
import type { NextPage } from "next";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface Props {
  Component: NextPageWithLayout;
  pageProps: {
    session: Session;
  };
}

const App = ({ Component, pageProps: { session, ...pageProps } }: Props) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={session}>
      <ChakraProvider colorModeManager={cookieStorageManager} theme={theme}>
        <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
      </ChakraProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(App);
