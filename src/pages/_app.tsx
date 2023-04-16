import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "../utils/api";
import { ChakraProvider, cookieStorageManager } from "@chakra-ui/react";
import theme from "../theme";
import Layout from "../components/layouts/layout";
import type { ReactElement, ReactNode } from "react";
import React from "react";
import type { NextPage } from "next";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { useRouter } from "next/router";
import ConfigurationBrowserLayout from "../components/layouts/configuration-browser-layout";

TimeAgo.addDefaultLocale(en);

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
  const router = useRouter();

  const getLayout = Component.getLayout ?? ((page) => page);

  const isConfigurationPage = router.pathname.startsWith("/configurations");

  return (
    <SessionProvider session={session}>
      <ChakraProvider
        cssVarsRoot="body"
        colorModeManager={cookieStorageManager}
        theme={theme}
      >
        {isConfigurationPage ? (
          <ConfigurationBrowserLayout>
            <Component {...pageProps} />
          </ConfigurationBrowserLayout>
        ) : (
          <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
        )}
      </ChakraProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(App);
