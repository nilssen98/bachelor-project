import type { ReactElement } from "react";
import { Text, VStack } from "@chakra-ui/react";
import { getProviders } from "next-auth/react";
import type { ClientSafeProvider } from "next-auth/react";
import { api } from "../../utils/api";
import type { NextPageWithLayout } from "../_app";
import ProfileSidebarLayout from "../../components/profileSidebarLayout";
import CurrentConnections from "../../components/current-connections";
import Loading from "../../components/loading";
import AddConnections from "../../components/add-connections";

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

interface PageProps {
  providers: ReturnType<typeof getProviders>;
}

const ConnectionPage: NextPageWithLayout<PageProps> = (props: PageProps) => {
  const { data: me, isLoading: isLoadingMe } = api.me.get.useQuery();

  if (isLoadingMe) {
    return <Loading />;
  }

  function getCurrentConnections() {
    const connections = new Array<string>();
    me?.accounts.map((account) => connections.push(account.provider));
    if (me?.emailVerified) {
      connections.push("email");
    }
    return connections;
  }

  function getProviders() {
    const providers = new Array<string>();
    Object.values(props.providers).forEach((provider: ClientSafeProvider) => {
      if (provider.name.toLowerCase() !== "email") {
        providers.push(provider.name);
      }
    });
    return providers;
  }

  return (
    <>
      <Text fontSize={"4xl"} my={4}>
        Connections
      </Text>
      <VStack alignItems={"flex-start"} spacing={8}>
        <AddConnections
          providers={getProviders()}
          currentProviders={getCurrentConnections()}
        />
        <CurrentConnections providers={getCurrentConnections()} />
      </VStack>
    </>
  );
};

ConnectionPage.getLayout = function getLayout(page: ReactElement) {
  return <ProfileSidebarLayout>{page}</ProfileSidebarLayout>;
};

export default ConnectionPage;
