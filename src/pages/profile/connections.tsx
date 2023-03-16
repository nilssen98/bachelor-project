import type { ReactElement } from "react";
import { useMemo } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  HStack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { getProviders } from "next-auth/react";
import type { ClientSafeProvider } from "next-auth/react";
import { api } from "../../utils/api";
import type { NextPageWithLayout } from "../_app";
import ProfileSidebarLayout from "../../components/profile-sidebar-layout";
import Loading from "../../components/loading";
import { signIn } from "next-auth/react";
import ConnectionCard from "../../components/connection-card";
import ProviderIcon from "../../components/provider-icon";

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

  const { mutate: unlink } = api.me.unlink.useMutation({
    onSuccess: () => api.useContext().me.invalidate(),
  });

  const connections: string[] = useMemo(() => {
    const connections = new Array<string>();
    me?.accounts.forEach((account) => connections.push(account.provider));
    if (me?.emailVerified) {
      connections.push("email");
    }
    return connections;
  }, [me]);

  const providers: string[] = useMemo(() => {
    return Object.values(props.providers)
      .filter(
        (provider: ClientSafeProvider) =>
          provider.name.toLowerCase() !== "email"
      )
      .map((provider: ClientSafeProvider) => provider.name);
  }, [props.providers]);

  const handleDisconnect = (provider: string) =>
    unlink({ provider: provider.toLowerCase() });

  function isProviderDisabled(provider: string) {
    return connections.includes(provider.toLowerCase());
  }

  if (isLoadingMe) {
    return <Loading />;
  }

  return (
    <>
      <Text fontSize={"3xl"} my={4}>
        Connections
      </Text>
      <VStack alignItems={"flex-start"} spacing={8}>
        <Card w={"full"}>
          <CardBody w={"full"}>
            <VStack spacing={4} align={"start"}>
              <Text fontSize={"xl"}>Add new</Text>
              <Divider />
              <HStack spacing={4}>
                {providers.map((provider) => (
                  <Tooltip
                    key={provider}
                    hasArrow
                    label={
                      isProviderDisabled(provider)
                        ? `Already connected to ${provider}`
                        : `Connect with ${provider}`
                    }
                  >
                    <Button
                      isDisabled={isProviderDisabled(provider)}
                      onClick={() => {
                        void signIn(provider.toLowerCase());
                      }}
                      leftIcon={<ProviderIcon provider={provider} />}
                    >
                      {provider}
                    </Button>
                  </Tooltip>
                ))}
              </HStack>
            </VStack>
          </CardBody>
        </Card>
        <Box width={"full"}>
          {/* <Text fontSize={"2xl"} pb={2}>
            Current Connections
          </Text> */}
          <VStack alignItems={"flex-start"} spacing={2}>
            {connections.map((provider) => (
              <ConnectionCard
                key={provider}
                provider={provider}
                disabled={provider.toLowerCase() === "email"}
                onDisconnect={(provider) => void handleDisconnect(provider)}
              />
            ))}
          </VStack>
        </Box>
      </VStack>
    </>
  );
};

ConnectionPage.getLayout = function getLayout(page: ReactElement) {
  return <ProfileSidebarLayout>{page}</ProfileSidebarLayout>;
};

export default ConnectionPage;
